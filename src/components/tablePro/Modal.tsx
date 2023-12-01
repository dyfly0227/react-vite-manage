import React, { useEffect, useState } from "react";
import { TableCols } from "../../types";
import FormItem from "./FormItem";

interface ModalProps<T> {
  title: string;
  cols: TableCols<T>;
  data: T;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onFinish: (form: T) => void;
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
      (document.getElementById("table_pro_modal")! as any).showModal();
    } else {
      // 用取消按钮来关闭弹窗
      (
        document.querySelector("#table_pro_cancel_btn") as HTMLButtonElement
      ).click();
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
    <dialog id="table_pro_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="w-full p-4">
          {cols.map((col) => {
            return col.showInModal ? (
              <FormItem<T>
                col={col}
                data={data}
                key={col.dataIndex}
                formData={formData}
                setFormData={setFormData}
                formId="modal"
              />
            ) : null;
          })}
        </div>
        <div className="modal-action">
          <form method="dialog" id="table_pro_form">
            <button
              className="btn"
              onClick={cancelHandle}
              id="table_pro_cancel_btn"
            >
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
