import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import Cookies from 'js-cookie';
import axios from "axios";
import "../styles/components/Cart.scss";
import { useCart } from "../context/CartContext";
import BackgroundTree from "../components/BackgroundTree";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartFormPage() {
  const [cart, setCart] = useState({});
  const [cookieData, setCookieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const navigate = useNavigate();
  const { setCartCount } = useCart();
  
  // 正確設置useForm，確保引入handleSubmit
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // 取得購物車資料
  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const tickList = Cookies.get("tickList");
      if (tickList) {
        const tickListAry = JSON.parse(Cookies.get("tickList")).map((item) => JSON.parse(item));
        setCookieData(tickListAry);
      }
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      setCart(res.data.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('取得購物車列表失敗');
    } finally {
      setIsScreenLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  // 定義onSubmit函數，由handleSubmit包裝
  const onSubmit = (data) => {
    const { message, ...user } = data;
    user.address = user.address || "預設地址";
    const userInfo = { data: { user, message } };
    checkout(userInfo);
  };

  const checkout = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/${API_PATH}/order`, data);
      Cookies.remove("tickList");
      setCartCount(0);
      reset(); // 清空表單
      navigate("/order");
    } catch (error) {
      alert("結帳失敗: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <BackgroundTree title={'訂購人資訊'}/>
    <div className="container cartForm-container mt-3 mb-5">
      {/* 訂購人資訊 */}
      <div className="order-info">
        <div className="order-content">
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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email 格式錯誤",
                  },
                })}
                type="email"
                id="email"
                name="email"
                placeholder="請輸入 Email"
                className={`form-control form-custom ${errors.email && "is-invalid"}`}
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
                className={`form-control form-custom ${errors.name && "is-invalid"}`}
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
                className={`form-control form-custom ${errors.tel && "is-invalid"}`}
              />
              {errors.tel && (
                <p className="text-danger my-2">{errors.tel.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="payment">
                  請選擇付款方式<span className="text-danger">*</span>
              </label>
              
              <select
                {...register("payment", { required: "請選擇付款方式" })}
                id="payment"
                className={`form-select form-custom ${errors.payment && "is-invalid"}`}
                name="payment"
                defaultValue="" // 確保初始值是空的
              >
                <option value="" disabled>請選擇付款方式</option>
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
                className="form-control form-custom"
              ></textarea>
            </div>

            {/* 按鈕 */}
            <div className="final-button">
              <button className="shipping-button cartForm-shipping-button" onClick={() => navigate(-1)}>上一步</button>
              <button type="submit" className="order-button cartForm-order-button">
                確認結帳                
                {isLoading && <ClipLoader 
                  color={'#000000'}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  />
                }</button>
            </div>
          </form>
        </div>
      </div>

      {/* 訂單明細 */}
      <div className="cart-info">
        <div className="cart-content">
          <div><label style={{fontSize: '20px'}}>訂單明細</label></div>
          {cart.carts?.length &&
            (cart.carts.map((cartItem, index) => {
              return (
                <div key={cartItem.id} className="cart-list mt-2">
                  <div className="cart-image"><img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={cartItem.product.imageUrl} alt={cartItem.product.title} /></div>
                  <div className="cart-text-all">
                    <div className="cart-text">
                      <div className="cart-text-sub">
                        <label className="cart-text-name">{cartItem.product.title}</label>
                        <label className="cart-text-ticket">{cookieData?.[index]?.ticket}</label>
                      </div>
                      <label className="cart-text-qty">{`X${cookieData?.[index]?.qty}`}</label>
                    </div>
                    <label className="cart-price">{`NT.${cartItem.total}`}</label>
                  </div>
                </div>
              )
            }))
          }
        </div>
        <div className="mt-3">
          <button className="shipping-button-2" style={{width: '100%'}} onClick={() => navigate('/mission')}>繼續逛逛</button>
        </div>
        <div className="cart-total">
          <div className="cart-text-all mt-3">
            <label className="cart-text-name">小計</label>
            <label className="cart-text-price">{`NT.${cart.total}`}</label>
          </div>
          <div className="cart-text-all mt-3">
            <label className="cart-text-name">平台費</label>
            <label className="cart-text-price">NT. 200</label>
          </div>
        </div>
        <div className="cart-text-all mt-3">
          <label className="cart-text-name">總金額</label>
          <label className="cart-text-ticket">{`NT.${Number(cart.total)+200}`}</label>
        </div>
      </div>
    </div>
    {isScreenLoading && (<div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255,255,255,0.3)",
        zIndex: 999
      }}
    >
    <ClipLoader 
      color={'#000000'}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    </div>)}
  </>
  );
}
