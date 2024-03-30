import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate()

  const onChangeFunc = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credential.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/")
    }
  };
  return (
    <>
      <form className="container mt-3" onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
        <input
          name="email"
          value={credential.email}
          onChange={onChangeFunc}
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input
          name="password"
          value={credential.password}
          onChange={onChangeFunc}
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button type="submit" className="m-3 btn btn-outline-success">
        Login
      </button>
      <Link to="/createuser" className="m-3 btn btn-outline-danger">
        Don't have Account?
      </Link>
    </form>
    </>
  )
}

export default Login
