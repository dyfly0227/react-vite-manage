import { MenuListType } from "./system.d";
import request from "../utils/request";
import { TableRequsetParams } from "../types";
export const menuList = async (params: TableRequsetParams): Promise<MenuListType> => {
  return request({
    url: "/menu/list",
    method: "get",
    params,
  });
};
