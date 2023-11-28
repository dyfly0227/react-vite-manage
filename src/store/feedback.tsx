import { create } from "zustand";
import { AlertProps } from "../types";
interface AlertState {
  alertList: AlertProps[];
  addList: (val: AlertProps) => void;
  removeList: () => void;
}
export const UseAlertState = create<AlertState>()((set) => ({
  alertList: [],
  addList: (val) =>
    set((state) => ({ alertList: [val].concat(state.alertList) })),
  removeList: () =>
    set((state) => {
      const list = state.alertList.slice(0);
      list.pop();
      return {
        alertList: list,
      };
    }),
}));
