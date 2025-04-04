import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

ArticleDetailModal.propTypes = {
  tempArticle: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

function ArticleDetailModal({ tempArticle, isOpen, setIsOpen }) {
  //modal page
  const ArticleDetailModalRef = useRef(null);

  // modal page
  useEffect(() => {
    new Modal(ArticleDetailModalRef.current, {
      backdrop: "static",
    });
  }, []);

  const handleCloseArticleDetailModal = () => {
    const modalInstance = Modal.getInstance(ArticleDetailModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(ArticleDetailModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);

  // modal page
  return (
    <div className="modal" ref={ArticleDetailModalRef} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"> {tempArticle?.title} </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseArticleDetailModal}
            ></button>
          </div>
          <div className="modal-body">
            <img
              src={tempArticle?.image || undefined}
              className="card-img-top primary-image"
              alt="主圖"
            />
            <div className="card-body">
              <p className="card-text">{tempArticle?.description}</p>
              <p className="card-text">{tempArticle?.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ArticleDetailModal;
