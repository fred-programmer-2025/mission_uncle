import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import ArticlePageStyle from "../styles/ArticlePageStyle";
import UncleInfoCard from "../components/UncleInfoCard";
import Pagination from "../components/Pagination";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default  function UncleInfoPage() {
  const productsPerPage = 6; // 每頁顯示 6 筆
  const [apiProducts, setApiProducts] = useState([]); // 存 API 回傳
  const [displayProducts, setDisplayProducts] = useState([]); // 當前顯示的 6 筆
  const [pageInfo, setPageInfo] = useState({
    total_pages: 1,
    current_page: 1,
    has_pre: false,
    has_next: false,
  });

  const handlePageChange = (page, productsData = apiProducts) => {
    if (!productsData || productsData.length === 0) {
      return;
    }

    const totalProducts = productsData.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, totalProducts);
    const paginatedProducts = productsData.slice(startIndex, endIndex);
    
    setDisplayProducts(paginatedProducts); // 更新當前顯示的筆數
    setPageInfo({
      total_pages: totalPages,
      current_page: page,
      has_pre: page > 1,
      has_next: page < totalPages,
    });
  };

  const getProducts = async () => {
    let allProducts = [];
    let page = 1;
    let hasNext = true;

    while (hasNext) {
      try {
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/products?page=${page}`);
        allProducts = [...allProducts, ...res.data.products];
        if (!res.data.pagination.has_next) {
          hasNext = false;
        } else {
          page += 1;
        }
      } catch (error) {
        hasNext = false;
      }
    }

    setApiProducts(allProducts); // 儲存所有產品
    handlePageChange(1, allProducts); // 預設顯示第 1 頁
  };
  
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  return (
    <ArticlePageStyle>
      <div className="container my-5">
        <div className="row">
          {/* <!-- 卡片 --> */}
          {displayProducts && displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <UncleInfoCard key={product.id} product={product} length={displayProducts.length}></UncleInfoCard>
            ))
          ) : (
            <div>
              <p>⚠️ 尚無資料</p>
            </div>
          )}
        </div>
      </div>
      {/* <!-- 分頁 --> */}
      <Pagination
        pageInfo={pageInfo}
        handlePageChange={handlePageChange}
      ></Pagination>
    </ArticlePageStyle>
  )
}