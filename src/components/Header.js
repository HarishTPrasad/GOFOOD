import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "../components/ContextReducer";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const handleLogOut = () =>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }



  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-4"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-4"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-success mx-1 fs-5"
                  aria-current="page"
                  to="/createuser"
                >
                  Sign Up
                </Link>
                <Link
                  className="btn bg-white text-success mx-1 fs-5"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-1 fs-5" onClick={()=>{setCartView(true)}}>
                  <ShoppingCartIcon/> {" "}
                      <Badge pill bg='danger'>{data.length}</Badge>
                  
                </div>
                {cartView? <Modal onClose={()=>{setCartView(false)}}><Cart/></Modal>: null}
                <div className="btn bg-white text-danger mx-1 fs-5" onClick={handleLogOut}>
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
