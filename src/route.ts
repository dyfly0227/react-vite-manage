import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/user/login";
import Home from "./pages/home/index";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/user/login",
    Component: Login,
  },
]);
console.log(router);

export default router;
