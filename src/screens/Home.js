import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Header from "../components/Header";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFooodCat] = useState([]);
  const [foodItem, setFooodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    // console.log(response[0],response[1]);
    setFooodItem(response[0]);
    setFooodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Header />

      {/* //Carosel part here */}

      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900×700/?burger"
              className="d-block w-100"
              style={{ filter: "brightness(30%" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?pizza"
              className="d-block w-100"
              style={{ filter: "brightness(30%" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?pasta"
              className="d-block w-100"
              style={{ filter: "brightness(30%" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* main body part */}

      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== []
                    ? foodItem
                        .filter(
                          (item) => (item.CategoryName === data.CategoryName) &&
                          (item.name.toLowerCase().includes(search.toLowerCase()))
                        ) 
                        .map((filterItems) => {
                          return (
                            <div
                              key={filterItems._id}
                              className="col-12 col-md-6 col-lg-3"
                            >
                              <Card
                                foodItem={filterItems}
                                options={filterItems.options[0]}
                              />
                            </div>
                          );
                        })
                    : ""}
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Home;
