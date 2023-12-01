import { TableCols } from "../../types";
import Option from "./Option";
import SVG from "../../components/svg/Index";
import { useState } from "react";

export type ChildrenInItem<T> = {
  children?: T[];
};

//  当前组件用于渲染表格数据
interface TreeProps<T> {
  cols: TableCols<T>;
  data: ChildrenInItem<T>;
  deep: number; // deep = 1时为一级节点
  event: (type: string, item: T) => void;
  visible?: boolean;
}

function Tree<T>({ cols, data, deep, event, visible }: TreeProps<T>) {
  const [showChild, setShowChild] = useState(false);
  // 用于控制子节点的隐藏和显示
  const visibleClass = deep === 1 ? "" : visible ? "" : "hidden";
  return (
    <>
      {cols.map((col, index) => {
        if (col.options) {
          return (
            <div
              key={"father" + index}
              className={
                "font-sans text-sm pr-2 pt-4 pb-4 border-t " + visibleClass
              }
              style={{
                paddingLeft: deep + "rem",
              }}
            >
              <Option options={col.options} event={event} data={data as T} />
            </div>
          );
        } else {
          return (
            <div
              key={"father" + index}
              className={
                "font-sans text-sm pr-2 pt-4 pb-4 border-t flex items-center overflow-hidden " +
                visibleClass
              }
              style={{
                paddingLeft: deep + "rem",
              }}
            >
              {deep === 1 && index === 0 && (
                <div
                  className="cursor-pointer mr-2"
                  onClick={() => {
                    setShowChild(!showChild);
                  }}
                >
                  {data.children && data.children.length > 0 && (
                    <SVG name="add" />
                  )}
                </div>
              )}
              {col.render ? (
                col.render(data as T)
              ) : (
                <span>{(data as Record<string, string>)[col.dataIndex]}</span>
              )}
            </div>
          );
        }
      })}
      {data.children &&
        data.children.length > 0 &&
        data.children.map((child, childIndex) => {
          return (
            <Tree<T>
              key={"childIndex" + childIndex}
              cols={cols}
              data={child as ChildrenInItem<T>}
              deep={deep + 1}
              event={event}
              visible={deep === 1 ? showChild : visible}
            />
          );
        })}
    </>
  );
}

export default Tree;
