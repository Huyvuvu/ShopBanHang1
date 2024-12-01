import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout.jsx"
// import LayoutAdmin from "./Components/LayoutAdmin.jsx"
import Error404 from "./Pages/Error404.jsx"
import  Home from "./Pages/Home.jsx"
import Shop from "./Pages/Shop.jsx"
import ShopDetail from "./Pages/ShopDetail.jsx"
import About from "./Pages/About.jsx"
import Contact from "./Pages/Contact.jsx"
import New from "./Pages/New.jsx"
import NewDetail from "./Pages/NewDetail.jsx"
import Cart from "./Pages/Cart.jsx"
import Checkout from "./Pages/Checkout.jsx"
import Login from "./Pages/Login.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error404/>,
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      { path: "/dang-nhap",
       element: <Login /> 
      },
      {
        path:"/:cat",
        element: <Shop/>
      },
      {
        path:"/:cat/:id",
        element: <ShopDetail/>
      },
      {
        path:"/gio-hang",
        element: <Cart/>
      },
      {
        path:"/thanh-toan",
        element: <Checkout/>
      },
      {
        path:"/about",
        element: <About/>
      },
      {
        path:"/lien-he",
        element: <Contact/>
      },
      {
        path:"/new",
        element: <New/>
      },
      {
        path:"/new-detail",
        element: <NewDetail/>
      },
  ]
  }
])

function App() {


  return (
    <>
      <RouterProvider router = {router}/> 
      
      <ToastContainer/>
    </>
  )
}

export default App
