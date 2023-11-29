import { TableCols } from "../../types";

interface TableProps<T> {
  cols: TableCols<T>;
  data: T[];
}

function Table<T>({ cols, data }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            {cols.map((col) => (
              <th key={col.title}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={cols.length + 1}>
                <div className="h-16 flex justify-center items-center">
                  <span className="font-mono text-gray-400 text-lg">
                    no results
                  </span>
                </div>
              </td>
            </tr>
          )}
          {data.length !== 0 &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  {cols.map((col) => {
                    return col.render ? (
                      col.render(item)
                    ) : (
                      <td key={col.dataIndex}>{(item as Record<string, string>)[col.dataIndex]}</td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
