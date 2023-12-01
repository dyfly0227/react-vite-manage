import { FC, useState, useEffect } from "react";
import { UseMenuState } from "../store";
import { MenuListItem } from "../services/system.d";

type TreeProps = {
  menu: MenuListItem;
  parentChecked: boolean;
  deep: number;
  initData: string[];
};

const Tree = ({ menu, parentChecked, deep, initData }: TreeProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // 当父元素选中或取消时，子元素也要随之变化
    if (deep > 1) {
      setChecked(parentChecked);
    }
  }, [parentChecked]);
  useEffect(() => {
    if (initData.includes(menu.id.toString())) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [initData]);
  const checkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return menu.children && menu.children.length > 0 ? (
    <li>
      <details open>
        <summary>
          <div className="flex flex-row items-center">
            <input
              type="checkbox"
              data-id={menu.id}
              className="menu_tree_select_checkbox checkbox checkbox-xs p-0 mr-2"
              checked={checked}
              onChange={checkChange}
            />
            <a>{menu.title}</a>
          </div>
        </summary>
        <ul>
          {menu.children.map((c) => (
            <Tree
              menu={c}
              deep={deep + 1}
              key={c.title}
              parentChecked={checked}
              initData={initData}
            />
          ))}
        </ul>
      </details>
    </li>
  ) : (
    <li className="flex flex-row items-center">
      <input
        type="checkbox"
        data-id={menu.id}
        className="menu_tree_select_checkbox checkbox checkbox-xs p-0 mr-2"
        checked={checked}
        onChange={checkChange}
      />
      <a>{menu.title}</a>
    </li>
  );
};

interface MenuTreeSelectProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}
const MenuTreeSelect: FC<MenuTreeSelectProps> = ({
  visible,
  setVisible,
  data,
  setData,
}) => {
  const menuList = UseMenuState((state) => state.menuList);
  useEffect(() => {
    if (visible) {
      (document.getElementById("menu_tree_select_modal")! as any).showModal();
    } else {
      // 用取消按钮来关闭弹窗
      (document.querySelector("#menu_tree_select_cancel_btn") as HTMLButtonElement).click();
    }
  }, [visible]);
  const cancelHandle = () => {
    setVisible(false);
  };
  const confirmHandle = () => {
    const boxs = document.querySelectorAll(
      ".menu_tree_select_checkbox"
    ) as NodeListOf<HTMLInputElement>;
    const checkedList: string[] = [];
    boxs.forEach((item) => {
      if (item.checked) {
        const menuId = item.getAttribute("data-id");
        checkedList.push(menuId as string);
      }
    });// 用取消按钮来关闭弹窗
    (document.querySelector("#menu_tree_select_cancel_btn") as HTMLButtonElement).click();
    setData(checkedList.join(","));
  };
  return (
    <dialog id="menu_tree_select_modal" className="modal">
      <div className="modal-box">
        <ul className="menu w-56 rounded-box">
          {menuList.map((f) => (
            <Tree
              menu={f}
              deep={1}
              key={f.title}
              parentChecked={false}
              initData={data.split(",")}
            />
          ))}
        </ul>
        <div className="modal-action">
          <form method="dialog" id="menu_tree_select_form">
            <button className="btn" onClick={cancelHandle} id="menu_tree_select_cancel_btn">
              取消
            </button>
          </form>
          <button className="btn btn-primary ml-4" onClick={confirmHandle}>
            确认
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default MenuTreeSelect;
