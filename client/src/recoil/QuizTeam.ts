import { atom } from "recoil";

export default atom<string | undefined>({
  key: 'QuizTeam',
  default: undefined,
})