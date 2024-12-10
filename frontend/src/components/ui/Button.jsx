import React from "react";

const Button = ({ className, children, type = "button", onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
    >
      {children}
    </button>
  );
};
export default Button;