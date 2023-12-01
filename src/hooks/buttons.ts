import { MenuListItem } from "../services/system.d";
import { UseMenuState, UseTokenState } from "../store";
import { useLocation } from "react-router-dom";
export const useAvailableButtons = (): string[] => {
  const location = useLocation();
  const menuList = UseMenuState((state) => state.menuList);
  const userInfo = UseTokenState((state) => state.userInfo);
  const permission = userInfo?.permission.split(",") as string[];
  let btnLists: MenuListItem[] = [];
  // 获取当前路由下的所有按钮数据
  for (const item of menuList) {
    if (location.pathname.startsWith("/" + item.path)) {
      for (const second of item.children) {
        if (location.pathname.endsWith(second.path)) {
          btnLists = second.children.filter((btn) =>
            permission.includes(btn.id.toString())
          );
          break;
        }
      }
    }
  }
  // 用名称来比对，略显粗糙，但是走到这了
  return btnLists.map((item) => item.title);
};
