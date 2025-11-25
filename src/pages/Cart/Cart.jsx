import React from "react";
import { useStore } from "../../store/useStore";
import { Link, useNavigate } from "react-router-dom";

export default function Cart(){
  const { cart, removeFromCart } = useStore();
  const nav = useNavigate();
  const total = cart ? cart.totalZAR : 0;

  return (
    <div className="app-container">
      <h2 className="h2">Your Cart</h2>
      {(!cart || !cart.items || cart.items.length===0) ? (
        <div className="card">Your cart is empty. <Link to="/services">Browse services</Link></div>
      ) : (
        <div style={{display:"grid", gridTemplateColumns:"2fr 320px", gap:20}}>
          <div>
            {cart.items.map((it, idx)=>(
              <div className="card" key={idx} style={{marginBottom:12}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div>
                    <h3 style={{margin:0}}>{it.name}</h3>
                    <div className="small muted">R{it.price} • {it.address}</div>
                  </div>
                  <div>
                    <button className="btn" onClick={()=>removeFromCart(idx)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="h2">Summary</h3>
            <div className="small muted">Total</div>
            <div style={{fontSize:22,fontWeight:700}}>R {total}</div>
            <button className="btn" style={{marginTop:12}} onClick={()=>nav("/checkout")}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
