import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "../styles/components/Cart.scss";
import BackgroundTree from "../components/BackgroundTree";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const datas = {
  orders: [],
  productIds: []
};

export default function OrderPage() {
  const [orderDatas, setOrderDatas] = useState(datas);
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);
  
  const getOrder = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/orders`);
      const orders = res.data.orders;
      const productIds = Object.keys(res.data.orders[0].products);
      setOrderDatas({
        ...datas,
        orders,
        productIds
      })
    } catch (error) {
      alert(error);
    } finally {
      setIsScreenLoading(false);
    }
  }

  const handleCheckOut = async (orderId) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/${API_PATH}/pay/${orderId}`);
      getOrder();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOrder();
  }, [])

  return (
    <>
      <div className="banner d-flex align-items-center justify-content-start">
        <h2 className="text-start banner-title mb-4">訂單明細列表</h2>
      </div>
      <div className="container container-layout">
        <BackgroundTree />
        <div className="border" style={{maxWidth: '692px', width: '100%', padding: '12px', margin: '10px 0'}}>
          {orderDatas.orders.map((order) => {
            return (
            <div key={order.id}>
              <div md={4}>
              {orderDatas.productIds.map((productId) => {
                return (
                <div key={productId} className="d-flex align-items-center my-3">
                  <div>
                    <img
                      className="me-3"
                      src={order.products[productId].product?.imageUrl}
                      alt={order.products[productId].product?.title.replace(/\(.*$/, "")}
                      style={{width: '100px', height: '100px', objectFit: 'cover'}}
                    />
                  </div>
                  <div className="cart-text-sub">
                    <label className="cart-text-name">{order.products[productId].product?.title.replace(/\(.*$/, "")}</label>
                    <label className="cart-text-ticket">{order.products[productId].product?.unit}</label>
                    <p className="cart-text-price">{`NT ${order.products[productId].product?.price.toLocaleString({ style: 'currency', currency: 'TWD' })} X ${order.products[productId]?.qty}`}</p>
                  </div>
                </div>
                )}
              )}
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
                    <label className="fw-normal">{`NT ${order?.total.toLocaleString({ style: 'currency', currency: 'TWD' })}`}</label>
                  </li>
                  <li className="d-flex justify-content-between">
                    <label className="fw-normal">付款方式</label>
                    <label className="fw-normal">{order.user?.payment || "N/A"}</label>
                  </li>
                  <li className="d-flex justify-content-between">
                    <label className="fw-normal">付款狀態</label>
                    <label
                      className={
                        order?.is_paid === true
                          ? "text-success"
                          : "text-danger fw-bold"
                      }
                    >
                      {order?.is_paid ? "已付款" : "未付款"}
                    </label>
                  </li>
                </ul>
              </div>
              <div className="d-flex justify-content-between">
                <span></span>
                <button className="order-button cart-order-button" onClick={() => handleCheckOut(order.id)}>
                  確認付款
                  {isLoading && <ClipLoader 
                    color={'#000000'}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                  }
                </button>
              </div>
            </div>
            )}
          )}
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