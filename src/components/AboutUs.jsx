import React from "react";

const AboutUs = () => {
  return (
    <section className="about-us container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">關於我們</h2>
      </div>
      <div className="row align-items-center">
        <div className="col-lg-6">
          <p className="lead">
            「大叔出任務」是一個專屬於大叔的聚會平台，專為那些希望在生活中尋找更多連結與樂趣的大叔們打造。
          </p>
          <button className="btn btn-success btn-lg">瞭解大叔</button>
        </div>
        <div className="col-lg-6">
          <img src="https://source.unsplash.com/600x300/?friends,laughing" alt="大叔3" className="img-fluid rounded" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
