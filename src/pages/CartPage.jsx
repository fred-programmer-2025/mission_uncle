import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../styles/components/Cart.scss";
import "../styles/components/ArticleBannerStyle.scss";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const icon = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart-x" viewBox="0 0 16 16">
  <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>);

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [hasNoCart, setHasNoCart] = useState(false);
  const { removeToCart } = useCart(); // 取得移除購物車的方法

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      if (res.data.data.carts.length === 0) {
        setHasNoCart(true);
        setTimeout(() => {
          navigate('/mission');
        }, 2000);
      }
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
  }, [])

  const removeCartItem = async (cartItem_id) => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${BASE_URL}/api/${API_PATH}/cart/${cartItem_id}`);
      removeToCart();
      getCart();
    } catch (error) {
      alert('刪除購物車品項失敗');
    } finally {
      setIsScreenLoading(false);
    }
  }
  
  return (
    <>
      <div className="banner d-flex align-items-center justify-content-start">
        <h2 className="text-start banner-title mb-4">購物車清單</h2>
      </div>
      {cart?.carts?.length ? 
      (<div className="container container-layout">
        <table className="table align-middle mt-4">
          <thead>
            <tr>
              <th>大叔圖片</th>
              <th>大叔稱呼</th>
              <th>購買內容</th>
              <th>數量</th>
              <th>費用</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            {cart.carts.map((cartItem, index) => {
              return (
              <tr key={cartItem.id}>
                <td><img className='cart-list-image' src={cartItem.product.imageUrl} alt={cartItem.product.title} /></td>
                <td>{cartItem.product.title.replace(/\(.*$/, "")}</td>
                <td>{cartItem.product.unit}</td>
                <td>{cartItem.qty}</td>
                <td>{`NT ${cartItem.total.toLocaleString({ style: 'currency', currency: 'TWD' })}`}</td>
                <td><button type="button" className="btn" onClick={() => removeCartItem(cartItem.id)}>{icon}</button></td>
              </tr>
              )
            })}
          </tbody>
        </table>
        <div className="cart-text-all mt-2 mb-3">
          <button className="shipping-button cart-shipping-button" onClick={() => navigate('/mission')}>繼續購物</button>
          <button className="order-button cart-order-button" onClick={() => navigate('/cartForm')}>下一步</button>
        </div>
      </div>) : hasNoCart && 
      <div className="container" style={{
        height: '55vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'}}>
        <h1 style={{
          fontSize: '2rem', 
          color: '#73DB6A', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          letterSpacing: '2px', 
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)'}
        }>
          購物車已空
        </h1>
      </div>}
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
  )
}