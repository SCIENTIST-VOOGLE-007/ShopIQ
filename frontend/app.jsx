import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Assistant from "./pages/Assistant"
import Dashboard from "./pages/Dashboard"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"



function App() {

  return (

    <Router>

      <div className="app-container">


        {/* NAVBAR */}

        <nav className="navbar">

          <div className="logo">
            ShopIQ
          </div>

          <div className="nav-links">

            <Link to="/">Home</Link>
            <Link to="/assistant">Assistant</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>

          </div>

        </nav>



        {/* ROUTES */}

        <div className="page-wrapper">

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />

          </Routes>

        </div>



        {/* STYLES */}

        <style jsx="true">{`

        .app-container{
          min-height:100vh;
        }


        /* NAVBAR */

        .navbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:20px 50px;

          backdrop-filter:blur(14px);
          background:rgba(255,255,255,0.05);
          border-bottom:1px solid rgba(255,255,255,0.1);

          position:sticky;
          top:0;
          z-index:10;
        }

        .logo{
          font-size:24px;
          font-weight:600;
          letter-spacing:1px;

          background:linear-gradient(90deg,#38bdf8,#a78bfa);
          -webkit-background-clip:text;
          color:transparent;
        }

        .nav-links{
          display:flex;
          gap:30px;
        }

        .nav-links a{
          text-decoration:none;
          color:white;
          font-size:15px;
          opacity:0.8;
          transition:0.3s;
        }

        .nav-links a:hover{
          opacity:1;
          transform:translateY(-2px);
        }


        /* PAGE WRAPPER */

        .page-wrapper{
          padding:40px 60px;
        }



        /* GLASS CARD */

        .glass-card{

          background:rgba(255,255,255,0.08);
          backdrop-filter:blur(16px);

          border-radius:16px;
          padding:30px;

          border:1px solid rgba(255,255,255,0.1);

          box-shadow:
          0 10px 30px rgba(0,0,0,0.3);
        }



        /* BUTTON */

        .btn-primary{

          padding:12px 28px;
          border:none;
          border-radius:30px;

          background:linear-gradient(90deg,#6366f1,#22d3ee);

          color:white;
          font-weight:500;

          cursor:pointer;

          transition:0.3s;
        }

        .btn-primary:hover{

          transform:translateY(-3px);
          box-shadow:0 8px 20px rgba(0,0,0,0.4);

        }



        /* PRODUCT CARD */

        .product-card{

          padding:20px;
          border-radius:14px;

          background:rgba(255,255,255,0.05);
          backdrop-filter:blur(12px);

          border:1px solid rgba(255,255,255,0.08);

          transition:0.3s;

        }

        .product-card:hover{

          transform:translateY(-6px);
          box-shadow:0 12px 30px rgba(0,0,0,0.4);

        }



        `}</style>



      </div>

    </Router>

  )
}

export default App