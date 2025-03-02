import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BG_IMAGE_URL =
  "https://s3-alpha-sig.figma.com/img/f782/7138/0a6d141679a20e4e25a4d50d601e4747?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LWuY2KR9xEqJ9tPHvfDljeta~HEaN15LHsIcZeDawNHkg-lsdzok0mkGdhoMvqKwnL5hqx1ggCXXgRZ20Mt97nuu5WrdMgqpdhT-JV6hHJsmvOva1Jj4ViE9JVjMccy2NUu-md0Ck8knvf7sYks5-Z4olhG0H1aLSsH-skScF9TxY~JoJuJU~Wh9Sbitz7o1B7GP5c-tOgikzZ9Zg~IzvKyO6C6xgZeoU4LOCPOnBbbnrP-tTcomucLnyr~QMo1Le2Nr1vV3jhga0ymKoOYpKp5vuuBSGH3NwvaTb5-nx5DBK9hBbZMQrjEb72yVfKcQiKXebXZT9U7L892JuiBFwg__";

function Checkout() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const formData = location.state?.formData || {};

  if (!location.state || !cartItems.length) {
    return (
      <Container className="mt-5 text-center">
        <h4>無訂單資料</h4>
        <Link to="/" className="btn btn-primary">返回首頁</Link>
      </Container>
    );
  }

  // 計算總金額
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <Container className="mt-5">
      <div
        className="bg-cover d-flex justify-content-center align-items-center"
        style={{ backgroundImage: `url(${BG_IMAGE_URL})`, minHeight: "300px" }}
      >
        <section className="bg-dark bg-opacity-75 text-center text-light p-4">
          <h1 className="fw-bold">訂單完成</h1>
          <p className="fw-bold fs-5">感謝您的購買！</p>
          <Link to="/uncleinfo" className="btn btn-outline-light mt-3">
            繼續逛逛
          </Link>
        </section>
      </div>

      <Row className="justify-content-center my-5">
        <Col md={8}>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;