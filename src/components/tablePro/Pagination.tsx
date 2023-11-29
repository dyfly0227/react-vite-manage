import { FC } from "react";

interface PaginationProps {}

const Pagination: FC<PaginationProps> = ({}) => {
  return (
    <div className="flex justify-between mt-4">
      <div className="join grid grid-cols-2 w-56">
      <button className="join-item btn btn-sm btn-outline">首页</button>
      <button className="join-item btn btn-sm btn-outline">最后一页</button>
    </div>
    <div className="font-mono">
      <span className="text-primary">1</span>/28
    </div>
    <div className="join grid grid-cols-2 w-56">
      <button className="join-item btn btn-sm btn-outline">上一页</button>
      <button className="join-item btn btn-sm btn-outline">下一页</button>
    </div>
    </div>
  );
};

export default Pagination;
