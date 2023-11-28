import React, { FC } from "react";
import { UseThemeState } from "../../store";
import themes from "daisyui/src/theming/themes";
import { Theme } from "daisyui";

interface ThemeProps {}
const Index: FC<ThemeProps> = () => {
  const setTheme = UseThemeState((state) => state.setTheme);
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="m-1 btn">
        主题
      </label>
      <ul
        tabIndex={0}
        className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 overflow-y-auto flex-col h-80 flex-nowrap"
      >
        {Object.keys(themes).map((t) => (
          <li key={t}>
            <a
              onClick={() => {
                setTheme(t as Theme);
              }}
            >
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
