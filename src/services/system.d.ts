export type MenuListType = {
  code: number;
  msg: string;
  data: Array<{
    title: string;
    path: string;
    component: string;
    children: Array<{
      title: string;
      path: string;
      component: string;
    }>;
  }>;
};
