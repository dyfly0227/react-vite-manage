import { FC } from "react";
import { UseMenuState, UseTokenState } from "../../store";
import { Link, useLocation } from "react-router-dom";
import { MenuListItem } from "../../services/system.d";
interface MenuProps {}

interface TreeProps {
  menu: MenuListItem;
  father?: MenuListItem;
  deep: number;
  permission: string[];
}

const Tree = ({ menu, father, deep, permission }: TreeProps) => {
  const location = useLocation();
  
  const path = father ? "/" + father.path + "/" + menu.path : "/" + menu.path;
  // 权限控制
  if (permission.includes(menu.id.toString())) {
    return menu.children && menu.children.length > 0 && deep < 2 ? (
      <li>
        <details open>
          <summary>{menu.title}</summary>
          <ul>
            {menu.children.map((c) => (
              <Tree
                key={c.title}
                menu={c}
                father={menu}
                deep={deep + 1}
                permission={permission}
              />
            ))}
          </ul>
        </details>
      </li>
    ) : (
      <li>
        <Link to={path} className={location.pathname === path ? "active" : ""}>
          {menu.title}
        </Link>
      </li>
    );
  } else {
    return null;
  }
};

const Menu: FC<MenuProps> = () => {
  const menuList = UseMenuState((state) => state.menuList);
  const userInfo = UseTokenState((state) => state.userInfo);
  const permission = userInfo?.permission.split(",") as string[];
  return (
    <ul className="menu bg-base-100 w-56 shadow-sm h-full">
      <li>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          首页
        </Link>
      </li>
      {menuList.map((f) => {
        return <Tree key={f.title} menu={f} deep={1} permission={permission} />;
      })}
    </ul>
  );
};

export default Menu;
