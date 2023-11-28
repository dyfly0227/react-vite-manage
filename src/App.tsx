import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Home from "./pages/home/index";
import Login from "./pages/user/login";
import { menuList } from "./services/system";
import { MenuListType } from "./services/system.d";
import Layout from "./components/layout/Index";
import { UseMenuState, UseThemeState } from "./store";

function App() {
  const [menu, setMenu] = useState<MenuListType["data"]>([]);
  const theme = UseThemeState((state) => state.theme);
  const setMenuList = UseMenuState((state) => state.setMenuList);
  useEffect(() => {
    menuList().then((res) => {
      setMenu(res.data);
      setMenuList(res.data);
    });
  }, []);
  return (
    <div data-theme={theme} className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/user/login" Component={Login} />
        </Routes>
        {menu.length > 0 && (
          <Suspense>
            <Routes>
              {menu.map((f) => {
                // 如果children的length大于0，为嵌套路由
                // 如果一级菜单的component为basic,则加载layout，否则为空白页
                return f.children.length > 0 ? (
                  <Route
                    path={f.path}
                    key={f.title}
                    Component={f.component === "basic" ? Layout : null}
                  >
                    {f.children.length > 0 &&
                      f.children.map((c) => (
                        <Route
                          key={c.title}
                          path={c.path}
                          Component={lazy(
                            () => import("./pages/" + c.component)
                          )}
                        />
                      ))}
                  </Route>
                ) : (
                  <Route
                    path={f.path}
                    Component={lazy(() => import("./pages/" + f.component))}
                  />
                );
              })}
            </Routes>
          </Suspense>
        )}
      </BrowserRouter>
    </div>
  );
}
export default App;
