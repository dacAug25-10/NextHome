import { useState } from "react";
import "../../css/TenantDashboard.css";

const PG_LIST = [
  {
    id: 1,
    name: "NextHome Elite PG",
    location: "Bangalore",
    sharing: "1, 2, 3 Sharing",
    rent: "₹9,500",
    owner: "Ramesh Kumar",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    id: 2,
    name: "Comfort Stay PG",
    location: "Pune",
    sharing: "2, 3 Sharing",
    rent: "₹8,000",
    owner: "Anita Sharma",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
  },
  {
    id: 3,
    name: "Skyline PG",
    location: "Hyderabad",
    sharing: "1, 2 Sharing",
    rent: "₹10,000",
    owner: "Vikram Singh",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1560185008-5c1f6d4f6b90",
  },
  {
    id: 4,
    name: "Urban Nest PG",
    location: "Mumbai",
    sharing: "2, 3 Sharing",
    rent: "₹11,000",
    owner: "Amit Patel",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    id: 5,
    name: "Blue Moon PG",
    location: "Chennai",
    sharing: "1 Sharing",
    rent: "₹12,000",
    owner: "Suresh Rao",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
  {
    id: 6,
    name: "Green Leaf PG",
    location: "Noida",
    sharing: "2 Sharing",
    rent: "₹7,500",
    owner: "Neha Verma",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
  },
  {
    id: 7,
    name: "Sunrise PG",
    location: "Delhi",
    sharing: "1, 2 Sharing",
    rent: "₹9,000",
    owner: "Rohit Mehta",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
  {
    id: 8,
    name: "City View PG",
    location: "Indore",
    sharing: "2, 3 Sharing",
    rent: "₹7,800",
    owner: "Kunal Jain",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
  },
  {
    id: 9,
    name: "Royal Stay PG",
    location: "Jaipur",
    sharing: "1 Sharing",
    rent: "₹10,500",
    owner: "Manoj Joshi",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  },
  {
    id: 10,
    name: "Smart Living PG",
    location: "Ahmedabad",
    sharing: "2 Sharing",
    rent: "₹8,200",
    owner: "Pooja Shah",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  },

  /* -------- NEW 15 PGs -------- */

  {
    id: 11,
    name: "Lake View PG",
    location: "Bhopal",
    sharing: "1, 2 Sharing",
    rent: "₹8,500",
    owner: "Arjun Malhotra",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2b8f",
  },
  {
    id: 12,
    name: "Metro Living PG",
    location: "Gurgaon",
    sharing: "2, 3 Sharing",
    rent: "₹9,200",
    owner: "Sonal Gupta",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
  },
  {
    id: 13,
    name: "Peace Home PG",
    location: "Udaipur",
    sharing: "1 Sharing",
    rent: "₹7,000",
    owner: "Rajat Sharma",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: 14,
    name: "Elite Stay PG",
    location: "Surat",
    sharing: "2 Sharing",
    rent: "₹8,800",
    owner: "Mehul Shah",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1572120360610-d971b9b78827",
  },
  {
    id: 15,
    name: "Green Residency PG",
    location: "Nagpur",
    sharing: "1, 2, 3 Sharing",
    rent: "₹7,600",
    owner: "Pankaj Verma",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 16,
    name: "Silver Oak PG",
    location: "Vadodara",
    sharing: "2 Sharing",
    rent: "₹8,100",
    owner: "Kiran Desai",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
  },
  {
    id: 17,
    name: "Hill View PG",
    location: "Shimla",
    sharing: "1 Sharing",
    rent: "₹9,800",
    owner: "Anup Negi",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599423300746-b62533397364",
  },
  {
    id: 18,
    name: "Ocean Breeze PG",
    location: "Vizag",
    sharing: "2, 3 Sharing",
    rent: "₹8,900",
    owner: "Srinivas Rao",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
  {
    id: 19,
    name: "Tech Park PG",
    location: "Bangalore",
    sharing: "2 Sharing",
    rent: "₹9,300",
    owner: "Deepak Nair",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
  {
    id: 20,
    name: "Comfort Zone PG",
    location: "Kochi",
    sharing: "1, 2 Sharing",
    rent: "₹8,700",
    owner: "Joseph Mathew",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8",
  },
];


export default function TenantDashboard() {
  const [selectedPG, setSelectedPG] = useState(null);
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const filteredPGs = PG_LIST.filter(pg =>
    pg.name.toLowerCase().includes(search.toLowerCase()) ||
    pg.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">🏠 NextHome</div>

        <div className="nav-center">
          <input
            className="search-box"
            placeholder="Search PG or City"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="nav-right">
          <button onClick={() => setShowNotif(!showNotif)}>🔔</button>
          <button onClick={() => setShowProfile(!showProfile)}>👤</button>
        </div>

        {showNotif && (
          <div className="dropdown notif">
            <p>🔔 No new notifications</p>
          </div>
        )}

        {showProfile && (
          <div className="dropdown profile">
            <p>My Profile</p>
            <p>Bookings</p>
            <p className="logout">Logout</p>
          </div>
        )}
      </div>

      {/* PG CARDS */}
      <div className="card-container">
        {filteredPGs.map(pg => (
          <div key={pg.id} className="pg-card" onClick={() => setSelectedPG(pg)}>
            <img src={pg.image} alt={pg.name} />
            <div className="pg-info">
              <h3>{pg.name}</h3>
              <p>📍 {pg.location}</p>
              <p>⭐ {pg.rating}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedPG && (
        <div className="modal-overlay" onClick={() => setSelectedPG(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2>{selectedPG.name}</h2>
            <p><b>Location:</b> {selectedPG.location}</p>
            <p><b>Owner:</b> {selectedPG.owner}</p>
            <p><b>Rent:</b> {selectedPG.rent}</p>
            <p><b>Sharing:</b> {selectedPG.sharing}</p>
            <p><b>Rating:</b> {selectedPG.rating}</p>
            <div className="modal-buttons">
              <button className="book">Book PG</button>
              <button className="pay">Pay Now</button>
            </div>
            <button className="close" onClick={() => setSelectedPG(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
