import React from "react";

const FanReviews = () => {
  // 假資料（你可以改成 API 請求）
  const reviews = [
    {
      id: 1,
      name: "Amy Lin",
      rating: 5,
      comment: "大叔出任務真的很棒，讓我認識了很多有趣的大叔，話題也很有深度，推薦！",
      avatar: "https://source.unsplash.com/50x50/?woman,face"
    },
    {
      id: 2,
      name: "Fred Chen",
      rating: 4,
      comment: "平台設計得很好，活動很有趣，希望未來可以有更多互動機會！",
      avatar: "https://source.unsplash.com/50x50/?man,beard"
    },
    {
      id: 3,
      name: "Lisa Wang",
      rating: 5,
      comment: "這裡的大叔們都很熱情，給了我很多建議，感覺就像多了幾個人生導師！",
      avatar: "https://source.unsplash.com/50x50/?woman,smile"
    },
    {
      id: 4,
      name: "Jack Huang",
      rating: 5,
      comment: "活動安排得很棒，還有很多有趣的文章可以閱讀，超喜歡這個社群！",
      avatar: "https://source.unsplash.com/50x50/?man,hat"
    }
  ];

  return (
    <section className="fan-reviews container my-5">
      {/* 標題 */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">粉絲好評</h2>
      </div>

      {/* 四則評論 */}
      <div className="row">
        {reviews.map((review) => (
          <div key={review.id} className="col-md-6 col-lg-3">
            <div className="review-card p-3 bg-light shadow-sm rounded position-relative">
              {/* 頭像 */}
              <div className="d-flex align-items-center mb-2">
                <img src={review.avatar} alt={review.name} className="rounded-circle me-2" />
                <h5 className="m-0">{review.name}</h5>
              </div>

              {/* 星級評分 */}
              <div className="text-warning mb-2">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </div>

              {/* 評論內容 */}
              <p className="text-muted">{review.comment}</p>

              {/* 便利貼樣式 */}
              <div className="position-absolute top-0 start-50 translate-middle-x bg-success text-white px-3 py-1 rounded">
                推薦
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FanReviews;
