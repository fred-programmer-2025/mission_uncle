import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const UncleInfoPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      // setIsScreenLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/products`);
        setProducts(res.data.products);
      } catch (error) {
        alert(error);
      } finally {
        // setIsScreenLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products?.map((product) => {
          return (
            <div key={product.id} className="col">
              <div className="card d-flex flex-column h-60">
                <img src={product.imageUrl} className="card-img-top" alt={product.title} style={{
                  maxWidth: '100%',
                  height: '300px',
                  objectFit: 'cover'
                }}/>
                <div className="card-body d-flex flex-column flex-grow-1">
                  {/* <h5 className="card-title">{product.title}</h5> */}
                  <span className="title">{product.title}</span>
                  {/* <p className="card-text">{product.content.slice(0, 50) + "..."}</p> */}
                  <p className="text">{product.content.slice(0, 50) + "..."}</p>
                  {/* <a href="#" className="btn btn-primary">了解更多</a> */}
                  <Link className="btns" to={`/uncleinfo/${product.id}`}>了解更多</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default UncleInfoPage;