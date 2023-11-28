// 此处放一些全局通用的声明
export interface AlertProps {
  type: "alert" | "info" | "success" | "warning" | "error";
  msg: string;
}