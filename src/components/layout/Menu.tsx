import { FC } from "react";
import { UseMenuState } from "../../store";
import { Link, useLocation } from "react-router-dom";
interface MenuProps {}

const Menu: FC<MenuProps> = () => {
  const menuList = UseMenuState((state) => state.menuList);
  const location = useLocation();
  return (
    <ul className="menu bg-base-100 w-56 shadow-sm h-full">
      <li>
        <Link to="/">首页</Link>
      </li>
      {menuList.map((f) => {
        return f.children.length > 0 ? (
          <li key={f.title}>
            <details open>
              <summary>{f.title}</summary>
              <ul>
                {f.children.map((c) => (
                  <li key={c.title}>
                    <Link
                      to={"/" + f.path + "/" + c.path}
                      className={
                        location.pathname === "/" + f.path + "/" + c.path
                          ? "active"
                          : ""
                      }
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ) : (
          <li key={f.title}>
            <Link
              to={"/" + f.path}
              className={location.pathname === "/" + f.path ? "active" : ""}
            >
              {f.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
