import { FC } from "react";
import Header from "./Header";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

interface IndexProps {}

const Index: FC<IndexProps> = () => {
  return (
    <div className="flex w-screen h-screen  pt-16">
      <Header />
      <div className="pt-2 h-full">
        <Menu />
      </div>
      <div className="m-4 shadow-md p-4 flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
