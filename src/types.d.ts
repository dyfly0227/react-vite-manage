import { ReactNode } from "react";

// 此处放一些全局通用的声明
export interface AlertProps {
  type: "alert" | "info" | "success" | "warning" | "error";
  msg: string;
}

export type TableCols<T> = {
  title: string;
  dataIndex: string;
  render?: ((item: T) => ReactNode);
}[];
