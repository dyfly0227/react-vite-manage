import { FC, useState } from "react";
import TablePro from "../../components/tablePro/Index";
import TableModal from "../../components/tablePro/Modal";
import { menuList } from "../../services/system";
import { TableCols } from "../../types";
import { MenuListItem } from "../../services/system.d";

const Menu: FC = () => {
  const [current, setCurrent] = useState<MenuListItem>({} as MenuListItem);
  const [visible, setVisible] = useState(false);
  const [formkey, setFormKey] = useState(0);
  const cols: TableCols<MenuListItem> = [
    {
      title: "名称",
      dataIndex: "title",
      showInModal: true,
    },
    {
      title: "Id",
      dataIndex: "id",
      hideInSearch: true,
    },
    {
      title: "类型",
      dataIndex: "level",
      showInModal: true,
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
      valueEnum: [
        {
          label: "一级菜单",
          value: 1,
        },
        {
          label: "二级菜单",
          value: 2,
        },
        {
          label: "按钮",
          value: 3,
        },
      ],
      editType: "select",
    },
    {
      title: "路径",
      dataIndex: "path",
      hideInSearch: true,
      showInModal: true,
    },
    {
      title: "组件",
      dataIndex: "component",
      hideInSearch: true,
      showInModal: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      hideInSearch: true,
      options: ["edit", "delete"],
    },
  ];
  const event = (type: string, item: MenuListItem) => {
    setCurrent(item);
    if (type === "edit") {
      setVisible(true);
    }
  };
  const toolHandle = (type: string) => {
    if (type === "add") {
      setCurrent({} as MenuListItem);
      setVisible(true);
    }
  };
  return (
    <div>
      <TablePro
        request={menuList}
        cols={cols}
        event={event}
        tool={["add", "export"]}
        toolHandle={toolHandle}
        formKey={formkey}
      />
      <TableModal
        title="编辑"
        cols={cols}
        data={current}
        visible={visible}
        setVisible={setVisible}
        onFinish={(data) => {
          console.log(data);
          // 提交数据并刷新表格
          setFormKey(formkey + 1);
          setVisible(false);
        }}
      />
    </div>
  );
};

export default Menu;
