export type MenuListItem = {
  id: number;
  level: number;
  title: string;
  path: string;
  component: string;
  children: MenuListItem[];
};
export type MenuListType = {
  code: number;
  msg: string;
  total: number;
  data: MenuListItem[];
};
