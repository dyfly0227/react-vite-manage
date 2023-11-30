import Table from "./Table";
import Pagination from "./Pagination";
import { TableCols, TableRequsetParams } from "../../types";
import { useEffect, useState } from "react";
import Tool from "./Tool";
import Search from "./Search";

interface IndexProps<T> {
  request: (p: TableRequsetParams) => Promise<{
    data: T[];
    code: number;
    total: number;
  }>;
  formKey: number; // 用于控制表格刷新
  cols: TableCols<T>; // 列配置
  params?: Record<string, unknown>; // 额外的请求参数
  pageSize?: number;
  event: (type: string, item: T) => void; // 操作栏按钮的回调
  tool?: string[]; // 表格上方工具栏按钮
  toolHandle?: (type: string) => void; // 格上方工具栏按钮回调
  hideSearch?: boolean; // 是否隐藏Search表单
  beforeSearch?: (data: T) => Record<string, string | number>; // 用来处理数据格式或者转换字段
}

function Index<T>({
  request,
  formKey,
  cols,
  params,
  pageSize = 10,
  event,
  tool,
  toolHandle,
  hideSearch,
  beforeSearch,
}: IndexProps<T>) {
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const loadData = (searchs: Record<string, number | string> = {}) => {
    request({
      pageNum,
      pageSize,
      ...params,
      ...searchs,
    }).then((res) => {
      if (res.code === 200) {
        setData(res.data);
        setTotal(Math.ceil(res.total / pageSize));
      }
    });
  };
  // 搜索
  const searchHandle = (data: T) => {
    if (beforeSearch) {
      loadData(beforeSearch(data));
    } else {
      loadData(data as Record<string, number | string>);
    }
  };
  useEffect(loadData, [pageNum, formKey]);
  return (
    <div>
      {!hideSearch && <Search cols={cols} searchHandle={searchHandle} />}
      {tool && toolHandle && <Tool tool={tool} toolHandle={toolHandle} />}
      <Table<T> cols={cols} data={data} event={event} />
      <Pagination total={total} pageNum={pageNum} setPageNum={setPageNum} />
    </div>
  );
}

export default Index;
