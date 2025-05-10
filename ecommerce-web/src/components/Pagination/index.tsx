"use client";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

import ReactPaginate from "react-paginate";
import "./styles.scss";

const Pagination = () => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<MdOutlineNavigateNext size={30} />}
      pageCount={5}
      previousLabel={<GrFormPrevious size={30} />}
      className="pagination-container"
      pageLinkClassName="pagination-link"
      activeClassName="active"
    />
  );
};

export default Pagination;
