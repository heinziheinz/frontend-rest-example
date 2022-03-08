import React from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

const ThirdHandler = ({ state, onClickHandler }) => {
    // console.log(state.currentPage);
    const handleClick = (e, index) => {
        e.preventDefault();
        // console.log('check');
        // console.log(index);
        const secondObject = {
            currentPage: index
        }
        onClickHandler(secondObject);
    }
    return (
        <div className="pagination-wrapper">

            <Pagination aria-label="Page navigation example">

                <PaginationItem disabled={state.currentPage <= 0}>

                    <PaginationLink
                        onClick={e => handleClick(e, state.currentPage - 1)}
                        previous
                        href="#"
                    />

                </PaginationItem>

                {[...Array(state.pagesCount)].map((page, i) =>
                    <PaginationItem active={i === state.currentPage} key={i}>
                        <PaginationLink className="actionlink" onClick={e => handleClick(e, i)} href="#">
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem disabled={state.currentPage >= state.pagesCount - 1}>

                    <PaginationLink
                        onClick={e => handleClick(e, state.currentPage + 1)}
                        next
                        href="#"
                    />

                </PaginationItem>

            </Pagination>

        </div >
    );
}
export default ThirdHandler;