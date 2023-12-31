import axios from "axios";
import qs from "qs";

// 创建 axios 请求实例
const serviceAxios = axios.create({
  baseURL: "https://mock.presstime.cn/mock/65091e392b33b5907f47f182/example", // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
});

// 创建请求拦截
serviceAxios.interceptors.request.use(
  (config) => {
    // 如果开启 token 认证
    const tokenStorage = JSON.parse(sessionStorage.getItem("token")!);
    config.headers["Authorization"] = tokenStorage!["state"]["token"]; // 请求头携带 token
    // 设置请求头
    if (!config.headers["content-type"]) {
      // 如果没有设置请求头
      if (config.method === "post") {
        config.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
        config.data = qs.stringify(config.data); // 序列化,比如表单数据
      } else {
        config.headers["content-type"] = "application/json"; // 默认类型
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 创建响应拦截
serviceAxios.interceptors.response.use(
  (res) => {
    let data = res.data;
    // 处理自己的业务逻辑，比如判断 token 是否过期等等
    // 代码块
    return data;
  },
  () => {
    return Promise.reject("系统异常");
  }
);

export default serviceAxios;
