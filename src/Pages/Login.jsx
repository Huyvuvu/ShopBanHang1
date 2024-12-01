import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/dist/sweetalert2.min.css"; // Import SweetAlert2 styles
import "./login.css";

function Login() {
  const [input, setInput] = useState({ user: {}, btnLogin: false });
  const [data, setData] = useState({ user: {}, isLoading: false });

  const navigate = useNavigate();

  const getInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      user: { ...input.user, [name]: value },
      btnLogin: false,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setInput({ ...input, btnLogin: true });
  };

  useEffect(() => {
    if (!input.btnLogin) return;

    const loginUser = async () => {
      setData({ ...data, isLoading: true });

      try {
        const response = await axios.post("https://dummyjson.com/user/login", {
          username: input.user.un,
          password: input.user.pw,
          expiresInMin: 30,
        });

        setData({ user: response.data, isLoading: false });

        // Use SweetAlert2 for success alert
        Swal.fire({
          title: "Đăng nhập thành công!",
          text: "Chào mừng bạn đến với trang web!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#28a745",
          background: "#ffffff",
          customClass: {
            title: 'alert-title',
            popup: 'alert-popup',
            confirmButton: 'alert-button',
          }
        });

        navigate("/");

      } catch (error) {
        setData({ ...data, isLoading: false });
        setInput({ user: {}, btnLogin: false });

        // Use SweetAlert2 for error alert
        Swal.fire({
          title: "Đăng nhập thất bại!",
          text: "Vui lòng kiểm tra lại thông tin đăng nhập.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#dc3545",
          background: "#ffffff",
          customClass: {
            title: 'alert-title',
            popup: 'alert-popup',
            confirmButton: 'alert-button',
          }
        });

        console.error(error);
      }
    };

    loginUser();
  }, [input.btnLogin, input.user.un, input.user.pw, navigate]);

  if (data.isLoading) {
    return <div>Đang đăng nhập...</div>;
  }

  return (
    <div className="login-container">
      <h2>ĐĂNG NHẬP</h2>
      <form onSubmit={submitForm}>
        <div className="input-group">
          <label htmlFor="username">Tên tài khoản</label>
          <input
            type="text"
            id="username"
            name="un"
            onChange={getInput}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="pw"
            onChange={getInput}
            required
          />
        </div>
        <button type="submit" disabled={data.isLoading}>Đăng nhập</button>
        <p className="signup-link">
          Bạn không có tài khoản? <a href="/signup">Đăng ký</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
