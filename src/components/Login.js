import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { GlobalContextApi } from "../customHooks/useContextApi";

const Login = () => {

  const {userLogin} = useContext(GlobalContextApi)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoadingApi, setLoadingApi] = useState(false);

  let navigate = useNavigate()

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user && user.token){
      navigate("/")
      toast.info("You were login!")
    }
  })

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required!");
      return;
    }

    setLoadingApi(true)

    let response = await loginApi(email, password);

    if (response && response.token) {
      userLogin(email, response.token)
      navigate("/");
    } else {
      if (response && response.status === 400) {
        toast.error(response.data.error);
      }
    }

    setLoadingApi(false)
  };

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <p>
          <span>Test email: eve.holt@reqres.in</span>
          <br />
          <span>Test password: cityslicka</span>
        </p>
        <input
          type="text"
          placeholder="Email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-with-icon">
          <input
            type={isShowPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={
              isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>

        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={handleLogin}
        >
          {isLoadingApi &&  <i className="fas fa-spinner fa-pulse"></i>}
          &nbsp;Login
        </button>
        <div className="back">
          <Link to="/" className="text-dark back-btn-content">
            <i className="fa-solid fa-circle-chevron-left"></i>
            <span className="mrl-4">Go back</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
