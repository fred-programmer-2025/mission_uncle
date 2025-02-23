import React from "react";

const ContactUs = () => {
  return (
    <section className="contact-us container my-5">
      {/* 標題 */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">聯絡我們</h2>
        <p className="text-muted">如果有任何問題或需要協助，歡迎透過表單聯絡我們，或直接來訪我們的客服中心！</p>
      </div>

      <div className="row">
        {/* 聯絡表單 */}
        <div className="col-md-6">
          <div className="bg-light p-4 rounded shadow-sm">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">姓名</label>
                <input type="text" className="form-control" id="name" placeholder="請輸入您的姓名" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">電子郵件</label>
                <input type="email" className="form-control" id="email" placeholder="請輸入您的電子郵件" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">訊息</label>
                <textarea className="form-control" id="message" rows="4" placeholder="請輸入您的訊息"></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100">送出訊息</button>
            </form>
          </div>
        </div>

        {/* 客服資訊 */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-center">
          <img src="https://source.unsplash.com/200x200/?customer,service" alt="客服人員" className="rounded-circle mb-3 shadow-sm" />
          <h5 className="fw-bold">客服中心</h5>
          <p className="text-muted">Call us, we are glad to help!</p>
          <button className="btn btn-outline-success">立即聯絡</button>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
