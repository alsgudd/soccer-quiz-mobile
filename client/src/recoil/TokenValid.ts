import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export default atom<boolean>({
  key: 'TokenValidState',
  default: false,
  effects_UNSTABLE: [persistAtom],
})