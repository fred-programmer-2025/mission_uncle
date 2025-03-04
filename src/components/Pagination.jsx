
import PaginationStyle from "../styles/PaginationStyle";
function Pagination({ pageInfo, handlePageChange }) {
  return (
    <>
      <nav className="d-flex justify-content-center mt-4">
        <PaginationStyle>
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
        </PaginationStyle>

      </nav>
    </>
  );
}
export default Pagination;