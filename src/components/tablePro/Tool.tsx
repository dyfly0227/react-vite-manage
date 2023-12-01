//  当前组件处理表格工具栏的按钮，如 新增/导出
import { buttonList } from "../../config/buttons";
import { useAvailableButtons } from "../../hooks/buttons";
interface OptionProps {
  tool: string[];
  toolHandle: (type: string) => void;
}

function Option({ tool, toolHandle }: OptionProps) {
  const availableBtns = useAvailableButtons();
  return (
    <div className="flex justify-end pb-2">
      {tool.map((option) => {
        return availableBtns.includes(buttonList[option.toString()]) ? (
          <button
            key={option}
            className="btn btn-primary mr-4"
            onClick={() => {
              toolHandle(option);
            }}
          >
            {buttonList[option.toString()]}
          </button>
        ) : null;
      })}
    </div>
  );
}
export default Option;
