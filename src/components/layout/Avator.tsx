import { FC } from "react";

interface AvatorProps {}

const Avator: FC<AvatorProps> = () => {
  return (
    <div className="dropdown dropdown-end">
      <div className="avatar placeholder ml-4 mr-4" tabIndex={0} role="button">
        <div className="bg-neutral text-neutral-content rounded-full w-8">
          <span className="text-xs">Bird</span>
        </div>
      </div>
      <ul className="mt-3 z-[1] p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a>设置</a>
        </li>
        <li>
          <a>退出登录</a>
        </li>
      </ul>
    </div>
  );
};

export default Avator;
