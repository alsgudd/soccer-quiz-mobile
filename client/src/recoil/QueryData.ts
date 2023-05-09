import { atom } from 'recoil';

export type TQueryData = {
  amount: number;
  team?: string;
};

export default atom<TQueryData | undefined>({
  key: 'queryData',
  default: undefined,
});
