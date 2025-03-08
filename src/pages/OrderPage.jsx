import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "../styles/components/Cart.scss";
import BackgroundTree from "../components/BackgroundTree";
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function OrderPage() {
  const [order, setOrder] = useState([]);
  const getOrder = async () => {
    // setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/orders`);
      console.log(res.data.orders);
      // setOrder(res);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('取得訂單列表失敗');
    } finally {
      // setIsScreenLoading(false);
    }
  }

  useEffect(() => {
    getOrder();
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  return (
    <>
    <BackgroundTree title={'謝謝購物'}/>
    {/* <div className="container">
      <div className="row">
        <Card className="p-4 border">
          <h4 className="fw-bold text-center">訂單明細</h4>
          <hr />
          <Row>
            <Col md={6}>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex align-items-center my-3">
                  <img
                    src={item.product.imageUrl || "/default-image.jpg"}
                    alt={item.product.title}
                    className="me-3 img-fluid"
                    style={{ maxWidth: "80px" }}
                    onError={(e) => (e.target.src = "/default-image.jpg")}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">{item.product.title}</h6>
                    <p className="text-muted">NT ${item.product.price} / 份 x {item.qty}</p>
                  </div>
                </div>
              ))}
            </Col>
            <Col md={6}>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between">
                  <span className="fw-normal">電子郵件</span>
                  <span>{formData.email || "N/A"}</span>
                </li>
                <li className="d-flex justify-content-between">
                  <span className="fw-normal">收件人姓名</span>
                  <span>{formData.name || "N/A"}</span>
                </li>
                <li className="d-flex justify-content-between">
                  <span className="fw-normal">收件人電話</span>
                  <span>{formData.tel || "N/A"}</span>
                </li>
                <hr />
                <li className="d-flex justify-content-between">
                  <span className="fw-bold">付款金額</span>
                  <span>NT ${total}</span>
                </li>
                <li className="d-flex justify-content-between">
                  <span className="fw-normal">付款方式</span>
                  <span>{formData.payment || "N/A"}</span>
                </li>
                <li className="d-flex justify-content-between fw-bold">
                  <span>付款狀態</span>
                  <span
                    className={
                      formData.paymentStatus === "已付款"
                        ? "text-success"
                        : "text-danger d-none" // 未付款時隱藏
                    }
                  >
                    {formData.paymentStatus || "未付款"}
                  </span>
                </li>
              </ul>
            </Col>
          </Row>
        </Card>
      </div>
    </div> */}
    </>
  );
}