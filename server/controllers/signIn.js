import util from 'util'
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

import { 
  connectToMongo,
  getDB,
  disconnectFromMongo
} from "../db/db.js";

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const signIn = async (req, res) => {
  try {
    const result = await performDBOperation(req.body.email, req.body.password);
    console.log(result);
    if(result.status !== 200) {
      const error = new Error(result.message);
      error.status = result.status;
      throw error;
    }
    try {
      const accessToken = jwt.sign({
        userId: result.authInfo._id,
        email: result.authInfo.email,
        name: result.authInfo.name
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '24h',
        issuer: 'Lee'
      })
      // Send Token in Cookie
      res.cookie('accessToken', accessToken, {
        // secure: true,
        // Cannot Access In JS(Client)
        // httpOnly: true,
        // sameSite: "none",
      })
      res.status(200).json({
        userId: result.authInfo._id,
        name: result.authInfo.name,
        message: 'login Success!',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ error: error.message });
  }
}

export const verifyPassword = async (password, userSalt, userPassword) => {
  const key = await pbkdf2Promise(password, userSalt, 104999, 64, "sha512");
  const hashedPassword = key.toString('base64');
  if (hashedPassword === userPassword) return true;
  return false;
}

async function performDBOperation(enteredEmail, enteredPassword) {
  connectToMongo();
  try {
    const db = getDB();
    const collection = db.collection('userInfo');
    const userInfo = await collection.findOne({ email: enteredEmail });
    if(!userInfo) throw new Error("The email does not exist. Please check again.");
    
    const isCorrectPW = await verifyPassword(enteredPassword, userInfo.salt, userInfo.password);
    if(!isCorrectPW) throw new Error("Password does not match. Please check again.");
    
    const { password, salt, ...others} = userInfo;
    return {
      status: 200,
      message: "The information entered by the user is valid.",
      authInfo: others,
    }
  } catch (error) {
    if(error.message === "The email does not exist. Please check again.") {
      return { 
        status: 402, 
        message: error.message 
      };
    } else if(error.message === "Password does not match. Please check again.") {
      return { 
        status: 403, 
        message: error.message 
      };
    } else {
      return {
        status: 500,
        message: "Unknown Error Occur..."
      }
    }
  } finally {
    disconnectFromMongo();
  }
}


export default signIn;