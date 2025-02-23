import React from "react";

const RecommendedList = () => {
  const uncles = [
    { id: 1, name: "大叔 1", image: "https://source.unsplash.com/400x400/?man,redhat" },
    { id: 2, name: "大叔 2", image: "https://source.unsplash.com/400x400/?man,beard" },
    { id: 3, name: "大叔 3", image: "https://source.unsplash.com/400x400/?man,smile" },
  ];

  return (
    <section className="recommended-list container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">我推的大叔</h2>
      </div>
      <div className="row">
        {uncles.map((uncle, index) => (
          <div key={uncle.id} className="col-md-4">
            <div className="card text-center border-0">
              <div className="position-relative">
                <div className="position-absolute top-0 start-0 bg-success text-white p-2 fw-bold">{index + 1}</div>
                <img src={uncle.image} alt={uncle.name} className="card-img-top rounded" />
              </div>
              <div className="card-body">
                <button className="btn btn-success btn-sm">了解大叔</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedList;
