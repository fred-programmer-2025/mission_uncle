import "../styles/components/PaginationStyle.scss";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pageInfo: PropTypes.shape({
    total_pages: PropTypes.number.isRequired,
    current_page: PropTypes.number.isRequired,
    has_pre: PropTypes.bool.isRequired,
    has_next: PropTypes.bool.isRequired,
  }).isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

function Pagination({ pageInfo, handlePageChange }) {
  return (
    <>
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          {/* 上一頁 */}
          <li className="page-item">
            <a
              className={`page-link ${!pageInfo.has_pre && "disabled"}`}
              onClick={() => handlePageChange(pageInfo.current_page - 1)}
            >
              &lt;
            </a>
          </li>

          {/* 頁數按鈕 */}
          {Array.from({ length: pageInfo.total_pages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                pageInfo.current_page === index + 1 && "active-page"
              }`}
            >
              <a
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}

          {/* 下一頁 */}
          <li className="page-item">
            <a
              className={`page-link ${!pageInfo.has_next && "disabled"}`}
              onClick={() => handlePageChange(pageInfo.current_page + 1)}
            >
              &gt;
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Pagination;
