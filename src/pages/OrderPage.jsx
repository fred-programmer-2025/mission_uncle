import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 引入 useNavigate
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "../styles/components/Cart.scss";
import BackgroundTree from "../components/BackgroundTree";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function OrderPage() {
  const [orderDatas, setOrderDatas] = useState({ orders: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const navigate = useNavigate(); // 獲取 navigate 函數

  // 頁面載入時滾動到頂部
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  // 從後端獲取訂單並根據本地存儲更新狀態
  const getOrder = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/orders`);
      const orders = res.data.orders || [];
      // 從 localStorage 獲取已付款的訂單 ID
      const paidOrders = JSON.parse(localStorage.getItem("paidOrders")) || [];
      // 過濾掉已付款的訂單並更新狀態
      const updatedOrders = orders
        .filter((order) => !paidOrders.includes(order.id)) // 移除已付款訂單
        .map((order) => ({
          ...order,
          is_paid: paidOrders.includes(order.id), // 標記已付款狀態
        }));
      setOrderDatas({ orders: updatedOrders });
    } catch (error) {
      alert("取得訂單失敗: " + error.message);
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 處理確認付款
  const handleCheckOut = async (orderId) => {
    setIsLoading(true);
    try {
      // 模擬後端付款成功（未來可替換為真實 API）
      // await axios.post(`${BASE_URL}/api/${API_PATH}/pay/${orderId}`);

      // 步驟 1: 更新訂單狀態為「已付款」
      setOrderDatas((prev) => {
        const updatedOrders = prev.orders.map((order) =>
          order.id === orderId ? { ...order, is_paid: true } : order
        );
        return { ...prev, orders: updatedOrders };
      });

      // 步驟 2: 將已付款訂單 ID 存入 localStorage
      const paidOrders = JSON.parse(localStorage.getItem("paidOrders")) || [];
      if (!paidOrders.includes(orderId)) {
        paidOrders.push(orderId);
        localStorage.setItem("paidOrders", JSON.stringify(paidOrders));
      }

      // 步驟 3: 3 秒後移除該訂單並檢查是否需要跳轉
      setTimeout(() => {
        setOrderDatas((prev) => {
          const filteredOrders = prev.orders.filter((order) => order.id !== orderId);
          // 如果訂單列表為空，3 秒後跳轉到首頁
          if (filteredOrders.length === 0) {
            setTimeout(() => {
              navigate("/"); // 跳轉到首頁
            }, 3000); // 延遲 3 秒後跳轉
          }
          return { ...prev, orders: filteredOrders };
        });
      }, 3000); // 延遲 3 秒移除訂單

    } catch (error) {
      alert("付款失敗: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 頁面載入時獲取訂單
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <div className="banner d-flex align-items-center justify-content-start">
        <h2 className="text-start banner-title mb-4">訂單明細列表</h2>
      </div>
      <div className="container container-layout">
        <BackgroundTree />
        <div className="border" style={{ maxWidth: "692px", width: "100%", padding: "12px", margin: "10px 0" }}>
          {orderDatas.orders.length > 0 ? (
            orderDatas.orders.map((order) => {
              const productIds = order.products ? Object.keys(order.products) : [];
              return (
                <div key={order.id}>
                  <div md={4}>
                    {productIds.map((productId) => {
                      const productData = order.products[productId];
                      if (!productData || !productData.product) return null; // 防護性檢查
                      return (
                        <div key={productId} className="d-flex align-items-center my-3">
                          <div>
                            <img
                              className="me-3"
                              src={productData.product.imageUrl || "/default-image.jpg"}
                              alt={productData.product.title?.replace(/\(.*$/, "") || "無標題"}
                              style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                          </div>
                          <div className="cart-text-sub">
                            <label className="cart-text-name">
                              {productData.product.title?.replace(/\(.*$/, "") || "未知產品"}
                            </label>
                            <label className="cart-text-ticket">{productData.product.unit || "單位未知"}</label>
                            <p className="cart-text-price">
                              {`NT ${Number(productData.product.price).toLocaleString()} X ${productData.qty || 0}`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div md={4}>
                    <ul className="list-unstyled">
                      <li className="d-flex justify-content-between">
                        <label className="fw-normal">電子郵件</label>
                        <label className="fw-normal">{order.user?.email || "N/A"}</label>
                      </li>
                      <li className="d-flex justify-content-between">
                        <label className="fw-normal">收件人姓名</label>
                        <label className="fw-normal">{order.user?.name || "N/A"}</label>
                      </li>
                      <li className="d-flex justify-content-between">
                        <label className="fw-normal">收件人電話</label>
                        <label className="fw-normal">{order.user?.tel || "N/A"}</label>
                      </li>
                      <hr />
                      <li className="d-flex justify-content-between">
                        <label className="fw-normal">付款金額</label>
                        <label className="fw-normal">{`NT ${Number(order.total).toLocaleString()}`}</label>
                      </li>
                      <li className="d-flex justify-content-between">
                        <label className="fw-normal">付款方式</label>
                        <label className="fw-normal">{order.user?.payment || "N/A"}</label>
                      </li>
                      <li className="d-flex justify-content-between">
                        <label className="fw-normal">付款狀態</label>
                        <label className={order.is_paid ? "text-success" : "text-danger fw-bold"}>
                          {order.is_paid ? "已付款" : "未付款"}
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span></span>
                    <button
                      className="order-button cart-order-button"
                      onClick={() => handleCheckOut(order.id)}
                      disabled={order.is_paid} // 已付款的訂單禁用按鈕
                    >
                      {order.is_paid ? "已付款" : "確認付款"}
                      {isLoading && !order.is_paid && (
                        <ClipLoader
                          color={"#000000"}
                          size={15}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center">目前沒有訂單，即將回首頁</p>
          )}
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
          <ClipLoader color={"#000000"} size={30} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      )}
    </>
  );
}