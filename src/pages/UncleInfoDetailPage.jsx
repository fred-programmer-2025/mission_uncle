import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../uncleinfo.css';

const photoAddressData = 
  [
    "https://plus.unsplash.com/premium_photo-1664541337092-81ad747fc1f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  ];

const tickets = ['一小時券', '二小時券', '三小時券', '半日券', '全日券', '三日券'];
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function UncleInfoDetailPage() {
  const [product, setProduct] = useState({});
  const [ticket, setTicket] = useState('');
  const [subPhotoAddress, setSubPhotoAddress] = useState(null);
  const { id: product_id } = useParams(); //重新命名為product_id
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePhotoAddress = (el) => {
    setSubPhotoAddress(el.target.currentSrc);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/product/${product_id}`);
        setProduct(res.data.product);
        setSubPhotoAddress(res.data.product.imageUrl);
      } catch (error) {
        alert(error);
      }
    };
    getProducts();
  }, [product_id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  const addCartItem = async (ticket) => {
    // '一小時券', '二小時券', '三小時券', '半日券', '全日券', '三日券'
    let newQty;
    if (ticket === tickets[0]) {
      newQty = Number(qty) * 1;
    } else if (ticket === tickets[1]) {
      newQty = Number(qty) * 2;
    } else if (ticket === tickets[2]) {
      newQty = Number(qty) * 3;
    } else if (ticket === tickets[3]) {
      newQty = Number(qty) * 4;
    } else if (ticket === tickets[4]) {
      newQty = Number(qty) * 8;
    } else if (ticket === tickets[5]) {
      newQty = Number(qty) * 24;
    }

    const cookie = JSON.stringify(
      {
        product_id,
        qty,
        ticket
      })
    
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/${API_PATH}/cart`, {
        data: {
          product_id, 
          qty: newQty
        }
      });
      alert('加入購物車成功');
      let cookieData = null;
      if (Cookies.get("tickList")) {
        cookieData = JSON.parse(Cookies.get("tickList"));
      } else {
        cookieData = [];
      }
      cookieData.push(cookie)
      const jsonCookieData = JSON.stringify(cookieData);
      Cookies.set("tickList", jsonCookieData, { expires: 1 });
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="uncle-photo">
            <div className='section-1'>
              <img className="image" src={subPhotoAddress} alt="產品圖片" />
            </div>
            <div className='section-2'>
              <div className="thumbnails">
                <img src={product.imageUrl} alt="縮圖1" style={
                {
                  border: "2px solid",
                  borderColor: product.imageUrl === subPhotoAddress ? "#73DB6A" : "transparent"
                }
                } onClick={handlePhotoAddress}/>
                <img src={photoAddressData[1]} alt="縮圖2" style={
                {
                  border: "2px solid",
                  borderColor: photoAddressData[1] === subPhotoAddress ? "#73DB6A" : "transparent"
                }
                } onClick={handlePhotoAddress}/>
                <img src={photoAddressData[2]} alt="縮圖3" style={
                {
                  border: "2px solid",
                  borderColor: photoAddressData[2] === subPhotoAddress ? "#73DB6A" : "transparent"
                }
                } onClick={handlePhotoAddress}/>
                <img src={photoAddressData[3]} alt="縮圖4" style={
                {
                  border: "2px solid",
                  borderColor: photoAddressData[3] === subPhotoAddress ? "#73DB6A" : "transparent"
                }
                } onClick={handlePhotoAddress}/>
              </div>
            </div>
            <div className='section-3'>
              <div className='sub-content'>
                <label className='info' htmlFor="">大叔介紹</label>
                <p className='info'>擁有 20 年以上人生閱歷，溫柔耐心，善於與人溝通，最喜歡幫助他人繁决問題。無論是陪伴長者、協助機務，還是成為成為談心的對象，都會以專業和細心滿足您的需求。</p>
              </div>
              <div className='sub-content'>
                <label className='spec-info' htmlFor="">產品規格介紹</label>
                <p className='info'>全部規格包含：一小時券、二小時券、三小時券、半日券、全日券、三日券，半日券的服務時長最長不超過 4 小時，全日券之服務時長不超過 8 小時，三日券的使用方式，請與大叔約定使用之日期，每個日期提供等同一日券服務，服務時長不超過 8 小時。</p>
              </div>
              <div className='sub-content'>
                <label className='info' htmlFor="">服務聲明</label>
                <p className='service-info'>大叔提供合法、安全的協助服務,內容依平台規範進行，非專業需求請謹慎選擇。服務過程如因不可抗力造成問題，平台將協助處理，但不負最終責任。</p>
              </div>
            </div>
        </div>
        <div className="uncle-info">
          <div className="uncle-details">
            <div><label className='name'>{product.title}</label></div>
            <div className='sub-title-content'>
              <label className='title'>所在地</label>
              <label className='content'>{product.category}</label>
            </div>
            <div className='sub-title-content'>
              <label className='title'>使用語言</label>
              {<label key={product.content} className='content me-2' style=
              {
                { display:'inline-block'}
              }>
                {product.content?.split(',').map((item) => item).join('、')}
              </label>}
            </div>
            <div className='sub-title-content'>
              <label className='title'>專長</label>
              {product.description?.split(',').map((item) => {
                  return (
                    <span key={item} className="tag">{item}</span>
                  )
              })}
            </div>
            <div className="row">
              <div className="col-6">
                <label className='title'>規格<span style={{color: 'red'}}>*</span></label>
                <select className='mt-1' value={ticket} onChange={(el) => setTicket(el.target.value)}>
                  <option value="" disabled>請選擇</option>
                  {tickets.map((item) => {
                    return (<option key={item} value={item}>{item}</option>)
                  })}
                </select>
              </div>
              <div className="col-6">
                <label className='title'>數量</label>
                <div className="quantity-container mt-1">
                  <button className="quantity-button-l" onClick={() => setQty(qty-1)} disabled={qty === 1}>-</button>
                  <input type="text" className="quantity-input" value={qty} readOnly/>
                  <button className="quantity-button-r" onClick={() => setQty(qty+1)}>+</button>
                </div>
              </div>
            </div>
            <div className='uncle-price'>
              <div className='sub-title-content'>
                <label className='title'>價格(時)</label>
                <label className='content-price'>{`NT${product.price}`}</label>
              </div>
            </div>
            <div className='uncle-button'>
              <button className='cart-button' onClick={() => addCartItem(ticket)}>
                加入購物車
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
        </div>
        <div className="uncle-info-phone">
          <div className="uncle-details">
            <div><label className='name'>{product.title}</label></div>
            <div className="row">
              <div className="col">
                <div className='sub-title-content'>
                  <label className='title'>所在地</label>
                  <label className='content'>{product.category}</label>
                </div>
              </div>
              <div className="col">
                <div className='sub-title-content'>
                  <label className='title'>使用語言</label>
                  {<label key={product.content} className='content me-2' style=
                  {
                    { display:'inline-block'}
                  }>
                    {product.content?.split(',').map((item) => item).join('、')}
                  </label>}
                </div>
              </div>
            </div>
            <div className='section-iphone'>
              <Swiper
                className="image-swiper"
                modules={[Navigation, Pagination]}
                pagination={{ el: ".custom-pagination", clickable: true }} // 指定外部 pagination
                navigation
              >
                <SwiperSlide><img src={product.imageUrl} alt="圖片1" /></SwiperSlide>
                <SwiperSlide><img src={photoAddressData[1]} alt="圖片2" /></SwiperSlide>
                <SwiperSlide><img src={photoAddressData[2]} alt="圖片3" /></SwiperSlide>
                <SwiperSlide><img src={photoAddressData[3]} alt="圖片4" /></SwiperSlide>
              </Swiper>
            </div>
            {/* Pagination 元素放在 Swiper 之外 */}
            <div className="custom-pagination"></div>
            <div className='sub-title-content'>
              <label className='title'>專長</label>
              {product.description?.split(',').map((item) => {
                  return (
                    <span key={item} className="tag">{item}</span>
                  )
              })}
            </div>
            <div className='section-3'>
              <div className='sub-content'>
                <label className='info' htmlFor="">大叔介紹</label>
                <p className='info'>擁有 20 年以上人生閱歷，溫柔耐心，善於與人溝通，最喜歡幫助他人繁决問題。無論是陪伴長者、協助機務，還是成為成為談心的對象，都會以專業和細心滿足您的需求。</p>
              </div>
              <div className='sub-content'>
                <label className='spec-info' htmlFor="">產品規格介紹</label>
                <p className='info'>全部規格包含：一小時券、二小時券、三小時券、半日券、全日券、三日券，半日券的服務時長最長不超過 4 小時，全日券之服務時長不超過 8 小時，三日券的使用方式，請與大叔約定使用之日期，每個日期提供等同一日券服務，服務時長不超過 8 小時。</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label className='title'>規格<span style={{color: 'red'}}>*</span></label>
                <select className='mt-1' value={ticket} onChange={(el) => setTicket(el.target.value)}>
                  <option value="" disabled>請選擇</option>
                  {tickets.map((item) => {
                    return (<option key={item} value={item}>{item}</option>)
                  })}
                </select>
              </div>
              <div className="col-6">
                <label className='title'>數量</label>
                <div className="quantity-container mt-1">
                  <button className="quantity-button-l" onClick={() => setQty(qty-1)} disabled={qty === 1}>-</button>
                  <input type="text" className="quantity-input" value={qty} readOnly/>
                  <button className="quantity-button-r" onClick={() => setQty(qty+1)}>+</button>
                </div>
              </div>
            </div>
            <div className='uncle-price'>
              <div className='sub-title-content'>
                <label className='title'>價格(時)</label>
                <label className='content-price'>{`NT${product.price}`}</label>
              </div>
            </div>
            <div className='uncle-button'>
              <button className='cart-button' onClick={() => addCartItem(ticket)}>
                加入購物車
                {isLoading && <ClipLoader 
                  color={'#000000'}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  />
                }
              </button>
            </div>
            <div className='section-3'>
              <div className='sub-content'>
                <label className='info' htmlFor="">服務聲明</label>
                <p className='service-info'>大叔提供合法、安全的協助服務,內容依平台規範進行，非專業需求請謹慎選擇。服務過程如因不可抗力造成問題，平台將協助處理，但不負最終責任。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}