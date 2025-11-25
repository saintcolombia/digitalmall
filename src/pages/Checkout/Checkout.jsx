import React, { useState } from "react";
import { useStore } from "../../store/useStore";
import { paymentsAPI } from "../../utils/api";
import { luhnCheck, expiryValid } from "../../utils/card";
import { useNavigate } from "react-router-dom";

export default function Checkout(){
  const { cart, user, clearCart } = useStore();
  const total = cart ? cart.totalZAR : 0;
  const nav = useNavigate();

  const [cardNumber,setCardNumber] = useState("");
  const [expiry,setExpiry] = useState("");
  const [cvv,setCvv] = useState("");
  const [loading,setLoading] = useState(false);

  const pay = async () => {
    if (!user || !user._id) return alert("Please login before checkout.");
    if (!luhnCheck(cardNumber)) return alert("Invalid card number (Luhn).");
    if (!expiryValid(expiry)) return alert("Card expired or invalid expiry.");
    if (!cvv || cvv.length < 3) return alert("Invalid CVV.");

    setLoading(true);
    try {
      const res = await paymentsAPI.pay({
        userId: user._id,
        cart: cart.items,
        total,
        cardNumber
      });
// ready for deploy
      if (res.message) {
        // clear cart and then navigate
        clearCart();
        alert("Payment completed. Receipt sent to your email.");
        nav("/"); // back to home
      } else {
        alert(res.error || "Payment failed.");
      }
    } catch (e) {
      console.error(e);
      alert("Server error during payment.");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return <div className="app-container"><div className="card">Your cart is empty</div></div>;
  }

  return (
    <div className="app-container">
      <h2 className="h2">Checkout</h2>
      <div style={{display:"grid", gridTemplateColumns:"1fr 380px", gap:20}}>
        <div className="card">
          <h3 className="h2">Payment</h3>
          <input className="input" placeholder="Card number" value={cardNumber} onChange={e=>setCardNumber(e.target.value)} />
          <input className="input" placeholder="MM/YYYY" value={expiry} onChange={e=>setExpiry(e.target.value)} />
          <input className="input" placeholder="CVV" value={cvv} onChange={e=>setCvv(e.target.value)} />
          <button className="btn" onClick={pay} disabled={loading}>{loading? "Processing..." : `Pay R${total}`}</button>
        </div>

        <div className="card">
          <h3 className="h2">Order Summary</h3>
          {cart.items.map((it,i)=>(
            <div key={i} style={{marginBottom:10}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <div>{it.name}</div>
                <div>R{it.price}</div>
              </div>
            </div>
          ))}
          <div style={{borderTop:"1px solid rgba(0,0,0,0.06)", paddingTop:10}}>
            <strong>Total</strong>
            <div style={{fontSize:18,fontWeight:700}}>R{total}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
