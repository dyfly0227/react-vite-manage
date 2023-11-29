//  当前组件处理表格工具栏的按钮，如 新增/导出
interface OptionProps {
  tool: string[];
  toolHandle: (type: string) => void;
}

const btns: Record<string, string> = {
  add: "新增",
  export: "导出",
};

function Option({ tool, toolHandle }: OptionProps) {
  return (
    <div className="flex justify-end pb-2">
      {tool.map((option) => (
        <button
          key={option}
          className="btn btn-primary mr-4"
          onClick={() => {
            toolHandle(option);
          }}
        >
          {btns[option]}
        </button>
      ))}
    </div>
  );
}

export default Option;
