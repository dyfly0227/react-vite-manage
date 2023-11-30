import { TableColType } from "../../types";
interface FormItemProps<T> {
  col: TableColType<T>;
  data: T;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  formId: string;
}

function FormItem<T>({
  col,
  data,
  formData,
  setFormData,
  formId,
}: FormItemProps<T>) {
  const sizeClass = formId === "search" ? "sm" : "md";
  const changeEvent = (value: string | number, key: string) => {
    const temp = { ...formData };
    Reflect.set(temp as object, key, value);
    setFormData(temp as T);
  };
  if (col.renderForm) {
    // 自定义内容
    return col.renderForm(data);
  } else if (col.editType && col.editType === "select") {
    // 下拉框
    return (
      <div className="flex items-center">
        <label
          htmlFor={col.dataIndex + formId}
          className="text mr-4 whitespace-nowrap"
        >
          {col.title}：
        </label>
        <select
          id={col.dataIndex + formId}
          className={
            "select select-bordered w-full max-w-xs select-" + sizeClass
          }
          name={col.dataIndex}
          value={formData[col.dataIndex] || ""}
          onChange={(e) => {
            changeEvent(e.target.value, col.dataIndex);
          }}
        >
          <option value="">请选择</option>
          {col.valueEnum &&
            col.valueEnum.map((p) => (
              <option key={p.label} value={p.value}>
                {p.label}
              </option>
            ))}
        </select>
      </div>
    );
  } else if (col.editType && col.editType === "radio") {
    // 懒得没写
    return <></>;
  } else {
    return (
      <div className="flex items-center pt-2 pb-2">
        <label
          htmlFor={col.dataIndex + formId}
          className="text mr-4 whitespace-nowrap"
        >
          {col.title}：
        </label>
        <input
          value={formData[col.dataIndex] || ""}
          onChange={(e) => {
            changeEvent(e.target.value, col.dataIndex);
          }}
          id={col.dataIndex + formId}
          type="text"
          name={col.dataIndex}
          placeholder={"请输入" + col.title}
          className={"input input-bordered w-full max-w-xs input-" + sizeClass}
        />
      </div>
    );
  }
}
export default FormItem;
