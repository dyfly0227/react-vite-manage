import { FC } from "react";
import Theme from "./Theme";
import Avator from "./Avator";
import SVG from "../../components/svg/Index";
import Logo from "./Logo";
interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="w-full fixed left-0 top-0">
      <div className="navbar bg-base-100 shadow-sm">
        <Logo />
        <button className="btn btn-square btn-ghost">
          <SVG name="expand" />
        </button>
        <div className="flex-1"></div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <Theme />
        <Avator />
      </div>
    </div>
  );
};

export default Header;
