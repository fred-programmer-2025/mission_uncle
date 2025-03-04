import { Link } from "react-router";

export default function Card({ product, length }) {
    return (
        <>
        <div className={`col-12 ${length === 1 ? 'col-md-8 offset-md-2' : length <= 2 ? 'col-md-6' : 'col-md-4'}`}>
            <div className="article-card d-flex flex-row flex-md-column ">
                <div className="frame">
                    <img src={product.imageUrl} alt={product.title} />
                </div>
                <div className="card-body text-start d-grid">
                    <h5>{product.title}</h5>
                    <p className="mt-2">{product.description}</p>
                    <Link className="btn btn-dark" to={`/mission/${product.id}`}>了解更多</Link>
                </div>
            </div>
        </div>
        </>
    );
}