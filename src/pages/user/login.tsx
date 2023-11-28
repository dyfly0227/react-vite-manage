import { FC } from "react";
import { useAlert } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";
import { UseTokenState } from "../../store";

const Login: FC = () => {
  const { toast } = useAlert();
  const navigate = useNavigate();
  const setToken = UseTokenState((state) => state.setToken);
  const submit = () => {
    toast({
      type: "success",
      msg: "登录成功",
      success: () => {
        setToken('helloworld');
        navigate("/");
      },
    });
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
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered input-md w-full max-w-xs"
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
