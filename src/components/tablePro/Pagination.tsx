import { FC } from "react";

interface PaginationProps {
  pageNum: number;
  total: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({ pageNum, total, setPageNum }) => {
  const changePage = (page: number) => {
    if (page > 0 && page <= total) {
      setPageNum(page);
    }
  };
  return (
    <div className="flex justify-between mt-4">
      <div className="join grid grid-cols-2 w-56">
        <button
          className="join-item btn btn-sm btn-outline"
          onClick={() => {
            changePage(1);
          }}
        >
          首页
        </button>
        <button
          className="join-item btn btn-sm btn-outline"
          onClick={() => {
            changePage(total);
          }}
        >
          最后一页
        </button>
      </div>
      <div className="font-mono">
        <span className="text-primary">{pageNum}</span>/{total}
      </div>
      <div className="join grid grid-cols-2 w-56">
        <button
          className="join-item btn btn-sm btn-outline"
          onClick={() => {
            changePage(pageNum - 1);
          }}
        >
          上一页
        </button>
        <button
          className="join-item btn btn-sm btn-outline"
          onClick={() => {
            changePage(pageNum + 1);
          }}
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default Pagination;
