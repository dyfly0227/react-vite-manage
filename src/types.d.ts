import { ReactNode } from "react";

// 此处放一些全局通用的声明
export interface AlertProps {
  type: "alert" | "info" | "success" | "warning" | "error";
  msg: string;
}

export type TableRequsetParams = {
  pageSize: number;
  pageNum: number;
} & {
  [k: string]: unknown;
};

export type TableColType<T> = {
  title: string;
  dataIndex: string;
  render?: (item: T) => ReactNode; // 自定义表格中的渲染
  options?: string[];
  showInModal?: boolean;
  renderForm?: (item: T) => ReactNode; // 自定义form表单中的渲染
  valueEnum?: {
    label: string;
    value: string | number;
  }[];
  editType?: "select" | "radio";
};

export type TableCols<T> = TableColType<T>[];
