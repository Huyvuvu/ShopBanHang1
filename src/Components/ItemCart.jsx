import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpdateItem, removeItem } from "./Reduce/CartSlice.js";
import { toast } from "react-toastify";

function ItemCart({ data }) {
    const dispatch = useDispatch();

    // Khởi tạo state quantity với giá trị mặc định từ data hoặc 1
    const [quantity, setQuantity] = useState(data.quantity || 1);

    // Cập nhật state quantity mỗi khi data.quantity thay đổi
    useEffect(() => {
        setQuantity(data.quantity || 1);
    }, [data.quantity]);

    // Hàm xử lý khi thay đổi số lượng
    const thayDoiSoLuong = (event) => {
        let newQuantity = parseInt(event.target.value, 10);

        // Kiểm tra số lượng hợp lệ (không âm, không NaN)
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1; // Đặt lại số lượng về 1 nếu nhập không hợp lệ
        }
        // Cập nhật lại giá trị trong state
        setQuantity(newQuantity);
    };

    // Cập nhật Redux khi người dùng kết thúc nhập (onBlur)
    const capNhatSoLuongRedux = () => {
        dispatch(addUpdateItem({
            id: data.id,
            price: data.price,
            quantity: quantity,
        }));
        toast.success(`Cập nhật số lượng "${data.name}" thành ${quantity}.`);
    };

    // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
    const xoaSanPham = (event) => {
        event.preventDefault();
        dispatch(removeItem({ id: data.id }));
        toast.warn(`Đã xóa sản phẩm "${data.name}" khỏi giỏ hàng.`);
    };

    // Tính tổng tiền sản phẩm
    const itemTotal = quantity * (data.price || 0);

    return (
        <tr className="table-body-row">
            <td className="product-remove">
                <button type="button" onClick={xoaSanPham}>
                    <i className="far fa-window-close" />
                </button>
            </td>
            <td className="product-image">
                <img src={data.image} alt={data.name || "Product"} />
            </td>
            <td className="product-name">{data.name}</td>
            <td className="product-price">${data.price}</td>
            <td className="product-quantity">
                <input
                    type="number"
                    min="1"
                    value={quantity} // Giá trị nhập vào sẽ theo dõi giá trị quantity từ state
                    onChange={thayDoiSoLuong} // Cập nhật quantity khi người dùng thay đổi
                    onBlur={capNhatSoLuongRedux} // Dispatch cập nhật Redux khi người dùng kết thúc nhập
                />
            </td>
            <td className="product-total">${itemTotal.toFixed(2)}</td>
        </tr>
    );
}

export default ItemCart;
