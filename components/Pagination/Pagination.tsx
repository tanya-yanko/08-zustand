import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1);
  };

  return (
    <div className={styles.paginationWrapper}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="→"
        previousLabel="←"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        pageCount={totalPages}       
        forcePage={currentPage - 1}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
        pageClassName={styles.pageItem}
        previousClassName={styles.nav}
        nextClassName={styles.nav}
        breakClassName={styles.break}
      />
    </div>
  );
}