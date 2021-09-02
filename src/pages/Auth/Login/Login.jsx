import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import api from "../../../api/api";

import AppInput from "../../../components/AppInput/AppInput";
import AppLoading from "../../../components/AppLoading/AppLoading";

import { checkLogin, login } from "../../../redux/loginSlice";

function Login() {
  const [state, setState] = useState({
    apiKey: "",
    secretKey: "",
    error: "",
    isLoading: false,
  });

  const dispatch = useDispatch();

  const fetchApi = async (apiKey, secretKey) => {
    setState({ ...state, isLoading: true });
    console.log(state);
    axios({
      method: "post",
      url: `${api.BASE_URL}`,
      data: {
        grant_type: "client_credentials",
        client_id: apiKey,
        client_secret: secretKey,
      },
    })
      .then((res) => {
        const { data } = res;
        localStorage.setItem("apiKey", apiKey);
        localStorage.setItem("secretKey", secretKey);
        dispatch(login(data.access_token));
        dispatch(checkLogin(true));
        setState({ ...state, isLoading: false });
      })
      .catch(() =>
        setState({
          ...state,
          error: "Lỗi đăng nhập.",
          isLoading: false,
        })
      );
  };

  const onChangeApiKey = (val) => {
    setState({
      ...state,
      apiKey: val.target.value,
      error: "",
    });
  };
  const onChangeSecretKey = (val) => {
    setState({
      ...state,
      secretKey: val.target.value,
      error: "",
    });
  };

  const onSubmit = () => {
    if (state.apiKey !== "" && state.secretKey !== "") {
      fetchApi(state.apiKey, state.secretKey);
    } else {
      setState({
        ...state,
        error: " Bạn cần phải nhập Api Key hoặc Secret Key ",
      });
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="box-container">
          <div className="image-container">
            <img
              src="https://img.freepik.com/free-vector/cute-dog-cat-friend-cartoon_138676-2432.jpg?size=338&ext=jpg&ga=GA1.2.2104465169.1630195200"
              alt="logo"
            />
          </div>

          <AppInput onChange={onChangeApiKey} value={state.apiKey} />

          <AppInput
            title="Nhập vào Secret-Key"
            name="apiKey"
            placeholder="Secret Key"
            onChange={onChangeSecretKey}
            value={state.secretKey}
          />

          <div className="btn" onClick={onSubmit}>
            <span>Đăng Nhập</span>
            {state.isLoading && (
              <AppLoading type="spin" color="#fff" size={20} />
            )}
          </div>

          {state.error && <span className="txtError">{state.error}</span>}
        </div>
      </div>
    </div>
  );
}

export default Login;
