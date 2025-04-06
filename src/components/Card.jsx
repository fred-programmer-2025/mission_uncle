import PropTypes from "prop-types";
Card.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  handleOpenArticleDetailModal: PropTypes.func.isRequired,
};

function Card({ article, handleOpenArticleDetailModal }) {
  return (
    <>
      <div className="col-12 col-md-4 col-xxl-4">
        <div className="article-card d-flex flex-row flex-md-column ">
          <div className="w-30 w-md-100 frame">
            <img src={article.image} alt={article.title} />
          </div>
          <div className="card-body w-70 w-md-100 text-start d-grid">
            <h5>{article.title}</h5>
            <p className="mt-2">{article.description}</p>
            <button
              onClick={() => handleOpenArticleDetailModal(article)}
              className="btn btn-dark"
            >
              閱讀全文
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card;
