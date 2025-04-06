import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../styles/components/Cart.scss";
import "../styles/components/ArticleBannerStyle.scss";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartFormPage() {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const navigate = useNavigate();
  const { setCartCount } = useCart();
  const [color, setColor] = useState("#9B9B9B"); // 設定預設文字顏色
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    name: "",
    tel: "",
    payment: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  // 使用 useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onSubmit",
  });

  // 取得購物車資料
  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      setCart(res.data.data);
    } catch (error) {
      alert("取得購物車列表失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // 驗證所有欄位
  const validateAllFields = () => {
    const emailValue = getValues("email");
    const nameValue = getValues("name");
    const telValue = getValues("tel");
    const paymentValue = getValues("payment");

    let hasError = false;

    // 檢查 email
    if (!emailValue) {
      setFieldErrors((prev) => ({ ...prev, email: "Email 欄位必填" }));
      hasError = true;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
      setFieldErrors((prev) => ({ ...prev, email: "Email 格式錯誤" }));
      hasError = true;
    } else {
      setFieldErrors((prev) => ({ ...prev, email: "" }));
    }

    // 檢查姓名
    if (!nameValue) {
      setFieldErrors((prev) => ({ ...prev, name: "姓名欄位必填" }));
      hasError = true;
    } else {
      setFieldErrors((prev) => ({ ...prev, name: "" }));
    }

    // 檢查電話
    if (!telValue) {
      setFieldErrors((prev) => ({ ...prev, tel: "電話欄位必填" }));
      hasError = true;
    } else if (!/^\d{8,10}$/.test(telValue)) {
      setFieldErrors((prev) => ({ ...prev, tel: "電話格式錯誤" }));
      hasError = true;
    } else {
      setFieldErrors((prev) => ({ ...prev, tel: "" }));
    }

    // 檢查付款方式
    if (!paymentValue) {
      setFieldErrors((prev) => ({ ...prev, payment: "請選擇付款方式" }));
      hasError = true;
    } else {
      setFieldErrors((prev) => ({ ...prev, payment: "" }));
    }

    // 如果有錯誤，聚焦到第一個錯誤欄位
    if (hasError) {
      const firstError = ["email", "name", "tel", "payment"].find((key) => fieldErrors[key]);
      if (firstError) {
        document.getElementById(firstError)?.focus();
      }
    }

    return hasError;
  };

  // 定義 onSubmit 函數
  const onSubmit = (data) => {
    // 檢查購物車是否有商品
    if (!cart?.carts?.length) {
      alert("購物車無大叔資料");
      // 設置計時器，3 秒後跳轉到產品頁面
      setTimeout(() => {
        navigate("/mission"); 
      }, 3000);
      return;
    }

    // 驗證所有欄位
    const hasError = validateAllFields();

    // 如果有錯誤，停止提交
    if (hasError) {
      return;
    }

    // 驗證通過，繼續處理
    const { message, ...user } = data;
    user.address = user.address || "預設地址";
    const userInfo = { data: { user, message } };
    checkout(userInfo);
  };

  const checkout = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/${API_PATH}/order`, data);
      setCartCount(0);
      reset(); // 清空表單
      setTimeout(() => {
        navigate("/order");
      }, 1000);
    } catch (error) {
      alert("結帳失敗: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue !== "") {
      setColor("black");
    }
  };

  // 處理輸入變更，立即清除錯誤訊息
  const handleInputChange = (field, e) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setValue(field, e.target.value, { shouldValidate: false });
  };

  return (
    <>
      <div className="banner d-flex align-items-center justify-content-start">
        <h2 className="text-start banner-title mb-4">訂購人資訊</h2>
      </div>
      <div className="container container-layout cartForm-container mt-3 mb-5">
        {/* 訂購人資訊 */}
        <div className="order-info">
          <div className="order-content">
            {/* 訂購表單 */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="email" className="mb-2" style={{ fontSize: "16px", fontWeight: "500" }}>
                  電子郵件<span className="text-danger">*</span>
                </label>
                <input
                  {...register("email")}
                  type="text" // 改為 text，避免瀏覽器驗證
                  id="email"
                  name="email"
                  placeholder="請輸入 Email"
                  className={`form-control form-custom ${fieldErrors.email ? "is-invalid" : ""}`}
                  onChange={(e) => handleInputChange("email", e)}
                />
                {fieldErrors.email && <p className="text-danger my-2">{fieldErrors.email}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="mb-2" style={{ fontSize: "16px", fontWeight: "500" }}>
                  訂購人姓名<span className="text-danger">*</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="請輸入訂購人姓名"
                  className={`form-control form-custom ${fieldErrors.name ? "is-invalid" : ""}`}
                  onChange={(e) => handleInputChange("name", e)}
                />
                {fieldErrors.name && <p className="text-danger my-2">{fieldErrors.name}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="tel" className="mb-2" style={{ fontSize: "16px", fontWeight: "500" }}>
                  訂購人電話<span className="text-danger">*</span>
                </label>
                <input
                  {...register("tel")}
                  type="text"
                  id="tel"
                  name="tel"
                  placeholder="請輸入訂購人電話"
                  className={`form-control form-custom ${fieldErrors.tel ? "is-invalid" : ""}`}
                  onChange={(e) => handleInputChange("tel", e)}
                />
                {fieldErrors.tel && <p className="text-danger my-2">{fieldErrors.tel}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="payment" style={{ fontSize: "16px", fontWeight: "500" }}>
                  請選擇付款方式<span className="text-danger">*</span>
                </label>
                <select
                  {...register("payment")}
                  id="payment"
                  className={`form-select form-custom ${fieldErrors.payment ? "is-invalid" : ""}`}
                  name="payment"
                  defaultValue=""
                  style={{ color }}
                  onChange={(e) => {
                    handleInputChange("payment", e);
                    handleChange(e);
                  }}
                >
                  <option value="" disabled>
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
                {fieldErrors.payment && <p className="text-danger">{fieldErrors.payment}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="message" style={{ fontSize: "16px", fontWeight: "500" }}>
                  其他需求
                </label>
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
                <button
                  type="button"
                  className="shipping-button cartForm-shipping-button"
                  onClick={() => navigate(-1)}
                >
                  上一步
                </button>
                <button
                  type="submit"
                  className="order-button cartForm-order-button"
                  disabled={isLoading}
                >
                  確認結帳
                  {isLoading && (
                    <ClipLoader
                      color={"#000000"}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* 訂單明細 */}
        <div className="cart-info">
          <div className="cart-content">
            <div>
              <label style={{ fontSize: "20px", fontWeight: "700" }}>訂單明細</label>
            </div>
            {cart?.carts?.length > 0 ? (
              cart.carts.map((cartItem) => (
                <div key={cartItem.id} className="cart-list mt-2">
                  <div className="cart-image">
                    <img
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      src={cartItem.product.imageUrl}
                      alt={cartItem.product.title}
                    />
                  </div>
                  <div className="cart-text-all">
                    <div className="cart-text">
                      <div className="cart-text-sub">
                        <label className="cart-text-name">
                          {cartItem.product.title.replace(/\(.*$/, "")}
                        </label>
                        <label className="cart-text-ticket">{cartItem.product.unit}</label>
                      </div>
                      <label className="cart-text-qty">{`X${cartItem.qty}`}</label>
                    </div>
                    <label className="cart-text-price">{`NT ${cartItem.total.toLocaleString({
                      style: "currency",
                      currency: "TWD",
                    })}`}</label>
                  </div>
                </div>
              ))
            ) : (
              <p>購物車無大叔資料</p>
            )}
          </div>
          <div className="mt-3">
            <button
              className="shipping-button-2"
              style={{ width: "100%" }}
              onClick={() => navigate("/mission")}
            >
              繼續逛逛
            </button>
          </div>
          <div className="cart-total">
            <div className="cart-text-all mt-3">
              <label className="cart-text-name">小計</label>
              <label className="cart-text-price">{`NT ${cart?.total?.toLocaleString({
                style: "currency",
                currency: "TWD",
              })}`}</label>
            </div>
            <div className="cart-text-all mt-3">
              <label className="cart-text-name">平台費</label>
              <label className="cart-text-price">NT 200</label>
            </div>
          </div>
          <div className="cart-text-all mt-3">
            <label className="cart-text-name">總金額</label>
            <label className="cart-text-ticket">{`NT ${(Number(cart?.total || 0) + 200).toLocaleString({
              style: "currency",
              currency: "TWD",
            })}`}</label>
          </div>
        </div>
      </div>
      {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ClipLoader
            color={"#000000"}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
}