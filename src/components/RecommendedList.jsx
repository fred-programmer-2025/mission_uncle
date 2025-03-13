import React, { useState } from "react";
// 請確保已經正確導入 SVG 圖片
import "../styles/components/RecommendedList.scss";
import recommendListTitleText from '../assets/recommend_list_title_text.svg';
import recommendUncle1 from "../assets/recommend_uncle_1.jpg";
import recommendUncle2 from "../assets/recommend_uncle_2.jpg";
import recommendUncle3 from "../assets/recommend_uncle_3.jpg";
import textBgImage from '../assets/text_background.jpg';

const RecommendedList = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const uncles = [
    { id: 1, name: "大叔 1", image: recommendUncle1 },
    { id: 2, name: "大叔 2", image: recommendUncle2 },
    { id: 3, name: "大叔 3", image: recommendUncle3 },
  ];

  return (
    <section className="recommended-list position-relative py-5" style={{ backgroundColor: "rgba(224, 224, 224, 1)" }}>
      {/* 背景 SVG RECOMMEND LIST */}
      <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center overflow-hidden" style={{ zIndex: 1, pointerEvents: "none" }}>
        <img 
          src={recommendListTitleText} 
          alt="RECOMMEND LIST" 
          className="position-absolute recommended-list-bg"
          style={{
            width: "240px",
            top: "45%",
            left: "31%",
            transform: "translate(-50%, -50%)",
            opacity: "0.5",
            zIndex: -1
          }}
        />
      </div>

      <div className="container position-relative py-5" style={{ zIndex: 2 }}>
        <div className="row">
          {/* 左側標題區塊 - 桌面版顯示 */}
          <div className="col-lg-3 d-none d-lg-block position-relative">
            <div className="position-absolute" style={{ top: "-50px", left: "0" }}>
              {/* 綠色標籤 */}
              <div className="mb-4">
                <div className="px-1 py-2 border border-dark d-inline-block" style={{ 
                  backgroundColor: "rgba(165, 238, 157, 1)", 
                  boxShadow: "2px 3px 4px rgba(0,0,0,0.25)" 
                }}>
                  <div className="fw-bold text-center" style={{ 
                    fontSize: "clamp(14px, 1.2vw, 20px)", 
                    writingMode: "vertical-Lr",
                    lineHeight: "1.2"
                  }}>
                    我推的大叔
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 卡片區域 */}
          <div className="col-12 col-lg-9">
            {/* 手機版標題 */}
            <div className="d-lg-none mb-4 position-relative green-tag">
              <div className="px-1 py-2 border border-dark d-inline-block" style={{ 
                backgroundColor: "rgba(165, 238, 157, 1)", 
                boxShadow: "2px 3px 4px rgba(0,0,0,0.25)" 
              }}>
                <div className="fw-bold text-center" style={{ 
                  fontSize: "16px", 
                  writingMode: "vertical-Lr" 
                }}>
                  我推的大叔
                </div>
              </div>
            </div>

            {/* 桌面版卡片排列 */}
            <div className="d-none d-md-flex flex-wrap">
              {uncles.map((uncle, index) => (
                <div 
                  key={uncle.id} 
                  className="mb-4 px-4"
                  style={{ width: "33.333%" }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="position-relative" style={{ 
                  }}>
                    {/* 序號 */}
                    <div className="position-absolute" style={{ 
                      top: "-65px", 
                      left: "-25px", 
                      fontSize: "60px", 
                      fontWeight: "bold",
                      fontFamily: "'Dela Gothic One', cursive",
                      color: hoverIndex === index ? "#73DB6A" : "#333",
                      transition: "color 0.3s ease",
                      zIndex: 3
                    }}>
                      {index + 1}
                    </div>
                    {/* 背景圖案 - 文字內容背景 */}
                    <div className="position-absolute w-100" style={{
                        backgroundImage: `url(${textBgImage})`,
                        backgroundSize: "cover",
                        height: "250px",
                        top: "50px",
                        left: "-20px",
                        zIndex: -1
                      }}></div>
                    
                    {/* 卡片圖片 */}
                    <div className="position-relative overflow-hidden" style={{ 
                      boxShadow: hoverIndex === index ? "0 10px 20px rgba(0,0,0,0.2)" : "0 4px 8px rgba(0,0,0,0.1)",
                      transition: "box-shadow 0.3s ease",
                      height: "230px"
                    }}>
                      <img 
                        src={uncle.image} 
                        alt={uncle.name} 
                        className="img-fluid w-100"
                        style={{ 
                          height: "280px",
                          objectFit: "cover",
                          zIndex: 2
                        }}
                      />
                    </div>
                    
                    {/* 了解大叔按鈕 */}
                    <div className="mt-3 position-relative" style={{ 
                      paddingBottom: hoverIndex === index ? "1px" : "0", 
                      paddingRight: hoverIndex === index ? "1px" : "0",
                      transition: "padding 0.2s ease"
                    }}>
                      {/* 按鈕陰影效果 - 只在hover時顯示 */}
                      {hoverIndex === index && (
                        <div className="position-absolute" style={{
                          bottom: "0",
                          right: "0",
                          width: "calc(100% - 1px)",
                          height: "calc(100% - 1px)",
                          backgroundColor: "#000",
                          zIndex: 1
                        }}></div>
                      )}
                      
                      <button className="btn w-100 py-2 fw-bold position-relative" style={{ 
                        backgroundColor: hoverIndex === index ? "rgba(165, 238, 157, 1)" : "rgba(115, 219, 106, 1)",
                        transition: "background-color 0.3s ease, transform 0.2s ease",
                        transform: hoverIndex === index ? "translate(3px, -2px)" : "translate(0, 0)",
                        border: "1px solid #000",
                        borderRadius: "0",
                        zIndex: 2
                      }}>
                        了解大叔 &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 手機版卡片排列 */}
            <div className="d-md-none">
              {uncles.map((uncle, index) => (
                <div key={uncle.id} className="mb-4">
                  <div className="position-relative">

                    {/* 序號 - 手機版也使用 Dela Gothic One 字體 */}
                    <div className="position-absolute" style={{ 
                      top: "-55px", 
                      left: "-30px", 
                      fontSize: "40px", 
                      fontWeight: "bold",
                      fontFamily: "'Dela Gothic One', cursive",
                      color: "#333",
                      zIndex: 3
                    }}>
                      {index + 1}
                    </div>
                    {/* 背景圖案 - 文字內容背景 */}
                    <div className="position-absolute" style={{
                      backgroundImage: `url(${textBgImage})`,
                      backgroundSize: "cover",
                      width: "334px",
                      height: "200px",
                      top: "25px",
                      left: "-40px",
                      zIndex: -3
                    }}></div>
                    {/* 卡片圖片 */}
                    <div className="position-relative overflow-hidden mb-5">
                      <img 
                        src={uncle.image} 
                        alt={uncle.name} 
                        className="img-fluid"
                        style={{ 
                          width: "256px",
                          height: "200px",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                    
                    {/* 了解大叔按鈕 */}
                    <div className="mt-2">
                      <button className="btn w-100 py-2 fw-bold commended-btn-position" style={{ 
                        backgroundColor: "rgba(115, 219, 106, 1)",
                        border: "1px solid #333",
                        borderRadius: "0"
                      }}>
                        了解大叔 &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedList;



