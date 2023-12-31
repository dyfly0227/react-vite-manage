import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Home from "./pages/home/index";
import Login from "./pages/user/login";
import { menuList } from "./services/system";
import { MenuListItem } from "./services/system.d";
import Layout from "./components/layout/Index";
import { UseMenuState, UseThemeState, UseTokenState } from "./store";
import AlertWrap from "./components/feedback/AlertWrap";

function App() {
  const [menu, setMenu] = useState<MenuListItem[]>([]);
  const theme = UseThemeState((state) => state.theme);
  const setMenuList = UseMenuState((state) => state.setMenuList);
  const token = UseTokenState((state) => state.token);
  const checkLogin = () => {
    if (!token && location.pathname !== "/user/login") {
      //  此时路由还未渲染，不能使用react router的useNavigate来跳转
      location.href = "/user/login";
    }
  };
  useEffect(() => {
    checkLogin();
    menuList({
      pageNum: 1,
      pageSize: 100,
    }).then((res) => {
      setMenu(res.data);
      setMenuList(res.data);
    });
  }, []);
  return (
    <div data-theme={theme} className="w-full">
      <AlertWrap />
      <BrowserRouter>
        <Routes>
          <Route Component={Layout}>
            <Route path="/" Component={Home} />
          </Route>
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
