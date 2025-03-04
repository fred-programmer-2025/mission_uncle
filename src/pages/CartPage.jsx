import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import Cookies from 'js-cookie';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const [cart, setCart] = useState({});
  const [cookieData, setCookieData] = useState(null);
  const navigate = useNavigate();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [hasNoCart, setHasNoCart] = useState(false);

  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const tickList = Cookies.get("tickList");
      if (tickList) {
        const tickListAry = JSON.parse(Cookies.get("tickList")).map((item) => JSON.parse(item));
        setCookieData(tickListAry);
      }
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      if (res.data.data.carts.length === 0) {
        setHasNoCart(true);
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  const removeCartItem = async (cartItem_id, cartItem_product_id) => {
    setIsScreenLoading(true);
    try {
      const tickList = Cookies.get("tickList");
      if (tickList) {
        await axios.delete(`${BASE_URL}/api/${API_PATH}/cart/${cartItem_id}`);
        const tickListAry = JSON.parse(Cookies.get("tickList")).map((item) => JSON.parse(item));
        const newTickListAry = tickListAry.filter((item) => {
          return (item.product_id !== cartItem_product_id)
        });

        if (newTickListAry.length === 0) {
          Cookies.remove("tickList");
        } else {
          const jsonCookieData = JSON.stringify(newTickListAry.map((item) => JSON.stringify(item)));
          Cookies.set("tickList", jsonCookieData, { expires: 1 });
        }
        getCart();
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('刪除購物車品項失敗');
    } finally {
      setIsScreenLoading(false);
    }
  }
  
  return (
    <>
    {cart.carts?.length ? 
    (<div className="container">
      <h1>購物車</h1>
      <table className="table align-middle" style={{ tableLayout: "fixed", width: "100%" }}>
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
              <td><img className='cart-image' src={cartItem.product.imageUrl} alt={cartItem.product.title} /></td>
              <td>{cartItem.product.title}</td>
              <td>{cookieData?.[index]?.ticket}</td>
              <td>{`X${cookieData?.[index]?.qty}`}</td>
              <td>{`NT.${cartItem.total}`}</td>
              <td><button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeCartItem(cartItem.id, cartItem.product_id)}>X</button></td>
            </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6">
              <div className="d-flex justify-content-between">
                <button className="shipping-button" onClick={() => navigate('/mission')}>繼續購物</button>
                <button className="order-button" onClick={() => navigate('/cartForm')}>下一步</button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>) : hasNoCart ? <div className="container" style={{height: '55vh'}}><h1>購物車已空</h1></div> : <div className="container"><h1>購物車清單讀取中</h1></div>}
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