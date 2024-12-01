import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateItem } from "../Components/Reduce/CartSlice.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ItemProduct({ sanpham }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Assuming your state has 'cart.items'

  let addCart = (event) => {
    event.preventDefault();

    // Check if the product already exists in the cart
    const existingItem = cartItems.find((item) => item.id === sanpham.id);

    if (existingItem) {
      // If product is already in the cart, show failure toast
      toast.error("Sản phẩm đã có trong giỏ hàng!", {
        position: "top-center", // Vị trí của thông báo
        autoClose: 1500, // Thời gian tự động đóng (1.5 giây)
        hideProgressBar: true, // Ẩn thanh tiến trình
        closeButton: false, // Không hiển thị nút đóng
        pauseOnHover: true, // Dừng khi hover
        style: {
          backgroundColor: "#dc3545", // Màu nền đỏ
          color: "#ffffff", // Màu chữ trắng
          fontSize: "16px", // Kích thước chữ vừa phải
          fontWeight: "500", // Chữ đậm vừa phải
          borderRadius: "8px", // Bo tròn góc nhẹ
          padding: "12px 20px", // Khoảng cách giữa nội dung và viền
          // boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)', // Hiệu ứng bóng nhẹ
          fontFamily: "Arial, sans-serif", // Font chữ sạch sẽ và hiện đại
          textAlign: "center", // Căn giữa chữ
        },
      });
    } else {
      // If the product is not in the cart, add it
      dispatch(
        addUpdateItem({
          id: sanpham.id,
          image: sanpham.images[0],
          name: sanpham.title,
          price: sanpham.price,
          quantity: 1,
        })
      );

      // Show success toast when the product is added
      toast.success("Bạn đã thêm sản phẩm vào giỏ hàng thành công!", {
        position: "top-center", // Vị trí của thông báo
        autoClose: 1500, // Thời gian tự động đóng (1.5 giây)
        hideProgressBar: true, // Ẩn thanh tiến trình
        closeButton: false, // Không hiển thị nút đóng
        pauseOnHover: true, // Dừng khi hover
        style: {
          backgroundColor: "#28a745", // Màu nền xanh lá cây tươi sáng
          color: "#ffffff", // Màu chữ trắng
          fontSize: "16px", // Kích thước chữ vừa phải
          fontWeight: "500", // Chữ đậm vừa phải
          borderRadius: "8px", // Bo tròn góc nhẹ
          padding: "12px 20px", // Khoảng cách giữa nội dung và viền
          // boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)', // Hiệu ứng bóng nhẹ
          fontFamily: "Arial, sans-serif", // Font chữ sạch sẽ và hiện đại
          textAlign: "center", // Căn giữa chữ
        },
      });
    }
  };

  return (
    <div className="col-lg-4 col-md-6 text-center">
      <div className="single-product-item">
        <div className="product-image">
          <a href={`/${sanpham.category}/${sanpham.id}`}>
            <img src={sanpham.thumbnail} alt="" />
          </a>
        </div>
        <h3>{sanpham.title}</h3>
        <p className="product-price">{sanpham.price}$ </p>
        <a onClick={addCart} href="#" className="cart-btn">
          <i className="fas fa-shopping-cart" /> Thêm vào giỏ hàng
        </a>
      </div>
      {/* Thêm ToastContainer để hiển thị thông báo */}
      <ToastContainer />
    </div>
  );
}

export default ItemProduct;
