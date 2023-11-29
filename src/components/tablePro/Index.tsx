import Table from "./Table";
import Pagination from "./Pagination";
import { TableCols, TableRequsetParams } from "../../types";
import { useEffect, useState } from "react";
import Tool from "./Tool";

interface IndexProps<T> {
  request: (p: TableRequsetParams) => Promise<{
    data: T[];
    code: number;
    total: number;
  }>;
  cols: TableCols<T>; // 列配置
  params?: Record<string, unknown>; // 额外的请求参数
  pageSize?: number;
  event: (type: string, item: T) => void; // 操作栏按钮的回调
  tool?: string[]; // 表格上方工具栏按钮
  toolHandle?: (type: string) => void; // 格上方工具栏按钮回调
}

function Index<T>({
  request,
  cols,
  params,
  pageSize = 10,
  event,
  tool,
  toolHandle
}: IndexProps<T>) {
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    request({
      pageNum,
      pageSize,
      ...params,
    }).then((res) => {
      if (res.code === 200) {
        setData(res.data);
      }
    });
  }, [pageNum]);
  return (
    <div>
      {
        tool && toolHandle && <Tool tool={tool} toolHandle={toolHandle}/>
      }
      <Table<T> cols={cols} data={data} event={event} />
      <Pagination />
    </div>
  );
}

export default Index;
