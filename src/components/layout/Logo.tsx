import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return <div className="w-56 flex justify-center items-center">
    <span className="text-lg font-semibold">鸟人管理系统</span>
  </div>;
};

export default Logo;
