import { TableCols } from "../../types";
import Option from "./Option";

export type ChildrenInItem<T> = {
  children?: T[];
};

//  当前组件用于渲染表格数据
interface TreeProps<T> {
  cols: TableCols<T>;
  data: ChildrenInItem<T>;
  deep: number;
  event: (type: string, item: T) => void;
}

function Tree<T>({ cols, data, deep, event }: TreeProps<T>) {
  return (
    <>
      {cols.map((col, index) => {
        if (col.options) {
          return (
            <div
              key={"father" + index}
              className={"font-sans text-sm pr-2 pt-4 pb-4 border-t "}
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
              className={"font-sans text-sm pr-2 pt-4 pb-4 border-t "}
              style={{
                paddingLeft: deep + "rem",
              }}
            >
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
            />
          );
        })}
    </>
  );
}

export default Tree;
