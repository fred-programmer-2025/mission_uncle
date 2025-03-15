import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useCart } from "../context/CartContext";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../styles/components/UncleInfo.scss";
import "../styles/components/ArticleBannerStyle.scss";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const UNCLE_INTRO_DATA = {
  '阿哲': "擁有20年以上人生閱歷，溫柔耐心，善於與人溝通，最喜歡幫助他人解決問題。無論是陪伴長者、協助雜務，還是成為談心的對象，都會以專業和細心滿足您的需求。",
  '阿豪': "為人豪爽，專長水電、木工，能迅速解決您的居家大小維修問題。",
  'Jason': "為人精明，兼具美感，專長平面設計與網頁設計，是設計需求的不二選擇。",
  '順仔': "為人親切雞婆，熟悉各大市場，專長外送與代購，是您居家生活的好助手。",
  '寶哥': "為人開朗，擁有豐富的高階主管經驗，專長管理、問題分析，是企業諮詢的良師益友。",
  '李P': "為人聰明博學，專長心理諮商與演講，協助解開心理困惑，啟發新生活思維。"
}

export default function UncleInfoDetailPage() {
  const [product, setProduct] = useState(null);
  const [subPhotoAddress, setSubPhotoAddress] = useState(null);
  const [qty, setQty] = useState(1);
  const { id: product_id } = useParams(); //重新命名為product_id
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart(); // 取得加入購物車的方法
  
  const handlePhotoAddress = (el) => {
    setSubPhotoAddress(el.target.currentSrc);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  useEffect(() => {
    {/*取得產品列表(大叔資料) */}
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

  const addCartItem = async () => {
    setIsLoading(true);
    try {
      {/*選擇的大叔項目加入購物車內*/}
      await axios.post(`${BASE_URL}/api/${API_PATH}/cart`, {
        data: {
          product_id, 
          qty
        }
      });
      // alert('加入購物車成功');
      addToCart();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="banner d-flex align-items-center justify-content-start">
        <h2 className="text-start banner-title mb-4">大叔接招</h2>
      </div>
      <div className="container container-layout">
        <div className="uncle-photo">
          <div className='section-1'>
            <img className="image" src={subPhotoAddress} alt="主圖" />
          </div>
          <div className='section-2'>
            <div className="thumbnails">
              <img src={product?.imagesUrl[0]} alt="縮圖1" style={
              {
                border: "2px solid",
                borderColor: product?.imagesUrl[0] === subPhotoAddress ? "#73DB6A" : "transparent"
              }
              } onClick={handlePhotoAddress}/>
              <img src={product?.imagesUrl[1]} alt="縮圖2" style={
              {
                border: "2px solid",
                borderColor: product?.imagesUrl[1] === subPhotoAddress ? "#73DB6A" : "transparent"
              }
              } onClick={handlePhotoAddress}/>
              <img src={product?.imagesUrl[2]} alt="縮圖3" style={
              {
                border: "2px solid",
                borderColor: product?.imagesUrl[2] === subPhotoAddress ? "#73DB6A" : "transparent"
              }
              } onClick={handlePhotoAddress}/>
              <img src={product?.imagesUrl[3]} alt="縮圖4" style={
              {
                border: "2px solid",
                borderColor: product?.imagesUrl[3] === subPhotoAddress ? "#73DB6A" : "transparent"
              }
              } onClick={handlePhotoAddress}/>
            </div>
          </div>
          <div className='section-3'>
            <div className='section-3-content'>
              <label className='info-1' htmlFor="">大叔介紹</label>
              <p className='info-1'>{UNCLE_INTRO_DATA[product?.title.replace(/\(.*$/, "")]}</p>
            </div>
            <div className='section-3-content'>
              <label className='info-2' htmlFor="">產品規格介紹</label>
              <p className='info-2'>全部規格包含：一小時券、二小時券、三小時券、半日券、全日券、三日券，半日券的服務時長最長不超過 4 小時，全日券之服務時長不超過 8 小時，三日券的使用方式，請與大叔約定使用之日期，每個日期提供等同一日券服務，服務時長不超過 8 小時。</p>
            </div>
            <div className='section-3-content'>
              <label className='info-3' htmlFor="">服務聲明</label>
              <p className='info-3'>大叔提供合法、安全的協助服務，內容依平台規範進行，非專業需求請謹慎選擇。服務過程如因不可抗力造成問題，平台將協助處理，但不負最終責任。</p>
            </div>
          </div>
        </div>
        <div className="uncle-info uncle-mb-info">
          <div className="uncle-details">
            <div className='uncle-bg-color'>
              <div><label className='name'>{product?.title.replace(/\(.*$/, "")}</label></div>
              <div className='sub-content'>
                <label className='title'>所在地</label>
                <label className='content'>{product?.category}</label>
              </div>
              <div className='sub-content'>
                <label className='title'>使用語言</label>
                {<label key={product?.content} className='content me-2' style=
                {
                  { display:'inline-block'}
                }>
                  {product?.content.split(',').map((item) => item).join('、')}
                </label>}
              </div>
              <div className='section-swiper'>
                <Swiper
                  className="image-swiper"
                  modules={[Navigation, Pagination]}
                  pagination={{ el: ".custom-pagination", clickable: true }} // 指定外部 pagination
                  navigation
                >
                  <SwiperSlide><img src={product?.imagesUrl[0]} alt="縮圖1" /></SwiperSlide>
                  <SwiperSlide><img src={product?.imagesUrl[1]} alt="縮圖2" /></SwiperSlide>
                  <SwiperSlide><img src={product?.imagesUrl[2]} alt="縮圖3" /></SwiperSlide>
                  <SwiperSlide><img src={product?.imagesUrl[3]} alt="縮圖4" /></SwiperSlide>
                </Swiper>
              </div>
              {/* Pagination 元素放在 Swiper 之外 */}
              <div className="custom-pagination"></div>
              <div className='sub-content'>
                <label className='title'>專長</label>
                {product?.description.split(',').map((item) => {
                    return (
                      <span key={item} className="tag">{item}</span>
                    )
                })}
              </div>
            </div>
            <div className='section-mb-3'>
              <div className='section-mb-3-content'>
                <label className='info-1' htmlFor="">大叔介紹</label>
                <p className='info-1'>{UNCLE_INTRO_DATA[product?.title.replace(/\(.*$/, "")]}</p>
              </div>
              <div className='section-mb-3-content'>
                <label className='info-2' htmlFor="">產品規格介紹</label>
                <p className='info-2'>全部規格包含：一小時券、二小時券、三小時券、半日券、全日券、三日券，半日券的服務時長最長不超過 4 小時，全日券之服務時長不超過 8 小時，三日券的使用方式，請與大叔約定使用之日期，每個日期提供等同一日券服務，服務時長不超過 8 小時。</p>
              </div>
            </div>
            <div className="row uncle-spec-num">
              <div className="col sub-content">
                <label className='title'>規格<span style={{color: 'red'}}>*</span></label>
                <label className='content-spec'>{product?.unit}</label>
              </div>
              <div className="col">
                <label className='title'>數量</label>
                <div className="quantity-container mt-1">
                  <button className="quantity-button-l" onClick={() => setQty(qty-1)} disabled={qty === 1}>-</button>
                  <input type="text" className="quantity-input" value={qty} readOnly/>
                  <button className="quantity-button-r" onClick={() => setQty(qty+1)}>+</button>
                </div>
              </div>
            </div>
            <div className='uncle-price'>
              <div className='sub-content'>
                <label className='title'>價格</label>
                <label className='content-price'>{`NT ${product?.price.toLocaleString({ style: 'currency', currency: 'TWD' })}`}</label>
              </div>
            </div>
            <div className='uncle-button'>
              <button className='cart-button' onClick={addCartItem}>
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
            <div className='section-mb-3'>
              <div className='section-mb-3-content'>
                <label className='info-3' htmlFor="">服務聲明</label>
                <p className='info-3'>大叔提供合法、安全的協助服務，內容依平台規範進行，非專業需求請謹慎選擇。服務過程如因不可抗力造成問題，平台將協助處理，但不負最終責任。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}