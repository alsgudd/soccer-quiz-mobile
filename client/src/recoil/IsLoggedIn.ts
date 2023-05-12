import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'IsLoggedInPersist',
  storage: sessionStorage,
});

export default atom<boolean>({
  key: 'IsLoggedInState',
  default: false,
  effects_UNSTABLE: [persistAtom]
})