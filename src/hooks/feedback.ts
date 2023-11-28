import { UseAlertState } from "../store/feedback";
import { AlertProps } from "../types";
export const useAlert = () => {
  const addList = UseAlertState((state) => state.addList);
  const removeList = UseAlertState((state) => state.removeList);
  const toast = (
    params: AlertProps & {
      success?: () => void;
    }
  ) => {
    addList(params);
    setTimeout(() => {
      if (params.success) {
        params.success();
      }
      removeList();
    }, 1500);
  };
  return { toast };
};
