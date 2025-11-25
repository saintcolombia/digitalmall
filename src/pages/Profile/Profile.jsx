import React, { useEffect, useState } from "react";
import { useStore } from "../../store/useStore";
import { bookingsAPI } from "../../utils/api";

export default function Profile(){
  const user = useStore(s => s.user);
  const [bookings, setBookings] = useState([]);

  useEffect(()=>{
    if (!user || !user._id) return;
    (async ()=>{
      const res = await bookingsAPI.getForUser(user._id);
      setBookings(res || []);
    })();
  },[user]);

  if (!user) return <div className="app-container"><div className="card">Please login to see your profile.</div></div>;

  return (
    <div className="app-container">
      <h2 className="h2">Profile</h2>
      <div className="card">
        <div><strong>{user.name || user.email}</strong></div>
        <div className="small muted">{user.email}</div>
      </div>

      <h3 className="h2" style={{marginTop:18}}>Bookings</h3>
      {bookings.length===0 ? <div className="card small muted">No bookings yet.</div> : bookings.map(b=>(
        <div className="card" key={b._id} style={{marginBottom:10}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div>
              <strong>{b.serviceName}</strong>
              <div className="small muted">Status: {b.status}</div>
            </div>
            <div>{b.total ? `R${b.total}` : ""}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
