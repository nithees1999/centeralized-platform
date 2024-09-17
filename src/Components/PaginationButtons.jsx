import ReactPaginate from "react-paginate";
import React, { useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
export default function PaginationButtons(props) {
    const { currentPage, setCurrentPage, totalPosts, postsPerPage, resetPageNumber, setResetPageNumber } = props
    const totalPages = Math.max(Math.ceil(totalPosts / postsPerPage), 1);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1)
    }

    const showNextButton = currentPage < totalPages;
    const showPrevButton = currentPage > 1;

    useEffect(() => {
        if (resetPageNumber) {
            setCurrentPage(1);
            setResetPageNumber(false)
        }
    }, [resetPageNumber, setCurrentPage, setResetPageNumber]);


    return (
        <div>
            <ReactPaginate
                breakLabel={<span className="m-2">...</span>}
                previousLabel={showPrevButton ? <span className="w-10 h-10 flex items-center justify-center bg-gray-400 rounded-md"><BsChevronLeft /></span> : null}
                nextLabel={showNextButton ? <span className="w-10  h-10 flex items-center justify-center bg-gray-400 rounded-md"><BsChevronRight /></span> : null}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                forcePage={currentPage - 1}
                renderOnZeroPageCount={null}
                containerClassName="flex items-center justify-center mt-8 mb-4"
                pageClassName="block border bg-gray-200 hover:bg-gray-400 m-2 w-10 h-10 flex items-center justify-center rounded-md"
                activeClassName="bg-gray-600 text-white"
            />
        </div>
    )
}