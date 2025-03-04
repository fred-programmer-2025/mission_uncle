import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import axios from "axios";
import '../cartform.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartFormPage() {
  const [cart, setCart] = useState({});
  const [cookieData, setCookieData] = useState(null);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const navigate = useNavigate();
  
  // 正確設置useForm，確保引入handleSubmit
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // 取得購物車資料
  const getCart = async () => {
    // setIsScreenLoading(true);
    try {
      const tickList = Cookies.get("tickList");
      if (tickList) {
        const tickListAry = JSON.parse(Cookies.get("tickList")).map((item) => JSON.parse(item));
        setCookieData(tickListAry);
      }
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      if (res.data.data.carts.length === 0) {
        // setHasNoCart(true);
      }
      setCart(res.data.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('取得購物車列表失敗');
    } finally {
      // setIsScreenLoading(false);
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
    <div className="container mt-3 mb-5">
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
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
              <label htmlFor="paymentMethod">
                  請選擇付款方式<span className="text-danger">*</span>
              </label>
              
              <select
                {...register("payment", { required: "請選擇付款方式" })}
                id="payment"
                className={`form-control form-custom ${errors.payment && "is-invalid"}`}
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
                className="form-control form-custom"
              ></textarea>
            </div>

            {/* 按鈕 */}
            <div className="d-flex justify-content-between">
              <button className="shipping-button" onClick={() => navigate(-1)}>上一步</button>
              <button className="order-button" onClick={() => navigate('/order')}>確認結帳</button>
            </div>
          </form>
        </div>
      </div>

      {/* 訂單明細 */}
      <div className="cart-info">
        <div className="cart-content">
          <div style={{fontSize: '20px'}}>訂單明細</div>
          {cart.carts?.length &&
            (cart.carts.map((cartItem, index) => {
              return (
                <div key={cartItem.id} className="cart-list mt-2">
                  <div style={{width: '120px', height: '120px'}}><img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={cartItem.product.imageUrl} alt={cartItem.product.title} /></div>
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
  );
}