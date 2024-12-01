import { useSelector } from "react-redux";
import ItemCart from "../Components/ItemCart";

function Cart() {

    const cart = useSelector((state) => state.cart)
    
        
    const calculateTotalPrice = () => {
        return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    };


    return (
        <>
            {/* breadcrumb-section */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <p>Fresh and Organic</p>
                                <h1>Cart</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            {/* cart */}
            <div className="cart-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="cart-table-wrap">
                                <table className="cart-table">
                                    <thead className="cart-table-head">
                                        <tr className="table-head-row">
                                            <th className="product-remove" />
                                            <th className="product-image">Product Image</th>
                                            <th className="product-name">Name</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-total">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.items.map(i => <ItemCart key={i.id} data={i}/>)}    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="total-section">
                                <table className="total-table">
                                    <thead className="total-table-head">
                                        <tr className="table-total-row">
                                            <th>Total</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                    <tr className="total-data">
                                            <td>
                                                <strong>Tổng Cộng: </strong>
                                            </td>
                                            <td>${calculateTotalPrice().toFixed(2)}</td>
                                        </tr>
                                        <tr className="total-data">
                                            <td>
                                                <strong>Vận chuyển: </strong>
                                            </td>
                                            <td>Miễn phí</td>
                                        </tr>
                                        <tr className="total-data">
                                            <td>
                                                <strong>Thành tiền: </strong>
                                            </td>
                                            <td>${calculateTotalPrice() .toFixed(2)}</td> 
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="cart-buttons">
                                    <a href="cart.html" className="boxed-btn">
                                        Update Cart
                                    </a>
                                    <a href="checkout.html" className="boxed-btn black">
                                        Check Out
                                    </a>
                                </div>
                            </div>
                            <div className="coupon-section">
                                <h3>Apply Coupon</h3>
                                <div className="coupon-form-wrap">
                                    <form action="index.html">
                                        <p>
                                            <input type="text" placeholder="Coupon" />
                                        </p>
                                        <p>
                                            <input type="submit" defaultValue="Apply" />
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end cart */}
        </>
    )
}

export default Cart;