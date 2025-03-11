import React, { useState } from "react";
// 請確保已經正確導入 SVG 圖片
import recommendListTitleText from '../assets/recommend_list_title_text.svg';
import recommendUncle1 from "../assets/recommend_uncle_1.jpg";
import recommendUncle2 from "../assets/recommend_uncle_2.jpg";
import recommendUncle3 from "../assets/recommend_uncle_3.jpg";

const RecommendedList = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const uncles = [
    { id: 1, name: "大叔 1", image: recommendUncle1 },
    { id: 2, name: "大叔 2", image: recommendUncle2 },
    { id: 3, name: "大叔 3", image: recommendUncle3 },
  ];

  return (
    <section className="recommended-list position-relative py-5" style={{ backgroundColor: "#f5f5f5" }}>
      {/* 背景 SVG RECOMMEND LIST */}
      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center overflow-hidden" style={{ zIndex: 1, pointerEvents: "none" }}>
        <img 
          src={recommendListTitleText} 
          alt="RECOMMEND LIST" 
          className="position-absolute"
          style={{
            maxWidth: "90%",
            width: "auto",
            height: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: "0.5",
            zIndex: -1
          }}
        />
      </div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row">
          {/* 左側標題區塊 - 桌面版顯示 */}
          <div className="col-lg-3 d-none d-lg-block position-relative">
            <div className="position-sticky" style={{ top: "50px" }}>
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
            <div className="d-lg-none mb-4 position-relative">
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
                  className="mb-4 px-2"
                  style={{ width: "33.333%" }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="position-relative" style={{ 
                    transition: "transform 0.3s ease",
                    transform: hoverIndex === index ? "scale(1.05)" : "scale(1)"
                  }}>
                    {/* 序號 */}
                    <div className="position-absolute" style={{ 
                      top: "-15px", 
                      left: "10px", 
                      fontSize: "60px", 
                      fontWeight: "bold",
                      color: hoverIndex === index ? "#73DB6A" : "#333",
                      transition: "color 0.3s ease",
                      zIndex: 3
                    }}>
                      {index + 1}
                    </div>
                    
                    {/* 卡片圖片 */}
                    <div className="position-relative overflow-hidden" style={{ 
                      boxShadow: hoverIndex === index ? "0 10px 20px rgba(0,0,0,0.2)" : "0 4px 8px rgba(0,0,0,0.1)",
                      transition: "box-shadow 0.3s ease"
                    }}>
                      <img 
                        src={uncle.image} 
                        alt={uncle.name} 
                        className="img-fluid w-100"
                        style={{ 
                          height: "280px",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                          transform: hoverIndex === index ? "scale(1.1)" : "scale(1)"
                        }}
                      />
                    </div>
                    
                    {/* 了解大叔按鈕 */}
                    <div className="mt-3">
                      <button className="btn w-100 py-2 fw-bold" style={{ 
                        backgroundColor: hoverIndex === index ? "#5ac550" : "rgba(165, 238, 157, 1)",
                        transition: "background-color 0.3s ease",
                        border: hoverIndex === index ? "1px solid #0f800a" : "1px solid #333",
                        borderRadius: "0"
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
                    {/* 序號 */}
                    <div className="position-absolute" style={{ 
                      top: "-15px", 
                      left: "10px", 
                      fontSize: "40px", 
                      fontWeight: "bold",
                      color: "#333",
                      zIndex: 3
                    }}>
                      {index + 1}
                    </div>
                    
                    {/* 卡片圖片 */}
                    <div className="position-relative overflow-hidden">
                      <img 
                        src={uncle.image} 
                        alt={uncle.name} 
                        className="img-fluid w-100"
                        style={{ 
                          height: "200px",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                    
                    {/* 了解大叔按鈕 */}
                    <div className="mt-2">
                      <button className="btn w-100 py-2 fw-bold" style={{ 
                        backgroundColor: "rgba(165, 238, 157, 1)",
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



