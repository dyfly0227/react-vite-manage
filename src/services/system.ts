import { MenuListType } from "./system.d";
import request from "../utils/request";
export const menuList = async (params = {}): Promise<MenuListType> => {
  return request({
    url: "/menu/list",
    method: "get",
    params,
  });
};
