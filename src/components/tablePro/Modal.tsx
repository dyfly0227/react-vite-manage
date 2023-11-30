import React, { useEffect, useState } from "react";
import { TableCols, TableColType } from "../../types";

interface ModalProps<T> {
  title: string;
  cols: TableCols<T>;
  data: T;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onFinish: (form: T) => void;
}

interface FormItemProps<T> {
  col: TableColType<T>;
  data: T;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
}

function FormItem<T>({ col, data, formData, setFormData }: FormItemProps<T>) {
  const changeEvent = (value: string | number, key: string) => {
    const temp = { ...formData };
    Reflect.set(temp as object, key, value);
    setFormData(temp as T);
  };
  if (!col.showInModal) return <></>;
  if (col.renderForm) {
    return col.renderForm(data);
  } else if (col.editType && col.editType === "select") {
    return (
      <div className="flex items-center">
        <label htmlFor={col.dataIndex} className="w-40 text mr-4">
          {col.title}
        </label>
        <select
          id={col.dataIndex}
          className="select select-bordered w-full max-w-xs"
          name={col.dataIndex}
          value={formData[col.dataIndex] || ""}
          onChange={(e) => {
            changeEvent(e.target.value, col.dataIndex);
          }}
        >
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
    return <></>;
  } else {
    return (
      <div className="flex items-center pt-2 pb-2">
        <label htmlFor={col.dataIndex} className="w-40 text mr-4">
          {col.title}
        </label>
        <input
          value={formData[col.dataIndex] || ""}
          onChange={(e) => {
            changeEvent(e.target.value, col.dataIndex);
          }}
          id={col.dataIndex}
          type="text"
          name={col.dataIndex}
          placeholder={"请输入" + col.title}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    );
  }
}

function Modal<T>({
  title,
  cols,
  data,
  visible,
  setVisible,
  onFinish,
}: ModalProps<T>) {
  const [formData, setFormData] = useState<T>({} as T);
  useEffect(() => {
    setFormData(data);
    if (visible) {
      (document.getElementById("my_modal_5")! as any).showModal();
    } else {
      // 用取消按钮来关闭弹窗
      (document.querySelector("#cancelBtn") as HTMLButtonElement).click();
    }
  }, [visible]);
  const cancelHandle = () => {
    setVisible(false);
  };
  const confirmHandle = () => {
    // 此处可放一些基本规则判断
    onFinish(formData);
  };
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="w-full p-4">
          {cols.map((col) => (
            <FormItem<T>
              col={col}
              data={data}
              key={col.dataIndex}
              formData={formData}
              setFormData={setFormData}
            />
          ))}
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={cancelHandle} id="cancelBtn">
              取消
            </button>
          </form>
          <button className="btn btn-primary ml-4" onClick={confirmHandle}>
            确认
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
