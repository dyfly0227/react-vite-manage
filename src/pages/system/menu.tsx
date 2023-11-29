import { FC } from "react";
import TablePro from "../../components/tablePro/Index";
import { menuList } from "../../services/system";
import { TableCols } from "../../types";
import { MenuListItem } from "../../services/system.d";

const menu: FC = () => {
  const cols: TableCols<MenuListItem> = [
    {
      title: "名称",
      dataIndex: "title",
    },
    {
      title: "路径",
      dataIndex: "path",
    },
    {
      title: "组件",
      dataIndex: "component",
    },
  ];
  return (
    <div>
      <TablePro request={menuList} cols={cols} />
    </div>
  );
};

export default menu;
