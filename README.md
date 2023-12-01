闲来无聊玩一下`vite+react+zustand+tailwind+daisyUi`的组合，一星期搞成，但愿以后能用得到或者被他人用到。
### 展示
![](/images/login.jpg)
![](/images/menu.jpg)
![](/images/role.jpg)
![](/images/user.jpg)
![](/images/permission.jpg)
### 对应文档
  [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
  [daisyUI](https://daisyui.com/docs/use/)
  [react-router-dom](https://reactrouter.com/en/main)
  [tailwind](https://tailwindcss.com/docs/installation)
### 目录结构
```bash
src
├─ App.tsx
├─ index.css
├─ main.tsx
├─ route.ts
├─ types.d.ts  # 声明全局通用类型
├─ vite-env.d.ts
├─ utils
│  └─ request.ts # 封装axios
├─ store # zustand全局状态
│  ├─ feedback.tsx
│  └─ index.tsx
├─ services 
│  ├─ system.d.ts # 数据接口声明
│  └─ system.ts # 数据接口
├─ pages
│  ├─ user
│  │  └─ login.tsx
│  ├─ system
│  │  ├─ menu.tsx
│  │  ├─ role.tsx
│  │  └─ user.tsx
│  └─ home
│     └─ index.tsx
├─ hooks
│  ├─ buttons.ts # 权限筛选后渲染页面按钮
│  └─ feedback.ts # 全局toast方法
├─ config
│  └─ buttons.ts # 页面按钮的映射关系
└─ components
   ├─ MenuTreeSelect.tsx # 菜单树选择
   ├─ tablePro # 封装了个表格，集成 搜索表单/分页/编辑表单
   │  ├─ FormItem.tsx
   │  ├─ Index.tsx
   │  ├─ Modal.tsx
   │  ├─ Option.tsx
   │  ├─ Pagination.tsx
   │  ├─ Search.tsx
   │  ├─ Table.tsx
   │  ├─ Tool.tsx
   │  └─ Tree.tsx
   ├─ svg # 因为要切换主题，所以svg的颜色也要同步变化
   │  ├─ Index.tsx
   │  └─ List.tsx
   ├─ layout # 母版
   │  ├─ Avator.tsx
   │  ├─ Header.tsx
   │  ├─ Index.tsx
   │  ├─ Logo.tsx
   │  ├─ Menu.tsx
   │  └─ Theme.tsx
   └─ feedback # 全局toast的渲染组件
      ├─ Alert.tsx
      └─ AlertWrap.tsx
```