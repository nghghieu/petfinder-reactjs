import React from "react";

import ReactLoading from "react-loading";

const AppLoading = (props) => {
  const { type, color, size = "30px" } = props;

  return <ReactLoading type={type} color={color} height={size} width={size} />;
};

export default AppLoading;
