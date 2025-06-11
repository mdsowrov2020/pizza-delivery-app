import { Link } from "react-router-dom";

const Button = ({ children, variation = "", onClick, to, disabled }) => {
  if (to)
    return (
      <Link to={to} className={`ui ${variation}`}>
        {children}
      </Link>
    );
  return (
    <button className={`ui ${variation}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
