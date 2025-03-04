import styled from "styled-components";
export const ArticlePageStyle = styled.section`
  --theme-border: #a5ee9d;
  --theme-title: #5caf55;
  --theme-color: #e0e0e0;
  --card-hover: rgb(248, 248, 249);
  --button-active: #333435;

  .article-card {
    overflow: hidden;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:hover {
      background-color: var(--card-hover);
    }
  }

  .article-card img {
    width: 100%;
    height: 240px;
    object-fit: cover;
  }

  .frame {
    position: relative;
    z-index: 0;
    margin: 3%;
  }

  .frame::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--theme-border);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    mask-image: radial-gradient(
      ellipse 80% 80% at 50% 50%,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 1) 58%,
      rgba(0, 0, 0, 1) 0%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 80% 80% at 50% 50%,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 1) 58%,
      rgba(0, 0, 0, 1) 0%
    );
  }

  .article-card:hover .frame::after {
    opacity: 1;
  }

  .article-card h5 {
    color: var(--theme-title);
    background-color: transparent;
    transition: background-color 0.3s ease;
  }

  .article-card .card-body {
    padding: 10px;
    font-weight: 500;
  }

  .article-card .btn {
    background-color: var(--theme-color);
    border-radius: 0;
    cursor: pointer;
    color: #333435;
    border: 1px solid rgb(161, 161, 161);
    font-weight: 500;
    margin-top: auto; /* 讓按鈕總是在底部 */
    min-width: 123px;
  }

  .article-card:hover .btn,
  .article-card:hover .frame,
  .article-card:hover h5 {
    background-color: var(--button-active);
    color: white;
  }

  .article-card:hover h5 {
    background-color: #000;
    color: var(--theme-border);
  }

  .active-page {
    background-color: #000;
    color: #fff !important;
  }

  @media (max-width: 768px) {
    .frame {
      margin: 4% 1%;
      display: flex;
      align-items: center; /* 讓圖片在垂直方向置中 */
      justify-content: center;
    }
    .frame img {
      flex: 1 1 10em;
      width: 10em;
      height: 180px;
      object-fit: cover;
      border: 2px solid black;
      outline: 5px solid var(--theme-border);
      border-radius: 10%;
    }

    /* 取消遮色效果 */
    .frame::after {
      display: none;
    }
  }
`;
export default ArticlePageStyle;