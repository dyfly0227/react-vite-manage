import Table from "./Table";
import Pagination from "./Pagination";
import { TableCols } from "../../types";
import { useEffect, useState } from "react";

interface IndexProps<T> {
  request: (p: Record<string, unknown>) => Promise<{
    data: T[];
    code: number;
    total: number;
  }>;
  cols: TableCols<T>;
  params?: Record<string, unknown>;
  pageSize: number;
}

function Index<T>({ request, cols, params, pageSize = 10 }: IndexProps<T>) {
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    request({
      pageNum,
      pageSize,
    }).then((res) => {
      if (res.code === 200) {
        setData(res.data);
      }
    });
  }, [pageNum]);
  return (
    <div>
      <Table<T> cols={cols} data={data} />
      <Pagination />
    </div>
  );
}

export default Index;
