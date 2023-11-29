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
      title: "类型",
      dataIndex: "level",
      render: (item) => {
        switch (item.level) {
          case 1:
            return <div className="badge badge-primary">一级菜单</div>;
          case 2:
            return <div className="badge badge-secondary">二级菜单</div>;
          default:
            return <div className="badge badge-accent">按钮</div>;
        }
      },
    },
    {
      title: "路径",
      dataIndex: "path",
    },
    {
      title: "组件",
      dataIndex: "component",
    },
    {
      title: "操作",
      dataIndex: "option",
      options: ["edit", "delete"],
    },
  ];
  const event = (type: string, item: MenuListItem) => {
    console.log(type, item);
  };
  const toolHandle = (type: string) => {
    console.log(type);
  };
  return (
    <div>
      <TablePro
        request={menuList}
        cols={cols}
        event={event}
        tool={["add","export"]}
        toolHandle={toolHandle}
      />
    </div>
  );
};

export default menu;
