import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export default atom<string | undefined>({
  key: 'UserNameState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
})