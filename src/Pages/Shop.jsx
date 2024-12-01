import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemProduct from "./ItemProduct.jsx";

function Shop() {
    const { cat } = useParams();
    const [data, setData] = useState({ product: [], isLoading: false });
    const [page, setPage] = useState(1); // Thêm state page để quản lý số trang hiện tại
    const itemsPerPage = 3; // Số sản phẩm mỗi lần "xem thêm"

    useEffect(() => {
        setData({ product: [], isLoading: false }); // Reset sản phẩm khi thay đổi danh mục
        setPage(1); // Reset trang về 1
        loadProducts(1); // Tải sản phẩm của trang đầu tiên
    }, [cat]);

    // Hàm tải sản phẩm
    const loadProducts = (currentPage) => {
        axios
            .get(`https://dummyjson.com/products/category/${cat}`)
            .then((response) => {
                const allProducts = response.data.products;
                const newProducts = allProducts.slice(0, currentPage * itemsPerPage);
                setData({ product: newProducts, isLoading: true });
            })
            .catch((error) => console.error(error));
    };

    // Hàm khi nhấn "Xem thêm"
    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadProducts(nextPage);
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
                                <h1>Shop</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            {/* products */}
            <div className="product-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="product-filters">
                                <ul>
                                    <li className="active" data-filter="*">All</li>
                                    <li data-filter=".strawberry">Strawberry</li>
                                    <li data-filter=".berry">Berry</li>
                                    <li data-filter=".lemon">Lemon</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row product-lists">
                        {data.isLoading
                            ? data.product.map((v) => <ItemProduct key={v.id} sanpham={v} />)
                            : <p>Loading...</p>}
                    </div>
                    {/* nút "Xem thêm" */}
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <button onClick={loadMore} className="btn btn-primary">
                                Xem thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* end products */}
            {/* logo carousel */}
            <div className="logo-carousel-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="logo-carousel-inner">
                                <div className="single-logo-item">
                                    <img src="assets/img/company-logos/1.png" alt="" />
                                </div>
                                <div className="single-logo-item">
                                    <img src="assets/img/company-logos/2.png" alt="" />
                                </div>
                                <div className="single-logo-item">
                                    <img src="assets/img/company-logos/3.png" alt="" />
                                </div>
                                <div className="single-logo-item">
                                    <img src="assets/img/company-logos/4.png" alt="" />
                                </div>
                                <div className="single-logo-item">
                                    <img src="assets/img/company-logos/5.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end logo carousel */}
        </>
    );
}

export default Shop;
