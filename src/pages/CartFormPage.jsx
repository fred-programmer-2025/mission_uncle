import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const BG_IMAGE_URL = "https://s3-alpha-sig.figma.com/img/f782/7138/0a6d141679a20e4e25a4d50d601e4747?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LWuY2KR9xEqJ9tPHvfDljeta~HEaN15LHsIcZeDawNHkg-lsdzok0mkGdhoMvqKwnL5hqx1ggCXXgRZ20Mt97nuu5WrdMgqpdhT-JV6hHJsmvOva1Jj4ViE9JVjMccy2NUu-md0Ck8knvf7sYks5-Z4olhG0H1aLSsH-skScF9TxY~JoJuJU~Wh9Sbitz7o1B7GP5c-tOgikzZ9Zg~IzvKyO6C6xgZeoU4LOCPOnBbbnrP-tTcomucLnyr~QMo1Le2Nr1vV3jhga0ymKoOYpKp5vuuBSGH3NwvaTb5-nx5DBK9hBbZMQrjEb72yVfKcQiKXebXZT9U7L892JuiBFwg__";

function CartFormPage() {
  const [cart, setCart] = useState({});
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const navigate = useNavigate();
  
  // 正確設置useForm，確保引入handleSubmit
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // 取得購物車資料
  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCart(res.data.data);
    } catch (error) {
      alert("取得購物車列表失敗");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const removeCartItem = async (cartItem_id) => {
    try {
      setIsScreenLoading(true);
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`);
      getCart();
    } catch (error) {
      alert("刪除購物車品項失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  const updateCartItem = async (cartItem_id, product_id, qty) => {
    try {
      setIsScreenLoading(true);
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`, {
        data: { product_id, qty: Number(qty) },
      });
      getCart();
    } catch (error) {
      alert("更新購物車品項失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 定義onSubmit函數，由handleSubmit包裝
  const onSubmit = (data) => {
    console.log("表單資料:", data);
    const { message, ...user } = data;
    user.address = user.address || "預設地址";
    const userInfo = { data: { user, message } };
    checkout(userInfo);
  };

  const checkout = async (data) => {
    try {
      console.log("準備結帳，資料:", data);
      const response = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, data);
      console.log("結帳成功:", response.data);
      reset(); // 清空表單
      navigate("/order", {
        state: {
          cartItems: cart.carts, // 購物車商品
          formData: { ...data.data.user, paymentStatus: "已付款" }, // 添加付款狀態
        },
      });
    } catch (error) {
      console.error("結帳失敗:", error);
      alert("結帳失敗: " + (error.response?.data?.message || error.message));
    }
  };

  const handleContinueShopping = async () => {
    try {
      await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
      window.location.href = "/uncleinfo";
    } catch (error) {
      alert("取得產品列表失敗");
    }
  };

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
      <div className="container-fluid bg-cover bg-img-height-s px-md-0"
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
              <div className="d-flex flex-column align-items-start " >
                <h1 className="text-light fw-bold fs-1"><br></br><br></br>訂購人資訊</h1>
              </div>
            </div>
            
            {/* 小螢幕顯示 */}
            <div className="col-md-5 d-md-none">
              <div className="d-flex justify-content-center align-items-center text-shadow">
                <h1 className="text-light fw-bold fs-1">訂購人資訊</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light my-5">
        <div className="container">
          <div className="row justify-content-center flex-md-row flex-column-reverse">
            {/* 訂購人資訊 */}
            <div className="col-md-7">
              <div className="bg-light p-4">
                {/* 訂購表單 - 使用handleSubmit包裝onSubmit函數 */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="mb-2">
                        電子郵件<span className="text-danger">*</span>
                    </label>
                    <input
                      {...register("email", {
                        required: "Email 欄位必填",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Email 格式錯誤",
                        },
                      })}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="請輸入 Email"
                      className={`form-control ${errors.email && "is-invalid"}`}
                    />
                    {errors.email && (
                      <p className="text-danger my-2">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="name" className="mb-2">
                        訂購人姓名<span className="text-danger">*</span>
                    </label>
                    <input
                      {...register("name", { required: "姓名欄位必填" })}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="請輸入訂購人姓名"
                      className={`form-control ${errors.name && "is-invalid"}`}
                    />
                    {errors.name && (
                      <p className="text-danger my-2">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tel" className="mb-2">
                        訂購人電話<span className="text-danger">*</span>
                    </label>
                    <input
                      {...register("tel", {
                        required: "電話欄位必填",
                        pattern: {
                          value: /^\d{8,10}$/,
                          message: "電話格式錯誤",
                        },
                      })}
                      type="text"
                      id="tel"
                      name="tel"
                      placeholder="請輸入訂購人電話"
                      className={`form-control ${errors.tel && "is-invalid"}`}
                    />
                    {errors.tel && (
                      <p className="text-danger my-2">{errors.tel.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="paymentMethod">
                        請選擇付款方式<span className="text-danger">*</span>
                    </label>
                    
                    <select
                      {...register("payment", { required: "請選擇付款方式" })}
                      id="payment"
                      className={`form-control ${errors.payment && "is-invalid"}`}
                    >
                      <option value="" >
                        請選擇付款方式
                      </option>
                      <option value="WebATM">WebATM</option>
                      <option value="ATM">ATM</option>
                      <option value="CVS">CVS</option>
                      <option value="Barcode">Barcode</option>
                      <option value="Credit">Credit</option>
                      <option value="ApplePay">ApplePay</option>
                      <option value="GooglePay">GooglePay</option>
                    </select>
                    {errors.payment && <p className="text-danger">{errors.payment.message}</p>}
                    
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message">其他需求</label>
                    <textarea
                      {...register("message")}
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="若有其他需求，請留言告訴我們"
                      className="form-control"
                    ></textarea>
                  </div>

                  {/* 按鈕 */}
                  <div className="row d-flex justify-content-between mt-5">
                    {/* 上一步按鈕 */}
                    <div className="col-md-4">
                      <Link to="/cart" className="btn btn-outline-dark w-100">
                        上一步
                      </Link>
                    </div>
    
                    {/* 確認結帳按鈕 */}
                    <div className="col-md-4 mt-3 mt-md-0">
                      <button 
                        type="submit" 
                        className={`btn w-100 ${cart.carts?.length ? '' : 'disabled'}`} 
                        style={{ backgroundColor: "#73DB6A" }}
                        disabled={!cart.carts?.length}
                      >
                        確認結帳
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* 訂單明細 */}
            <div className="col-md-5">
              <div className="border p-4">
                <h4 className="fw-bold mb-3 d-flex justify-content-center justify-content-md-start">
                  訂單明細
                </h4>
                <hr />

                {/* 商品資訊 */}
                {cart.carts && cart.carts.length > 0 ? (
                  cart.carts.map((cartItem) => (
                    <div className="d-flex mb-3" key={cartItem.id}>
                      <img
                        src={cartItem.product.imageUrl}
                        alt={cartItem.product.title}
                        className="me-2"
                        style={{ width: "120px", height: "120px" }}
                      />
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <h6 className="mb-0 fw-bold">{cartItem.product.title}</h6>
                          <h6 className="mb-0 fw-bold">X {cartItem.qty}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                          <small className="mb-0 text-muted">${cartItem.product.price}</small>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">購物車內沒有商品</p>
                )}
                <hr />

                <div className="mb-3">
                  <button onClick={handleContinueShopping} className="btn btn-outline-dark w-100">
                    繼續逛逛
                  </button>
                </div>

                <ul className="ps-0 mb-0">
                  <li className="d-flex justify-content-between">
                    <p className="mb-0">小計</p>
                    <p className="mb-0">NT.{cart.total}</p>
                  </li>
                  <li className="d-flex justify-content-between">
                    <p className="mb-0">平台費</p>
                    <p className="mb-0">NT.0</p>
                  </li>
                </ul>

                <hr />

                <div className="d-flex justify-content-between">
                  <h4 className="mb-0 fw-bold">總金額</h4>
                  <h4 className="mb-0 fw-bold">NT.{cart.total}</h4>
                </div>
              </div>
            </div>
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

export default CartFormPage;