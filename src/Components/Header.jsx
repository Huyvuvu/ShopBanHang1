import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [data, setData] = useState({ menu: [], isloading: false });

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((kQ) => setData({ menu: kQ.data, isloading: true }))
      .catch((e) => console.error(e));
  }, []);

  if (data.isloading) {
    return (
      <>
        {/*PreLoader*/}
        {/* <div className="loader">
          <div className="loader-inner">
            <div className="circle" />
          </div>
        </div> */}
        {/*PreLoader Ends*/}
        {/* header */}
        <div className="top-header-area" id="sticker">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-sm-12 text-center">
                <div className="main-menu-wrap">
                  {/* logo */}
                  <div className="site-logo">
                    <a href="index.html">
                      <img src="assets/img/logo.png" alt="" />
                    </a>
                  </div>
                  {/* logo */}
                  {/* menu start */}
                  <nav className="main-menu">
                    <ul>
                      <li>
                        <Link to={"/"}>Trang chủ</Link>
                      </li>
                      {/* <!---code menu  ở đây-> */}
                      {data.menu.map((v, i) =>
                        i < 6 ? (
                          <li key={v.slug}>
                            <Link to={`/${v.slug}`}>{v.name}</Link>
                          </li>
                        ) : (
                          ""
                        )
                      )}
                      <li>
                        <div className="header-icons">
                          <Link
                            to={"/gio-hang"}
                            className="fas fa-shopping-cart"
                          ></Link>
                          <Link
                            to={"/tim-kiem"}
                            className="mobile-hide search-bar-icon"
                          >
                            <i className="fas fa-search" />
                          </Link>
                          <Link
                            to={"/dang-nhap"}
                            className="fas fa-user"
                          ></Link>
                        </div>
                      </li>
                    </ul>
                  </nav>
                  <a className="mobile-show search-bar-icon" href="#">
                    <i className="fas fa-search" />
                  </a>
                  <div className="mobile-menu" />
                  {/* menu end */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end header */}
        {/* search area */}
        <div className="search-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <span className="close-btn">
                  <i className="fas fa-window-close" />
                </span>
                <div className="search-bar">
                  <div className="search-bar-tablecell">
                    <h3>Search For:</h3>
                    <input type="text" placeholder="Keywords" />
                    <button type="submit">
                      Search <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end search area */}
      </>
    );
  }
}

export default Header;
