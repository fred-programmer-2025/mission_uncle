import React from "react";
import "../styles/components/ContactUs.scss";
import titleBg from "../assets/title_bg.jpg";
import customerServiceImgLarge from '../assets/customer_service_large.jpg';
import stickerImg from '../assets/sticker_green.png';
import coWorkingBg from '../assets/coworking_bg.png';

const ContactUs = () => {
  return (
    <section className="contact-us position-relative overflow-hidden">
      {/* 1. 背景圖 - 在 md 以上寬度佔 col-8，md 以下佔 col-12 */}
      <div className="container-fluid p-0">
        <div className="row pt-5 pt-md-0 g-0">
          <div className="col-12 col-md-4 position-relative py-5 py-md-0" style={{
            backgroundColor: 'rgba(165, 238, 157, 0.1)',
          }}>
            {/* 黃色卡片定位容器 */}
            <div className="position-relative translate-middle top-50 contact-yellow-card-position" style={{ 
                right: '0',
                left: '100%',
                zIndex: 3
              }}>
              {/* 3. 聯絡我們絕對定位在黃色卡片上 */}
              <div className="position-absolute contact-tag-text-position" style={{ 
                top: '-8%', 
                left: '5%',
                transform: 'translateY(-50%)',
                zIndex: 3
              }}>
                <div className="px-1 py-2 border border-dark" style={{ 
                  backgroundColor: 'rgba(165, 238, 157, 1)', 
                  boxShadow: '2px 3px 4px rgba(0, 0, 0, 0.25)' 
                }}>
                  <div className="fw-bold text-center contact-tag-text" style={{ 
                    fontSize: 'clamp(12px, 1.2vw , 28px)', 
                    writingMode: 'vertical-Lr' 
                  }}>
                    聯絡我們
                  </div>
                </div>
              </div>

              {/* 4. 黃色卡片在 md 以上最大寬度為 418px */}
              <div className="position-relative d-none d-md-block" style={{
                maxWidth: '418px',
                width: '100%'
              }}>
                <img 
                  src={ titleBg}
                  alt="背景" 
                  className="img-fluid w-100"
                />
                <div className="position-absolute top-0 left-0 w-100 h-100 p-3 d-flex flex-column justify-content-center">
                  <p className="mb-adjust fw-bold contact-card-text" style={{ 
                    lineHeight: '1.4'
                  }}>
                    如有任何問題或需要協助,歡迎透過客服信箱、電話或線上表單與我們聯繫。我們的客服團隊將提供為您服務,提供專業與貼心的解答,讓您的體驗更順暢。
                  </p>
                  <button className="btn w-100 rounded-0 border border-dark text-dark fw-bold p-2" 
                    style={{ 
                      backgroundColor: 'rgba(115, 219, 106, 1)',
                      fontSize: 'clamp(10px, 1.5vw, 16px)'
                    }}>
                    立即聯絡 &gt;
                  </button>
                </div>
              </div>
              <div className="position-relative d-block d-md-none" style={{
                maxWidth: '65%',
                width: '100%'
              }}>
                <img 
                  src={ titleBg}
                  alt="背景" 
                  className="img-fluid w-100"
                />
                <div className="px-4 position-absolute top-0 left-0 w-100 h-100 p-3 d-flex flex-column justify-content-center contact-card-text">
                  <p className="mb-adjust fw-bold" style={{ 
                    lineHeight: '1.4'
                  }}>
                    如有任何問題或需要協助,歡迎透過客服信箱、電話或線上表單與我們聯繫。我們的客服團隊將提供為您服務,提供專業與貼心的解答,讓您的體驗更順暢。
                  </p>
                  <button className="btn w-100 rounded-0 border border-dark text-dark fw-bold p-2 contact-btn-text" 
                    style={{ 
                      backgroundColor: 'rgba(115, 219, 106, 1)',
                    }}>
                    立即聯絡 &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 position-relative">
            <img 
              src={ coWorkingBg }
              alt="背景圖片" 
              className="img-fluid w-100 h-100 object-fit-cover contact-us-bg"
              style={{ minHeight: '610px' }}
            />
            
            {/* 客服資訊 - 照片和文字區塊 */}
            <div className="position-absolute photo-card-position d-none d-md-block" style={{
              top: '35%',
              right: '33%',
              transform: 'translateY(-30%)',
              zIndex: 4,
              maxWidth: '396px'
            }}>
              <div className="bg-white p-2 shadow position-relative">
                {/* 2. 膠帶絕對定位在照片上 */}
                <div className="position-absolute" style={{
                  top: '-22px',
                  right: '38%',
                  zIndex: 5,
                  transform: 'rotate(-9deg)',
                  width: '84px'
                }}>
                  <img 
                    src={ stickerImg } 
                    alt="膠帶" 
                    className="img-fluid"
                  />
                </div>

                <img 
                  src={ customerServiceImgLarge }
                  alt="客服人員工作中" 
                  className="img-fluid w-100 mb-2"
                />
                <div className="text-center py-2">
                  <p className="small mb-0 fst-italic">Call us, we are glad to help!</p>
                </div>
              </div>
            </div>
            <div className="position-absolute photo-card-position d-block d-md-none" style={{
              top: '35%',
              right: '33%',
              transform: 'translateY(-30%)',
              zIndex: 4,
              maxWidth: '65%',
              width: '100%'
            }}>
              <div className="bg-white p-2 shadow position-relative">
                {/* 2. 膠帶絕對定位在照片上 */}
                <div className="position-absolute" style={{
                  top: '-22px',
                  right: '38%',
                  zIndex: 5,
                  transform: 'rotate(-9deg)',
                  width: '84px'
                }}>
                  <img 
                    src={ stickerImg } 
                    alt="膠帶" 
                    className="img-fluid"
                  />
                </div>

                <img 
                  src={ customerServiceImgLarge }
                  alt="客服人員工作中" 
                  className="img-fluid w-100 mb-2"
                />
                <div className="text-center py-2">
                  <p className="small mb-0 fst-italic">Call us, we are glad to help!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
