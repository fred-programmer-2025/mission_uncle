import { Link } from "react-router";

const UNCLE_INTRO_DATA = {
    '阿哲': "擁有20年以上人生閱歷，溫柔耐心，善於與人溝通，最喜歡幫助他人解決問題。無論是陪伴長者、協助雜務，還是成為談心的對象，都會以專業和細心滿足您的需求。",
    '阿豪': "為人豪爽，專長水電、木工，能迅速解決您的居家大小維修問題。",
    'Jason': "為人精明，兼具美感，專長平面設計與網頁設計，是設計需求的不二選擇。",
    '順仔': "為人親切雞婆，熟悉各大市場，專長外送與代購，是您居家生活的好助手。",
    '寶哥': "為人開朗，擁有豐富的高階主管經驗，專長管理、問題分析，是企業諮詢的良師益友。",
    '李P': "為人聰明博學，專長心理諮商與演講，協助解開心理困惑，啟發新生活思維。"
}

export default function Card({ product }) {
    return (
        <>
        <div className="col-12 col-md-4 col-xxl-4">
            <div className="article-card d-flex flex-row flex-md-column ">
                <div className="frame">
                    <img src={product.imageUrl} alt={product.title} />
                </div>
                <div className="card-body text-start d-grid">
                    <h5>{product.title}</h5>
                    <p className='mt-2'>{UNCLE_INTRO_DATA[product?.title.replace(/\(.*$/, "")]}</p>
                    <Link className="btn btn-dark" to={`/mission/${product.id}`}>了解更多</Link>
                </div>
            </div>
        </div>
        </>
    );
}