import React from 'react';
import "../styles/components/AboutUs.scss";
import aboutUsUncle_1 from '../assets/about_us_uncle_1.jpg';
import aboutUsUncle_2 from '../assets/about_us_uncle_2.jpg';
import aboutUsUncle_3 from '../assets/about_us_uncle_3.jpg';
import aboutUsBg from '../assets/about_us_bg.png';
import titleBg from "../assets/title_bg.jpg";
const AboutUs = () => {
  return (
    <section className="about-us position-relative py-5">
      {/* 背景 - 混凝土質感 */}
      <div className="position-absolute top-0 start-0 w-100 h-100 about-us-bg" 
        style={{ 
          backgroundColor: '#e0e0e0',
          backgroundImage: `url(${aboutUsBg})`,
          backgroundSize: 'cover',
          zIndex: -1
        }}>
      </div>
      
      <div className="container">
        <div className="row justify-content-center d-flex-reverse">
          <div className="col-md-4 position-relative d-block d-md-none">
            {/* 關於我們綠色標籤 */}
            {/* 黃色卡片定位容器 */}
            <div className="position-relative translate-middle top-50 about-yellow-card-position mb-4" style={{ 
                zIndex: 3
              }}>
              {/* 3. 聯絡我們絕對定位在黃色卡片上 */}
              <div className="position-absolute about-tag-text-position" style={{ 
                top: '-8%', 
                left: '5%',
                transform: 'translateY(-50%)',
                zIndex: 3
              }}>
                <div className="px-1 py-2 border border-dark" style={{ 
                  backgroundColor: 'rgba(165, 238, 157, 1)', 
                  boxShadow: '2px 3px 4px rgba(0, 0, 0, 0.25)' 
                }}>
                  <div className="fw-bold text-center about-tag-text" style={{ 
                    fontSize: 'clamp(12px, 1.2vw , 28px)', 
                    writingMode: 'vertical-Lr' 
                  }}>
                    關於我們
                  </div>
                </div>
              </div>

              {/* 4. 黃色卡片在 md 以上最大寬度為 418px */}
              <div className="position-relative d-block d-md-none" style={{
                maxWidth: '100%',
                width: '100%'
              }}>
                <img 
                  src={ titleBg }
                  alt="背景" 
                  className="img-fluid w-100"
                />
                <div className="px-4 position-absolute top-0 left-0 w-100 h-100 p-3 d-flex flex-column justify-content-center about-card-text">
                  <p className="about-mb-adjust fw-bold" style={{ 
                    lineHeight: '1.4'
                  }}>
                    「大叔出任務」是一個匯集特色大叔的服務平台,專注解決您的生活需求。無論是陪伴長輩、協助購物,或完成其他任務,大叔以真誠態度和豐富經驗提供貼心、合法的服務。不只是出租,更是安心依靠的橋樑。
                  </p>
                  <button className="btn w-100 rounded-0 border border-dark text-dark fw-bold p-2 about-btn-text" 
                    style={{ 
                      backgroundColor: 'rgba(115, 219, 106, 1)',
                    }}>
                    立即聯絡 &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* 三張照片並排 */}
          <div className="col-md-8 d-flex justify-content-between">
            {/* 照片1 */}
            <div className="text-center about-uncle-1" style={{ width: '24%' }}>
              <img 
                src={aboutUsUncle_1} 
                alt="笑容大叔" 
                className="img-fluid h-100 object-fit-cover" 
                style={{ 
                  maxHeight: '500px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            </div>
            
            {/* 照片2 */}
            <div className="mx-1 mx-md-0 text-center about-uncle-2" style={{ width: '50%' }}>
              <img 
                src={aboutUsUncle_2} 
                alt="遊戲大叔與孩子" 
                className="img-fluid h-100 object-fit-cover w-100" 
                style={{ 
                  maxHeight: '500px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            </div>
            
            {/* 照片3 */}
            <div className="text-center about-uncle-3" style={{ width: '24%' }}>
              <img 
                src={aboutUsUncle_3} 
                alt="笑容大叔" 
                className="img-fluid h-100 object-fit-cover" 
                style={{ 
                  maxHeight: '500px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          </div>
          {/* 右側資訊區塊 */}
          <div className="col-md-4 position-relative d-md-block d-none">
            {/* 關於我們綠色標籤 */}
            {/* 黃色卡片定位容器 */}
            <div className="position-relative translate-middle top-50 about-yellow-card-position" style={{ 
                zIndex: 3
              }}>
              {/* 3. 聯絡我們絕對定位在黃色卡片上 */}
              <div className="position-absolute about-tag-text-position" style={{ 
                top: '-8%', 
                left: '5%',
                transform: 'translateY(-50%)',
                zIndex: 3
              }}>
                <div className="px-1 py-2 border border-dark" style={{ 
                  backgroundColor: 'rgba(165, 238, 157, 1)', 
                  boxShadow: '2px 3px 4px rgba(0, 0, 0, 0.25)' 
                }}>
                  <div className="fw-bold text-center about-tag-text" style={{ 
                    fontSize: 'clamp(12px, 1.2vw , 28px)', 
                    writingMode: 'vertical-Lr' 
                  }}>
                    關於我們
                  </div>
                </div>
              </div>

              {/* 4. 黃色卡片在 md 以上最大寬度為 418px */}
              <div className="position-relative" style={{
                maxWidth: '418px',
                width: '100%'
              }}>
                <img 
                  src={ titleBg }
                  alt="背景" 
                  className="img-fluid w-100"
                />
                <div className="position-absolute top-0 left-0 w-100 h-100 p-3 d-flex flex-column justify-content-center">
                  <p className="about-mb-adjust fw-bold about-card-text" style={{ 
                    lineHeight: '1.4'
                  }}>
                  「大叔出任務」是一個匯集特色大叔的服務平台,專注解決您的生活需求。無論是陪伴長輩、協助購物,或完成其他任務,大叔以真誠態度和豐富經驗提供貼心、合法的服務。不只是出租,更是安心依靠的橋樑。                  </p>
                  <button className="btn w-100 rounded-0 border border-dark text-dark fw-bold p-2 about-btn-text" 
                    style={{ 
                      backgroundColor: 'rgba(115, 219, 106, 1)',
                      fontSize: 'clamp(10px, 1.5vw, 16px)'
                    }}>
                    立即聯絡 &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;