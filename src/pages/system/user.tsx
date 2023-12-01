import { FC, useState, useEffect } from "react";
import TablePro from "../../components/tablePro/Index";
import TableModal from "../../components/tablePro/Modal";
import { userList, roleList } from "../../services/system";
import { TableCols } from "../../types";
import { UserListItem, RoleListItem } from "../../services/system.d";

const Menu: FC = () => {
  const [current, setCurrent] = useState<UserListItem>({} as UserListItem);
  const [visible, setVisible] = useState(false);
  const [formkey, setFormKey] = useState(0);
  const [roles, setRoles] = useState<RoleListItem[]>([]);

  useEffect(() => {
    // 获取角色
    roleList({
      pageNum: 1,
      pageSize: 100,
    }).then((res) => {
      setRoles(res.data);
    });
  }, []);
  const cols: TableCols<UserListItem> = [
    {
      title: "昵称",
      dataIndex: "nickname",
      showInModal: true,
    },
    {
      title: "账号",
      dataIndex: "account",
      showInModal: true,
    },
    {
      title: "角色",
      dataIndex: "role",
      showInModal: true,
      render: (item) => {
        return (
          <span>
            {roles.filter((r) => r.id === item.role).length
              ? roles.filter((r) => r.id === item.role)[0].name
              : ""}
          </span>
        );
      },
      editType: "select",
      valueEnum: roles.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      }),
    },
    {
      title: "头像",
      dataIndex: "avator",
      showInModal: true,
      editType: "upload",
      accept: "image/*",
      uploadHandle: (e) => {
        // 上传文件至服务器，服务器返回图片url,然后一并提交
        console.log(e.target.files);
      },
      render: (item) => {
        return item.avator ? (
          <div className="avatar">
            <div className="w-12 rounded">
              <img src={item.avator} />
            </div>
          </div>
        ) : (
          "-"
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
  const event = (type: string, item: UserListItem) => {
    setCurrent(item);
    if (type === "edit") {
      setVisible(true);
    }
  };
  const toolHandle = (type: string) => {
    if (type === "add") {
      setCurrent({} as UserListItem);
      setVisible(true);
    }
  };
  return (
    <div>
      <TablePro
        request={userList}
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
