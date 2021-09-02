import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/Login/Login";
import Home from "./pages/Home/Home";
import { checkLogin } from "./redux/loginSlice";

function App() {
  const isLogin = useSelector((state) => state.login.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(checkLogin(true));
    }
  }, [dispatch]);

  return (
    <Router>
      <Route path="/">{isLogin ? <Home /> : <Login />}</Route>
    </Router>
  );
}

export default App;
