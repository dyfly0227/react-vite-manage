//  当前组件用于渲染表格内操作栏的按钮
import { buttonList } from "../../config/buttons";
import { useAvailableButtons } from "../../hooks/buttons";
interface OptionProps<T> {
  options: string[];
  data: T;
  event: (type: string, item: T) => void;
}
function Option<T>({ options, event, data }: OptionProps<T>) {
  const availableBtns = useAvailableButtons();
  return (
    <div className="flex">
      {options.map((option) => {
        return availableBtns.includes(buttonList[option.toString()]) ? (
          <a
            key={option}
            className="text-primary underline mr-2 cursor-pointer"
            onClick={() => {
              event(option, data);
            }}
          >
            {buttonList[option.toString()]}
          </a>
        ) : null;
      })}
    </div>
  );
}

export default Option;
