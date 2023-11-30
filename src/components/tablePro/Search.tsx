import { useState } from "react";
import { TableCols } from "../../types";
import FormItem from "./FormItem";

interface SearchProps<T> {
  cols: TableCols<T>;
  searchHandle: (data: T) => void;
}

function Search<T>({ cols, searchHandle }: SearchProps<T>) {
  const [formData, setFormData] = useState<T>({} as T);
  return (
    <details className="dropdown">
      <summary className="m-1 btn btn-info">筛选</summary>
      <div className=" p-4 w-full border">
        <div className="flex flex-wrap items-center">
          {cols.map((col) => {
            return !col.hideInSearch ? (
              <div className="mr-8" key={col.dataIndex}>
                <FormItem<T>
                  col={col}
                  data={{} as T}
                  formData={formData}
                  setFormData={setFormData}
                  formId="search"
                />
              </div>
            ) : null;
          })}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-sm"
            onClick={() => {
              searchHandle({} as T);
              setFormData({} as T);
            }}
          >
            重置
          </button>
          <button
            className="btn btn-primary ml-4 btn-sm"
            onClick={() => {
              searchHandle(formData);
            }}
          >
            搜索
          </button>
        </div>
      </div>
    </details>
  );
}

export default Search;
