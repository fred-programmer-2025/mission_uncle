import { useState, useEffect, useCallback } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import ArticleDetailModal from "../components/ArticleDetailModal";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../styles/components/ArticlePageStyle.scss";
import "../styles/components/ArticleBannerStyle.scss";

const url = import.meta.env.VITE_BASE_URL;
const path = import.meta.env.VITE_API_PATH;
let defaultModalState = {
  author: "",
  create_at: "",
  description: "",
  id: "",
  image: "",
  isPublic: true,
  num: "",
  tag: [],
  title: "",
  content: "",
};
function ArticlePage() {
  //---------用於轉換頁面顯示筆數10轉6
  const articlesPerPage = 6; // 每頁顯示 6 筆
  const [apiArticles, setApiArticles] = useState([]); // 存 API 回傳的 10 筆
  const [displayArticles, setDisplayArticles] = useState([]); // 當前顯示的 6 筆
  const [pageInfo, setPageInfo] = useState({
    total_pages: 1,
    current_page: 1,
    has_pre: false,
    has_next: false,
  });
  //------

  const handlePageChange = useCallback(
    (page, articlesData = apiArticles) => {
      if (!articlesData || articlesData.length === 0) {
        return;
      }

      const totalArticles = articlesData.length;
      const totalPages = Math.ceil(totalArticles / articlesPerPage);
      const startIndex = (page - 1) * articlesPerPage;
      const endIndex = Math.min(startIndex + articlesPerPage, totalArticles);
      const paginatedArticles = articlesData.slice(startIndex, endIndex);

      setDisplayArticles(paginatedArticles);
      setPageInfo({
        total_pages: totalPages,
        current_page: page,
        has_pre: page > 1,
        has_next: page < totalPages,
      });
    },
    [apiArticles, articlesPerPage]
  );

  //------
  //getArticles 取得所有文章
  const getArticles = useCallback(async () => {
    let allArticles = [];
    let page = 1;
    let hasNext = true;

    while (hasNext) {
      try {
        const response = await axios.get(
          `${url}/api/${path}/articles?page=${page}`
        );
        allArticles = [...allArticles, ...response.data.articles];
        if (!response.data.pagination.has_next) {
          hasNext = false;
        } else {
          page += 1;
        }
      } catch (error) {
        hasNext = false;
        console.error("Error fetching articles:", error);
      }
    }

    setApiArticles(allArticles);
    handlePageChange(1, allArticles);
  }, [handlePageChange]); // 依賴變數

  useEffect(() => {
    getArticles();
  }, [getArticles]); // 加入依賴陣列

  //---------用於轉換頁面顯示筆數10轉6
  //---------------------------ArticleDetailModal
  //取得單篇文章content內容
  const getArticle = async (id) => {
    try {
      const response = await axios.get(`${url}/api/${path}/article/${id}`);
      return response.data;
    } catch (error) {
      alert(error);
    }
  };
  //ArticleDetailModal關閉狀態
  const [isArticleDetailModalOpen, setIsArticleDetailModalOpen] =
    useState(false);
  //打開ArticleDetailModal關閉狀態
  const handleOpenArticleDetailModal = async (article) => {
    const singleArticle = await getArticle(article.id);
    setTempArticle(singleArticle.article);
    setIsArticleDetailModalOpen(true);
  };
  //ArticleDetailModal 頁面資料狀態
  const [tempArticle, setTempArticle] = useState(defaultModalState);
  //---------------------------ArticleDetailModal

  return (
    <>
      <div className="banner d-flex align-items-center justify-content-start">
        <h2 className="text-start banner-title mb-4">精選文章</h2>
      </div>
      {/* <!-- 主要內容 -------------------------> */}
      <div className="container my-5">
        <div className="row">
          {/* <!-- 文章卡片 --> */}
          {displayArticles && displayArticles.length > 0 ? (
            displayArticles.map((article) => (
              <Card
                key={article.id}
                article={article}
                handleOpenArticleDetailModal={handleOpenArticleDetailModal}
              ></Card>
            ))
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(255,255,255,0.3)",
                zIndex: 999,
                fontSize: 20,
                top: 85,
              }}
            >
              <ClipLoader
                color={"#000000"}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </div>
        {/* <!-- 分頁 --> */}
        {displayArticles && displayArticles.length > 0 ? (
          <Pagination
            pageInfo={pageInfo}
            handlePageChange={handlePageChange}
          ></Pagination>
        ) : (
          ""
        )}
      </div>
      {/* <!-- 頁腳 --> */}
      {/** modal */}
      <ArticleDetailModal
        tempArticle={tempArticle}
        getArticles={getArticles}
        isOpen={isArticleDetailModalOpen}
        setIsOpen={setIsArticleDetailModalOpen}
      />
    </>
  );
}
export default ArticlePage;
