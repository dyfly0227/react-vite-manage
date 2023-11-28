import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Theme } from "daisyui";
import { MenuListType } from "../services/system.d";
interface ThemeState {
  theme: Theme;
  setTheme: (val: Theme) => void;
}
export const UseThemeState = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (val) => set({ theme: val }),
    }),
    {
      name: "theme-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface MenuState {
  menuList: MenuListType["data"];
  setMenuList: (val: MenuListType["data"]) => void;
}
export const UseMenuState = create<MenuState>()(
  persist(
    (set, get) => ({
      menuList: [],
      setMenuList: (val) => set({ menuList: val }),
    }),
    {
      name: "menu-list",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
