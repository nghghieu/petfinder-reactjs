import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

import api from "../../api/api";

import Card from "../../components/AppPetCard/Card";

import { login, logout } from "../../redux/loginSlice";

export default function Home() {
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    type: "dog",
    page: 1,
  });

  const Example = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={"30px"} width={"30px"} />
  );

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.login.access_token);

  const { innerWidth: width } = window;
  const typeList = ["dog", "cat", "rabbit", "Horse", "Bird"];

  let pageList;

  if (width < 767) {
    pageList = ["1", "2", "3"];
  } else {
    pageList = ["1", "2", "3", "4", "5", "6"];
  }

  const onLogout = () => {
    dispatch(logout());
  };

  const onPressNextPage = () => {
    setParams({
      ...params,
      page: params.page + 1,
    });
  };

  const onPressPrevPage = () => {
    if (params.page === 1) {
      return null;
    } else {
      setParams({
        ...params,
        page: params.page - 1,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (!accessToken) {
      const apiKey = localStorage.getItem("apiKey");
      const secretKey = localStorage.getItem("secretKey");
      axios({
        method: "post",
        url: `${api.BASE_URL}`,
        data: {
          grant_type: "client_credentials",
          client_id: apiKey,
          client_secret: secretKey,
        },
      }).then((res) => {
        const { data } = res;
        dispatch(login(data.access_token));
        setLoading(false);
      });
    } else {
      const instance = axios.create({
        baseURL: `${api.BASE_URL_ANIMALS}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      instance
        .get("", {
          params,
        })
        .then((res) => {
          const { data } = res;
          setLoading(false);
          setPetList(data.animals);
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, accessToken, params]);

  return (
    <div className="home">
      <div className="container">
        {/* ==== Header ====*/}
        <div className="header">
          <div className="header-logo">
            <span>Pet'Finder</span>
          </div>

          <div className="nav">
            <span onClick={onLogout}>Đăng xuất</span>
          </div>
        </div>

        {/* ==== Type ====*/}
        <div className="type-container">
          {typeList.map((type, idx) => {
            const className = params.type === type ? "active" : "";
            const onPressType = () => {
              if (className === "active") {
                return null;
              }
              setParams({
                type: type,
                page: 1,
              });
            };

            return (
              <span key={idx} className={className} onClick={onPressType}>
                {type}
              </span>
            );
          })}
        </div>

        {/* ==== Content ====*/}
        <div className="content">
          {loading ? (
            <div className="loading-container">
              <Example type="spin" color="black" />
            </div>
          ) : (
            <div className="content-container">
              <div className="content-row">
                {petList.map((item) => {
                  return <Card key={item.id} item={item} />;
                })}
              </div>
            </div>
          )}
        </div>

        {/* ==== Pagination ====*/}
        <div className="pagination">
          <div className="pagination-container">
            <div className="btnPrev" onClick={onPressPrevPage}>
              <img
                src="https://cdn-icons-png.flaticon.com/24/120/120892.png"
                alt="left-chevron"
              />
            </div>

            {pageList.map((page, idx) => {
              const className = params.page.toString() === page ? "active" : "";

              const onPressPage = () => {
                if (className === "active") return null;
                setParams({
                  ...params,
                  page: Number(page),
                });
              };

              return (
                <span key={idx} className={className} onClick={onPressPage}>
                  {page}
                </span>
              );
            })}

            {params.page > pageList.length && (
              <>
                <span>...</span>
                <span className="active">{params.page}</span>
              </>
            )}

            <div className="btnNext" onClick={onPressNextPage}>
              <img
                src="https://cdn-icons-png.flaticon.com/24/120/120893.png"
                alt="right-chevron"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
