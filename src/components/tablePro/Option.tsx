//  当前组件用于渲染表格内操作栏的按钮
interface OptionProps<T> {
  options: string[];
  data: T;
  event: (type: string, item: T) => void;
}

const btns: Record<string, string> = {
  add: "新增",
  edit: "编辑",
  delete: "删除",
};

function Option<T>({ options, event, data }: OptionProps<T>) {
  return (
    <div className="flex">
      {options.map((option) => (
        <button
          key={option}
          className="btn btn-link"
          onClick={() => {
            event(option, data);
          }}
        >
          {btns[option]}
        </button>
      ))}
    </div>
  );
}

export default Option;
