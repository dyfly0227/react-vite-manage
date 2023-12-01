import { FC, useState } from "react";
import TablePro from "../../components/tablePro/Index";
import TableModal from "../../components/tablePro/Modal";
import { roleList } from "../../services/system";
import { TableCols } from "../../types";
import { RoleListItem } from "../../services/system.d";
import MenuTreeSelect from "../../components/MenuTreeSelect";

const Menu: FC = () => {
  const [current, setCurrent] = useState<RoleListItem>({} as RoleListItem);
  const [visible, setVisible] = useState(false);
  const [formkey, setFormKey] = useState(0);
  const [treeVisible, setTreeVisible] = useState(false);
  const [treeData, setTreeData] = useState<string>("");
  const cols: TableCols<RoleListItem> = [
    {
      title: "名称",
      dataIndex: "name",
      showInModal: true,
    },
    {
      title: "权限",
      dataIndex: "permission",
      showInModal: true,
      renderForm: (item) => {
        return (
          <div className="flex items-center">
            <label className="text mr-4 whitespace-nowrap">权限：</label>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setTreeData(item.permission || "");
                setTreeVisible(true);
              }}
            >
              请选择
            </button>
            <MenuTreeSelect
              visible={treeVisible}
              setVisible={setTreeVisible}
              data={treeData}
              setData={setTreeData}
            />
          </div>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "option",
      hideInSearch: true,
      options: ["edit", "delete"],
    },
  ];
  const event = (type: string, item: RoleListItem) => {
    setCurrent(item);
    if (type === "edit") {
      setVisible(true);
    }
  };
  const toolHandle = (type: string) => {
    if (type === "add") {
      setCurrent({} as RoleListItem);
      setVisible(true);
    }
  };
  return (
    <div>
      <TablePro
        request={roleList}
        cols={cols}
        event={event}
        tool={["add"]}
        toolHandle={toolHandle}
        formKey={formkey}
        hideSearch={true}
      />
      <TableModal
        title="编辑"
        cols={cols}
        data={current}
        visible={visible}
        setVisible={setVisible}
        onFinish={(data) => {
          const submitData = {
            ...data,
            permission: treeData,
          };
          console.log(submitData);

          // 提交数据并刷新表格
          setFormKey(formkey + 1);
          setVisible(false);
        }}
      />
    </div>
  );
};

export default Menu;
