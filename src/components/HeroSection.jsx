import * as bootstrap from 'bootstrap';
import "../styles/components/HeroSection.scss";

import banner1 from "../assets/banner_1.jpg";
import banner2 from "../assets/banner_2.jpg";
import banner3 from "../assets/banner_3.jpg";
import bgImage from '../assets/background_tree.jpg';
import uncleCutout from "../assets/uncle_cutout.png";
import supportiveText from "../assets/supportive_text.svg";
import titleImage from "../assets/title_image_1.svg";
import titleBg from "../assets/title_bg.jpg";

const HeroSection = () => {
  // 輪播資料
  const carouselItems = [
    {
      id: 1,
      background: banner1,
      title: "SUPPORTIVE Middle-Aged",
      description: "陪伴是最溫暖的支持",
      subText: "以真心陪伴，讓每個時光更有溫度",
      buttonText: "尋找大叔"
    },
    {
      id: 2,
      background: banner2,
      title: "SUPPORTIVE Middle-Aged",
      description: "陪伴是最溫暖的支持",
      subText: "以真心陪伴，讓每個時光更有溫度",
      buttonText: "尋找大叔"
    },
    {
      id: 3,
      background: banner3,
      title: "SUPPORTIVE Middle-Aged",
      description: "陪伴是最溫暧的支持",
      subText: "以真心陪伴，讓每個時光更有溫度",
      buttonText: "尋找大叔"
    }
  ];


  return (
    <div className="hero-section">
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {carouselItems.map((item, idx) => (
            <div key={item.id} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
              <div className="container-fluid h-100 p-0">
                <div className="row h-100 g-0">
                  {/* 左側區塊先保持不變 */}
                  <div className="col-md-4 position-relative"
                    style={{ 
                      backgroundImage: `url(${bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* 大叔照片和內容框 */}
                    {/* 內容包裝器 */}
                    <div className="position-absolute w-100 h-100 d-none d-md-block">
                      {/* 卡片容器 - 使用 transform 來定位 */}
                      <div className="position-absolute" 
                        style={{ 
                          width: '400px',  // 設定固定寬度
                          top: '63%',
                          left: '75%',
                          transform: 'translate(-50%, -50%)',  // 使用 transform 置中
                          zIndex: 2
                        }}
                      >
                        {/* 大叔圖片 */}
                        <div className="position-absolute" 
                          style={{ 
                            width: '40%',
                            top: '-160px',
                            left: '20%',
                            zIndex: 0
                          }}
                        >
                          <img 
                            src={uncleCutout} 
                            alt="尋找大叔" 
                            className="img-fluid"
                          />
                        </div>

                        {/* 黃色背景框 */}
                        <div className="position-relative">
                          <img 
                            src={titleBg} 
                            alt="背景" 
                            className="img-fluid w-100"
                          />
                          
                          {/* 內容層 */}
                          <div className="position-absolute top-0 left-0 w-100 h-100 p-4">
                            {/* 標題圖片 */}
                            <img 
                              src={titleImage} 
                              alt="陪伴是最溫暖的支持" 
                              className="img-fluid mb-3"
                            />
                            
                            {/* 文字說明 */}
                            <p className="mb-4">{item.subText}</p>
                            
                            {/* 按鈕 */}
                            <button 
                              className="btn w-100 mx-auto d-block" 
                              style={{ 
                                backgroundColor: '#64A70B', 
                                color: 'white'
                              }}
                            >
                              {item.buttonText} &gt;
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 右側區塊修改 */}
                  <div className="col-md-8 p-0 position-relative mb-4">
                    {/* 下棋照片容器 */}
                    <div className="position-relative overflow-hidden h-100 mx-4">
                      {/* 空心文字圖片 - 放在照片容器內 */}
                      <div className="position-absolute top-0 end-md-0 z-3 w-100 h-25 d-none d-lg-block">
                        <img 
                          src={supportiveText}
                          alt="SUPPORTIVE Middle-Aged"
                          className="w-100 h-100"
                        />
                      </div>


                      {/* 下棋照片 */}
                      <img 
                        src={item.background}
                        alt={item.description}
                        className="w-100 h-75 position-absolute mt-4 bottom-0 border border-dark"
                        style={{ 
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 輪播控制按鈕 */}
        <button 
          className="carousel-control-prev" 
          type="button" 
          data-bs-target="#heroCarousel" 
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button 
          className="carousel-control-next" 
          type="button" 
          data-bs-target="#heroCarousel" 
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;