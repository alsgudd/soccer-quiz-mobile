import { Content } from "components/Molecules";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router";
import Atoms from "components/Atoms";

const ChartTable = () => {
  const navigate = useNavigate();

  const FaHomeIcon: JSX.Element =
    <FaHome style={{ cursor: "pointer" }}
      onClick={() => navigate("/")} />;


  return (
    <Content
      marginTop="0px"
      height="100%"
      header={FaHomeIcon}
      overflow="hidden"
    >
      <Atoms.Div>
        <Atoms.Title margin="16px 0px 0px 0px">
          THE HALL OF FAME🏆
        </Atoms.Title>
        <table>
          <tr>
            <td>1</td>
            <td>2</td>
          </tr>

        </table>
      </Atoms.Div>

    </Content>

  )
}


export default ChartTable;

