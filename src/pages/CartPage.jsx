import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const BG_IMAGE_URL =
  "https://s3-alpha-sig.figma.com/img/f782/7138/0a6d141679a20e4e25a4d50d601e4747?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LWuY2KR9xEqJ9tPHvfDljeta~HEaN15LHsIcZeDawNHkg-lsdzok0mkGdhoMvqKwnL5hqx1ggCXXgRZ20Mt97nuu5WrdMgqpdhT-JV6hHJsmvOva1Jj4ViE9JVjMccy2NUu-md0Ck8knvf7sYks5-Z4olhG0H1aLSsH-skScF9TxY~JoJuJU~Wh9Sbitz7o1B7GP5c-tOgikzZ9Zg~IzvKyO6C6xgZeoU4LOCPOnBbbnrP-tTcomucLnyr~QMo1Le2Nr1vV3jhga0ymKoOYpKp5vuuBSGH3NwvaTb5-nx5DBK9hBbZMQrjEb72yVfKcQiKXebXZT9U7L892JuiBFwg__";

function Carts() {
  const [cartItems, setCartItems] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false); // 添加 loading 狀態

  // 取得購物車資料
  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCartItems(res.data.data.carts || []); // 確保即使 carts 為空也設為空陣列
    } catch (error) {
      alert("取得購物車列表失敗");
      console.error(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // 刪除購物車項目
  const removeCartItem = async (cartItem_id) => {
    try {
      setIsScreenLoading(true);
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`);
      getCart(); // 刪除後重新獲取購物車資料
    } catch (error) {
      alert("刪除購物車品項失敗");
      console.error(error);
    } finally {
      setIsScreenLoading(false);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <div
      style={{
        width: "1920px",
        minHeight: "1280px",
        margin: "0 auto",
        position: "relative",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "1920px",
          height: "100px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <h3>NavBar 區塊（共用）</h3>
      </header>

      {/* 背景圖區塊 */}
      <div
        className="container-fluid bg-cover bg-img-height-s px-md-0"
        style={{
          width: "1920px",
          height: "204px",
          backgroundImage: `url(${BG_IMAGE_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            {/* 大螢幕顯示 */}
            <div className="col-md-5 d-none d-md-block">
              <div className="d-flex flex-column align-items-start">
                <h1 className="text-light fw-bold fs-1">
                  <br />
                  <br />
                  購物車
                </h1>
              </div>
            </div>

            {/* 小螢幕顯示 */}
            <div className="col-md-5 d-md-none">
              <div className="d-flex justify-content-center align-items-center text-shadow">
                <h1 className="text-light fw-bold fs-1">購物車</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 購物車商品介面 */}
      <div className="container my-4">
        {/* 手機版顯示 */}
        <div className="d-md-none">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="card mb-4 shadow-sm">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="me-3"
                      style={{ height: "55px", objectFit: "cover" }}
                    />
                    <div className="w-100">
                      <p className="mb-0 h6">{item.product.title}</p>
                      <p className="mb-0 text-muted">規格: {item.product.unit || "N/A"}</p>
                      <p className="mb-0 text-muted">數量: {item.qty}</p>
                      <p className="mb-0 text-muted">費用: NT ${item.product.price * item.qty}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeCartItem(item.id)}
                      disabled={isScreenLoading}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">購物車內沒有商品</p>
          )}
        </div>

        {/* 桌面版顯示 */}
        <div className="d-none d-md-block">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="text-center">
                <tr>
                  <th>大叔圖片</th>
                  <th>大叔名稱</th>
                  <th>規格</th>
                  <th>數量</th>
                  <th>費用</th>
                  <th>刪除</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center p-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="img-fluid"
                          style={{ height: "60px", objectFit: "cover" }}
                        />
                      </td>
                      <td className="align-middle text-center">{item.product.title}</td>
                      <td className="align-middle text-center">{item.product.unit || "N/A"}</td>
                      <td className="align-middle text-center">{item.qty}</td>
                      <td className="align-middle text-center">NT ${item.product.price * item.qty}</td>
                      <td className="align-middle text-center">
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => removeCartItem(item.id)}
                          disabled={isScreenLoading}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      購物車內沒有商品
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 總金額 */}
        <div className="d-flex justify-content-between justify-content-md-end mt-4">
          <p className="mb-0 h4 fw-bold me-md-3">總金額</p>
          <p className="mb-0 h4 fw-bold">NT.{totalAmount}</p>
        </div>

        {/* 按鈕 */}
        <div className="row d-flex justify-content-between mt-4">
          <div className="col-md-2">
            <Link to="/uncleinfo" className="btn btn-outline-dark w-100">
              繼續逛逛
            </Link>
          </div>
          <div className="col-md-2 mt-3 mt-md-0">
            <Link to="/cartForm" state={{ cartItems }} className="btn w-100" style={{ backgroundColor: "#73DB6A" }} >
              下一步
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "1920px",
          height: "128px",
          borderTop: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Footer 區塊（共用）</h3>
      </footer>
    </div>
  );
}

export default Carts;