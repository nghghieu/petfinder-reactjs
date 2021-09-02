import React from "react";

export default function AppInput(props) {
  const {
    value,
    title = "Nhập vào Api-Key",
    type = "text",
    name = "apiKey",
    placeholder = "Api Key",
    onChange,
  } = props;

  return (
    <div className="form-group">
      <p>{title}</p>
      <input
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
