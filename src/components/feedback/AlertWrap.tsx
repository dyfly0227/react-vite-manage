import { FC } from "react";
import Alert from "./Alert";
import { UseAlertState } from "../../store/feedback";

const AlertWrap: FC = () => {
  const alertList = UseAlertState((state) => state.alertList);
  return (
    <div className="fixed left-0 top-0 w-screen z-50 flex flex-col items-center">
      <div className="w-96">
        {alertList.length > 0 &&
          alertList.map((a, i) => <Alert type={a.type} msg={a.msg} key={i} />)}
      </div>
    </div>
  );
};

export default AlertWrap;
