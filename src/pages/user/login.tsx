import { FC, useState } from "react";
import { useAlert } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";
import { UseTokenState } from "../../store";

const Login: FC = () => {
  const { toast } = useAlert();
  const navigate = useNavigate();
  const setToken = UseTokenState((state) => state.setToken);
  const setUserInfo = UseTokenState((state) => state.setUserInfo);
  const [formData, setFormData] = useState({
    account: "",
    password: "",
  });
  const submit = () => {
    // 假数据且密码未加密
    if (
      (formData.account === "user" && formData.password === "user123456") ||
      (formData.account === "admin" && formData.password === "admin123456")
    ) {
      // 获取当前用户详情
      const details =
        formData.account === "admin"
          ? {
              nickname: "管理员",
              account: "admin",
              avator:
                "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
              permission: "1,10,11,12,101,102,103,111,112,113,121,122,123",
            }
          : {
              nickname: "用户",
              account: "user",
              avator: "",
              permission: "1,10,11,101",
            };
      setUserInfo(details);
      setToken("helloworld");
      //
      toast({
        type: "success",
        msg: "登录成功",
        success: () => {
          navigate("/");
        },
      });
    } else {
      toast({
        type: "error",
        msg: "账号或密码不正确！",
      });
    }
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="card w-96 glass">
        <div className="flex justify-center items-center mt-10">
          <span className="text-2xl font-sans text-primary">鸟人管理系统</span>
        </div>
        <div className="card-body">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered input-md w-full max-w-xs"
            value={formData.account}
            onChange={(e) => {
              setFormData({
                ...formData,
                account: e.target.value,
              });
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered input-md w-full max-w-xs"
            value={formData.password}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          />
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={submit}>
              登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
