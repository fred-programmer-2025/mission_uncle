import React, { useState, useRef, useEffect } from "react";
import "../styles/components/FanReviews.scss";
import avatar1 from "../assets/avatar1.jpg";
import avatar2 from "../assets/avatar2.jpg";
import avatar3 from "../assets/avatar3.jpg";
import avatar4 from "../assets/avatar4.jpg";
import stickerImgYellow from '../assets/sticker.png';
import stickerImg from '../assets/sticker_green.png';
import fansReviewsBg from '../assets/fans_reviews_bg.jpg';

const FanReviews = () => {
  // 滑動相關狀態
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const isMobileBreakpoint = useRef(false);

  // 假資料（你可以改成 API 請求）
  const reviews = [
    {
      id: 1,
      name: "Amy Lin",
      rating: 4,
      comment: "第一次使用就超滿意！大叔超貼心，幫我照顧爸媽，讓我更放心，真的很推薦！",
      avatar: avatar1
    },
    {
      id: 2,
      name: "Fred Chen",
      rating: 4,
      comment: "找大叔幫忙搬家，態度好又效率快，服務完全超出預期，給個大大的讚！",
      avatar: avatar2
    },
    {
      id: 3,
      name: "Lisa Wang",
      rating: 5,
      comment: "和大叔聊天真的好舒服又溫馨，像是找到了一位可靠的朋友，下次一定會再來預約！",
      avatar: avatar3
    },
    {
      id: 4,
      name: "Jack Huang",
      rating: 5,
      comment: "大叔真是愛莫能助的雜事，非常尊重又貼心，大大提升了我的生活品質！",
      avatar: avatar4
    }
  ];

  // 判斷是否是手機版
  const handleResize = () => {
    const width = window.innerWidth;
    isMobileBreakpoint.current = width < 768;
  };

  // 監聽窗口大小變化
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 處理滑動到下一個評論
  const handleSlideNext = () => {
    if (activeIndex < reviews.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // 處理滑動到上一個評論
  const handleSlidePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // 處理觸控開始
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // 處理觸控移動
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // 處理觸控結束
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // 向左滑動
      handleSlideNext();
    } else if (touchStart - touchEnd < -75) {
      // 向右滑動
      handleSlidePrev();
    }
  };

  // 渲染星級評分
  const renderStars = (rating) => {
    return (
      <div className="text-star">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? "fs-5" : "fs-5 text-muted"}>★</span>
        ))}
      </div>
    );
  };

  return (
    <section className="fan-reviews position-relative py-5">
      {/* 背景 */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
        backgroundImage: `url(${fansReviewsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 1,
        zIndex: -1
      }}></div>

      <div className="container py-3">
        {/* 標題 */}
        <div className="text-center position-relative fans-reviews-title-position mb-5">
          <div className="px-3 py-1 d-inline-block position-relative" style={{ 
            border: "1px solid #000",
            backgroundColor: "rgba(165, 238, 157, 1)",
            boxShadow: '2px 3px 4px rgba(0, 0, 0, 0.25)'
          }}>
            <p className="fw-bold text-black m-0" style={{ fontSize: 'clamp(12px, 1.2vw , 28px)'}}>粉絲好評</p>
          </div>
        </div>

        {/* 桌面版評論卡片 - 並排顯示 */}
        <div className="d-none d-md-block">
          <div className="row g-5 position-relative">
            {reviews.map((review) => (
              <div key={review.id} className="col-md-6 col-lg-3">
                <div className="bg-white border border-dark border-adjust p-4 position-relative h-100">
                  {/* 貼紙圖片 */}
                  <div className="position-absolute" style={{ 
                    top: "-30px", 
                    left: "5px", 
                    width: "84px", 
                    height: "40px", 
                    zIndex: 2
                  }}>
                    <img 
                      src={stickerImgYellow} 
                      alt="tape" 
                      className="img-fluid"
                    />
                  </div>

                  {/* 頭像和星星評分在同一行 */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="rounded-circle" 
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    {renderStars(review.rating)}
                  </div>

                  {/* 名字 */}
                  <h5 className="fw-bold mb-2">{review.name}</h5>
                  
                  {/* 灰色分隔線 */}
                  <hr className="my-2" style={{ backgroundColor: "#dee2e6" }} />

                  {/* 評論內容 */}
                  <p className="mb-0" style={{ fontSize: "14px" }}>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 手機版評論卡片 - 滑動顯示 */}
        <div className="d-md-none">
          <div className="mobile-reviews">
            {/* 第一個卡片始終顯示 */}
            <div 
              className="mobile-card-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {reviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className={`mobile-card ${index === activeIndex ? 'active' : ''}`}
                >
                  <div className="card-content p-3 bg-white shadow border border-dark border-adjust">
                    {/* 貼紙圖片 */}
                    <div className="sticker-wrapper">
                      <img 
                        src={index === 0 ? stickerImg : stickerImgYellow} 
                        alt="tape" 
                        className="img-fluid"
                      />
                    </div>

                    {/* 頭像和星星評分在同一行 */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="rounded-circle" 
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      {renderStars(review.rating)}
                    </div>

                    {/* 名字 */}
                    <h5 className="fw-bold mb-2">{review.name}</h5>
                    
                    {/* 灰色分隔線 */}
                    <hr className="my-2" style={{ backgroundColor: "#dee2e6" }} />

                    {/* 評論內容 */}
                    <p className="mb-0" style={{ fontSize: "14px" }}>{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 導航指示點 */}
          <div className="d-flex justify-content-center mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`btn btn-sm mx-1 p-0 radio-position ${index === activeIndex ? 'bg-success' : 'bg-secondary'}`}
                style={{ width: "30px", height: "4px", border: "none", borderRadius: "2px" }}
                onClick={() => setActiveIndex(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FanReviews;