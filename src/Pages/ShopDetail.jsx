import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateItem } from "../Components/Reduce/CartSlice.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShopDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [data, setData] = useState({ product: [], isLoading: false });
  const [quantity, setQuantity] = useState(1); // Thêm state cho số lượng
  const cartItems = useSelector((state) => state.cart.items); // Giả sử cart lưu trữ trong state.cart.items

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((kQ) => setData({ product: kQ.data, isLoading: true }))
      .catch((e) => console.error(e));
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQuantity(value);
  };

  const addCart = (event) => {
    event.preventDefault();

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cartItems.find((item) => item.id === data.product.id);

    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, hiển thị thông báo lỗi
      toast.error("Sản phẩm đã có trong giỏ hàng!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        style: {
          backgroundColor: "#dc3545", // Màu nền đỏ
          color: "#ffffff", // Màu chữ trắng
          fontSize: "16px",
          fontWeight: "500",
          borderRadius: "8px",
          padding: "12px 20px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        },
      });
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ và hiển thị thông báo thành công
      dispatch(
        addUpdateItem({
          id: data.product.id,
          image: data.product.images[0],
          name: data.product.title,
          price: data.product.price,
          quantity: quantity,
        })
      );

      toast.success("Bạn đã thêm sản phẩm vào giỏ hàng thành công!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        style: {
          backgroundColor: "#28a745", // Màu nền xanh lá cây
          color: "#ffffff", // Màu chữ trắng
          fontSize: "16px",
          fontWeight: "500",
          borderRadius: "8px",
          padding: "12px 20px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        },
      });
    }
  };

  if (data.isLoading) {
    return (
      <>
        {/* breadcrumb-section */}
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <p>See more Details</p>
                  <h1>Single Product</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Product Section */}
        <div className="single-product mt-150 mb-150">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="single-product-img">
                  <img src={data.product.images[0]} alt="" />
                </div>
              </div>
              <div className="col-md-7">
                <div className="single-product-content">
                  <h3>{data.product.title}</h3>
                  <p className="single-product-pricing">
                    ${data.product.price}
                  </p>
                  <p>{data.product.description}</p>
                  <div className="single-product-form">
                    <form>
                      <input
                        type="number"
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                        placeholder="1"
                      />
                    </form>
                    <a onClick={addCart} href="#" className="cart-btn">
                      <i className="fas fa-shopping-cart" /> Thêm vào giỏ hàng
                    </a>
                    <p>
                      <strong>Chuyên mục: </strong>
                      {data.product.category}
                    </p>
                  </div>
                  <h4>Share:</h4>
                  <ul className="product-share">
                    <li>
                      <a href="">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="fab fa-google-plus-g" />
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="fab fa-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </>
    );
  }

  return null;
}

export default ShopDetail;
