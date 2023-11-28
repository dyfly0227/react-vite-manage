import { FC, useEffect } from "react";
import Header from "./Header";
import Menu from "./Menu";
import { menuList } from "../../services/system";
import { Outlet } from "react-router-dom";

interface IndexProps {}

const Index: FC<IndexProps> = () => {
  useEffect(() => {
    menuList();
  }, []);
  return (
    <div className="flex w-screen h-screen  pt-16">
      <Header />
      <div className="pt-2 h-full">
        <Menu />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
