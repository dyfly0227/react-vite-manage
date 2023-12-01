export type MenuListItem = {
  id: number;
  level: number;
  title: string;
  path: string;
  component: string;
  children: MenuListItem[];
};

export type RoleListItem = {
  id: number;
  name: string;
  permission: string; // menuId 以逗号隔开
};