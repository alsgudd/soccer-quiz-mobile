import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'IsLoggedInPersist',
  storage: sessionStorage,
});

export default atom<string | undefined>({
  key: 'QuizTeam',
  default: undefined,
  effects_UNSTABLE: [persistAtom]
})