import { TableCols } from "../../types";
import Tree, { ChildrenInItem } from "./Tree";

interface TableProps<T> {
  cols: TableCols<T>;
  data: T[];
  event: (type: string, item: T) => void
}

function Table<T>({ cols, data, event }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols.length}, auto)`,
        }}
      >
        {cols.map((col) => (
          <div key={col.title} className="font-sans  text-gray-500 text-sm p-2">
            {col.title}
          </div>
        ))}

        {data.map((item,index) => {
          return (
            <Tree<T> key={'tree' + index} cols={cols} data={item as ChildrenInItem<T>} deep={1} event={event}/>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
