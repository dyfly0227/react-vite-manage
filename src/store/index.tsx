import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Theme } from "daisyui";
import { MenuListItem } from "../services/system.d";
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
  menuList: MenuListItem[];
  setMenuList: (val: MenuListItem[]) => void;
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

interface TokenState {
  token: string;
  setToken: (val: string) => void;
}
export const UseTokenState = create<TokenState>()(
  persist(
    (set, get) => ({
      token: "",
      setToken: (val) => set({ token: val }),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
