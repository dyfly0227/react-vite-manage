import { MenuListItem, RoleListItem } from "./system.d";
import request from "../utils/request";
import { ResponseListBasicType, TableRequsetParams } from "../types";
export const menuList = async (
  params: TableRequsetParams
): Promise<ResponseListBasicType<MenuListItem>> => {
  return request({
    url: "/menu/list",
    method: "get",
    params,
  });
};

export const roleList = async (
  params: TableRequsetParams
): Promise<ResponseListBasicType<RoleListItem>> => {
  return request({
    url: "/role/list",
    method: "get",
    params,
  });
};