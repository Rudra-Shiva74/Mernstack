import './App.css';
import Navbar from './Component/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Product from './Component/Product';
import Addproduct from './Component/Addproduct';
import Footer from './Component/Footer';
import SignUp from './Component/SignUp';
import PrivateComponent from './Component/PrivateComponent';
import Login from './Component/Login';
import Home from './Component/Home';
import Profile from './Component/Profile';
import UpdateProduct from './Component/UpdateProduct';
function App() {
  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route element={<PrivateComponent />}>
            <Route exact path="/product" element={<Product />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/add-product" element={<Addproduct />} />
            <Route exact path="/updateproduct/:id" element={<UpdateProduct />} />
          </Route>

          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router >
  );
}

export default App;
