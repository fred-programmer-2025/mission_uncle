import * as bootstrap from 'bootstrap';
import "../styles/components/HeroSection.scss";

import banner1 from "../assets/banner_1.jpg";
import banner2 from "../assets/banner_2.jpg";
import banner3 from "../assets/banner_3.jpg";
import bgImage from '../assets/background_tree.jpg';
import uncleCutout from "../assets/uncle_cutout.png";
import supportiveText from "../assets/supportive_text.svg";
import supportiveText2 from "../assets/supportive_text_2.svg";
import titleImage1 from "../assets/title_image_1.svg";
import titleImage2 from "../assets/title_image_2.svg";
import titleImage3 from "../assets/title_image_3.svg";
import titleBg from "../assets/title_bg.jpg";

const HeroSection = () => {
  // 輪播資料
  const carouselItems = [
    {
      id: 1,
      background: banner1,
      titleImage: titleImage1,
      title: "SUPPORTIVE Middle-Aged",
      description: "陪伴是最溫暖的支持",
      subText: "以真心陪伴，讓每個時光更有溫度",
      buttonText: "尋找大叔"
    },
    {
      id: 2,
      background: banner2,
      titleImage: titleImage2,
      title: "SUPPORTIVE Middle-Aged",
      description: "陪伴是最溫暖的支持",
      subText: "協助購物需求,讓生活更輕鬆",
      buttonText: "尋找大叔"
    },
    {
      id: 3,
      background: banner3,
      titleImage: titleImage3,
      title: "SUPPORTIVE Middle-Aged",
      description: "陪伴是最溫暧的支持",
      subText: "用真誠傾聽,打造一段暖心對話",
      buttonText: "尋找大叔"
    }
  ];


  return (
    <div className="hero-section position-relative custom-hero pb-md-5">
      <div className="row">
          {/* 左側背景 - 高度與整體區域相同 */}
          <div className="col-md-4 position-absolute h-100 d-md-block d-none" style={{ 
            left: 0,
            top: 0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0 
          }}></div>
          {/* 手機版上方背景 - 只在手機版顯示 */}
          <div className="position-absolute w-100 d-md-none d-block" style={{ 
            height: '50%',
            top: 0,
            right: 0,
            left:0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}></div>

        <div className="col-md-8">
          {/* 右側灰色背景 - 添加這個元素 */}
          <div className="position-absolute h-100 d-md-block d-none" style={{ 
          width: '66.667%',
          right: 0,
          top: 0,
          backgroundColor: 'rgba(224, 224, 224, 1)', // 灰色背景
          zIndex: 0 
        }}></div>
        {/* 手機版下方灰色背景 - 只在手機版顯示 */}
        <div className="position-absolute w-100 d-md-none d-block" style={{ 
          height: '50%',
          bottom: 0,
          backgroundColor: '#f0f0f0',
          zIndex: 0
        }}></div>
        </div>
      </div>
  
      {/* 右上方空心文字 */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-12">
            {/* 左側空白區域，已有背景 */}
          </div>
          <div className="col-md-8 col-12 px-md-5 px-3 d-none d-md-block" style={{ paddingLeft: '40px', paddingRight: '40px', zIndex: 2 }}>
            <div className="py-md-3">
              <img 
                src={supportiveText}
                alt="SUPPORTIVE Middle-Aged"
                className="img-fluid w-100 d-none d-xxl-block"
              />
              <img 
                src={supportiveText2}
                alt="SUPPORTIVE Middle-Aged"
                className="img-fluid w-100 d-none d-md-block d-xxl-none"
              />
            </div>
          </div>
        </div>
      </div>
  
  {/* 輪播區域 */}
  <div id="heroCarousel" className="carousel slide" style={{ 
    zIndex: 1,
    marginTop: '12px',
  }}>
    <div className="carousel-inner" style={{ overflow: 'visible' }}>
      {carouselItems.map((item, idx) => (
        <div key={item.id} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 col-12 mobile-order-2" style={{ paddingLeft: '0' }}>
                {/* 左側空白，已有背景 */}
              </div>
              
              {/* 右側區域 */}
              <div className="col-md-8 col-12 px-md-5 px-3 mobile-order-1 position-relative" style={{ 
                paddingLeft: '40px',
                paddingRight: '40px',
                paddingBottom: '24px',
                height: 'auto'
              }}>
                {/* 黃色卡片 */}
                <div className="position-absolute d-none d-md-block yellow-card-position" style={{
                  left: '-25%', // 具體調整位置
                  top: '50%',
                  transform: 'translateY(-50%)', // 垂直居中
                  width: '40%', // 改為百分比寬度，實現等比例縮小
                  maxWidth: '526px',
                  zIndex: 2
                  }}>
                  <div className="position-relative"
                  style={{
                    paddingTop: 'min(40%, 35vw)'
                    }}>
                    {/* 大叔圖片 */}
                    <div className="position-absolute uncle-img-position" style={{ 
                        top: '4px',
                        left: '30%',
                        transform: 'translateX(-30%)',
                        zIndex: -2,
                      }}>
                        <img 
                          src={uncleCutout} 
                          alt="尋找大叔" 
                          className="img-fluid"
                          style={{ 
                            width: 'min(90%, 224px)',
                            maxWidth: '224px'
                          }}
                        />
                    </div>
                    {/* 尋找大叔文字框 */}
                    <div className="position-absolute uncle-text-position" style={{ 
                      top: '23%',
                      left: '4%',
                      zIndex: 3,
                      width: 'auto', // 設定寬度百分比
                      maxWidth: '52px'
                    }}>
                      <div className="px-1 py-2 border border-dark" style={{ backgroundColor: 'rgba(165, 238, 157, 1)', boxShadow: '2px 3px 4px rgba(0, 0, 0, 0.25)' }}>
                      <div className="fw-bold text-center" style={{ fontSize: 'clamp(12px, 1.2vw , 28px)', writingMode: 'vertical-Lr' }}>
                        尋找大叔
                      </div>
                    </div>
                    </div>
                    {/* 黃色卡片內容 */}
                    <div className="position-relative">
                      <img 
                        src={titleBg} 
                        alt="背景" 
                        className="img-fluid w-100"
                      />
                    <div className="position-absolute top-0 left-0 w-100 h-100 p-2 p-md-3 d-flex flex-column justify-content-center">
                      <img 
                        src={item.titleImage} 
                        alt="陪伴是最溫暖的支持" 
                        className="img-fluid"
                        style={{ width:'80%', maxWidth: '470px' }}
                      />
                      <p className="mb-md-4 fw-bold"
                      style={{ 
                        fontSize: 'clamp(10px, 1.5vw , 20px)',
                        lineHeight: '1.4'
                      }}>{item.subText}</p>
                      <button className="btn btn-sm w-100 rounded-0 border border-dark text-dark fw-bold p-2" 
                      style={{ 
                        backgroundColor: 'rgba(115, 219, 106, 1)',
                        color: 'white',
                        fontSize: 'clamp(10px, 1.5vw , 20px)'
                        }}>
                        {item.buttonText} &gt;
                      </button>
                    </div>
                  </div>
                  </div>
                </div>
                {/* 右側照片 */}
                <div className="position-relative d-none d-md-block">
                  <img 
                    src={item.background}
                    alt={item.description}
                    className="img-fluid w-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* 手機版顯示 - 獨立區塊 */}
                <div className="d-md-none d-block py-5">
                  {/* 手機版照片和黃色卡片上下排列 */}
                  <div className="d-flex flex-column align-items-center pt-5 yellow-card-position" style={{ 
                    width: '90%',
                    maxWidth: '100%',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 3
                  }}>
                    {/* 黃色卡片部分 */}
                    <div className="position-relative w-100 pt-5">
                      {/* 大叔圖片 */}
                      <div className="position-absolute uncle-img-position-mobile" style={{ 
                        top: '-22%',
                        left: '11%',
                        zIndex: -2,
                        width: '40%'
                      }}>
                        <img 
                          src={uncleCutout} 
                          alt="尋找大叔" 
                          className="img-fluid"
                        />
                      </div>
                      
                      {/* 尋找大叔文字框 */}
                      <div className="position-absolute uncle-text-position-mobile" style={{ 
                        zIndex: 3,
                        width: 'clamp(20px, 10vw, 40px)', // 寬度隨視窗縮放
                        height: 'auto',                   // 高度自動調整
                        transform: 'scale(clamp(0.8, 0.8 + 0.2 * (100vw - 375px) / (768 - 375), 1))', // 整體縮放比例
                        transformOrigin: 'top left'       // 縮放基準點
                      }}>
                        <div className='border border-dark' style={{ 
                          backgroundColor: 'rgba(165, 238, 157, 1)', 
                          color: '#000',
                          padding: 'clamp(5px, 1vw, 10px)',  // 內邊距也隨視窗縮放
                          writingMode: 'vertical-rl',
                          textOrientation: 'upright',
                          letterSpacing: '0.25rem',
                        }}>
                          <div className="fw-bolder text-center w-100" style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}>
                            尋找大叔
                          </div>
                        </div>
                      </div>
                      
                      {/* 黃色卡片背景和內容 */}
                      <img 
                        src={titleBg} 
                        alt="背景" 
                        className="img-fluid w-100 mt-5"
                        style={{
                          height: 'clamp(230px, 45vw, 350px)'
                        }}
                      />
                      <div className="position-absolute top-0 left-0 w-100 h-100 p-3 d-flex flex-column justify-content-center">
                        <img 
                          src={item.titleImage} 
                          alt="陪伴是最溫暖的支持" 
                          className="img-fluid mb-2"
                          style={{ maxWidth: '70%' }}
                        />
                        <p className="mb-2 fw-bold mb-4" style={{ 
                          fontSize: 'clamp(14px, calc(14px + (26 - 14) * ((100vw - 375px) / (768 - 375))), 26px)',
                          lineHeight: '1.4'
                        }}>
                          {item.subText}
                        </p>
                        <button className="btn w-100 btn-sm mb-adjust rounded-0 border border-dark text-dark fw-bold p-2" style={{ backgroundColor: 'rgba(115, 219, 106, 1)', color: 'white' }}>
                          {item.buttonText}  &gt;
                        </button>
                      </div>
                    </div>
                    {/* 照片部分 */}
                    <div className="w-100">
                      <img 
                        src={item.background}
                        alt={item.description}
                        className="img-fluid w-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* 電腦版面 */}
    {/* 控制按鈕 */}
      <div className="carousel-controls-wrapper d-none d-md-block">
        <button 
        className="carousel-control-prev custom-control" 
        type="button" 
        data-bs-target="#heroCarousel" 
        data-bs-slide="prev"
        >
          <span className="visually-hidden">Previous</span>
          <span className='text-dark'>&larr;</span>
        </button>
        <button 
          className="carousel-control-next custom-control" 
          type="button" 
          data-bs-target="#heroCarousel" 
          data-bs-slide="next"
        >
          <span className="visually-hidden">Next</span>
          <span className='text-dark'>&rarr;</span>
        </button>
      </div>
      {/* 加入輪播指示器 */}
      <div className="carousel-indicators">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
          ></button>
        ))}
      </div>
      {/* 手機版面 */}
      {/* 控制按鈕 */}
      <div className="carousel-controls-wrapper-mobile">
          <button 
          className="carousel-control-prev custom-control-mobile d-md-none" 
          type="button" 
          data-bs-target="#heroCarousel" 
          data-bs-slide="prev"
          >
            <span className="visually-hidden">Previous</span>
            <span className='text-dark'>&larr;</span>
          </button>
          <button 
            className="carousel-control-next custom-control-mobile d-md-none" 
            type="button" 
            data-bs-target="#heroCarousel" 
            data-bs-slide="next"
          >
            <span className="visually-hidden">Next</span>
            <span className='text-dark'>&rarr;</span>
          </button>
      </div>
  </div>
</div>
  );
};

export default HeroSection;