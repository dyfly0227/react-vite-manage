import { FC } from "react";
import SVGList from "./List";
import { UseThemeState } from "../../store";
import themes from "daisyui/src/theming/themes";

interface IndexProps {
  name: string;
}

const Index: FC<IndexProps> = ({ name }) => {
  const theme = UseThemeState((state) => state.theme);
  const scheme = themes[theme]["color-scheme"];
  return <SVGList name={name} scheme={scheme} />;
};

export default Index;
