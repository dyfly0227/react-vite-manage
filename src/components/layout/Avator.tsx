import { FC } from "react";
import { UseTokenState } from "../../store";
import { useNavigate } from "react-router-dom";

interface AvatorProps {}

const Avator: FC<AvatorProps> = () => {
  const userInfo = UseTokenState((state) => state.userInfo);
  const setToken = UseTokenState((state) => state.setToken);
  const setUserInfo = UseTokenState((state) => state.setUserInfo);
  const navigate = useNavigate();
  const logout = () => {
    setToken("");
    setUserInfo(null);
    navigate("/user/login");
  };
  return (
    <div className="dropdown dropdown-end">
      <div className="avatar placeholder ml-4 mr-4" tabIndex={0} role="button">
        {userInfo?.avator && (
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={userInfo?.avator} />
            </div>
          </div>
        )}
        {!userInfo?.avator && (
          <div className="bg-neutral text-neutral-content rounded-full w-12">
            <span className="text-xs">{userInfo?.nickname}</span>
          </div>
        )}
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a>设置</a>
        </li>
        <li onClick={logout}>
          <a>退出登录</a>
        </li>
      </ul>
    </div>
  );
};

export default Avator;
