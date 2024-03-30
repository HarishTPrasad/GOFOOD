import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';


const Card = (props) => {

  const img={
    height:"200px",
    objectFit:"contain"
  }
  let dispatch = useDispatchCart();
  const priceRef = useRef();
  let data = useCart();

    let options = props.options;
    let priceOption = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () =>{
      let food = [];
      for(const item of data){
        if(item.id === props.foodItem._id){
          food = item;

          break;
        }
      }
      if(food !== []){
        if(food.size === size){
          await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
          return
        }
      else if(food.size !== size){
        await dispatch({type:"ADD", id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size});
        return
      }
      return
    }
      await dispatch({type:"ADD", id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size});

      // console.log(data)
    }


    let finalPrice = qty * parseInt(options[size]);
    useEffect(()=>{
      setSize(priceRef.current.value)
    },[])
  return (
    <div
      className="rows bg-dark border-light text-white card mt-3"
      style={{ width: "18rem", maxHeight: "360px" }}
    >
      <img src={props.foodItem.img} style={img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className="container w-100">
          <select className="m-2 h-100  bg-success rounded" name="" id="" onChange={(e)=>{setQty(e.target.value)}}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <select className="m-2 h-100  bg-success rounded" ref={priceRef} name="" id="" onChange={(e)=>{setSize(e.target.value)}}>
            {
              priceOption.map((data)=>{
                return(
                  <option key={data} value={data}>{data}</option>
                )
              })
            }
          </select>

          <div className="d-inline h-100 fs-5">INR {finalPrice}/</div>
        </div>
        <hr />
        <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  )
}

export default Card
