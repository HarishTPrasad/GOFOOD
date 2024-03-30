import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const onChangeFunc = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
        location: credential.location,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
        <input
          name="name"
          value={credential.name}
          onChange={onChangeFunc}
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Full Name</label>
      </div>
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
      <div className="form-floating mb-3">
        <input
          name="location"
          value={credential.location}
          onChange={onChangeFunc}
          type="text"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label htmlFor="floatingPassword">Location</label>
      </div>
      <button type="submit" className="m-3 btn btn-outline-success">
        Submit
      </button>
      <Link to="/login" className="m-3 btn btn-outline-danger">
        Already a user?
      </Link>
    </form>
  );
};

export default SignUp;
