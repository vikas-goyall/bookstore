import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./component/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./Profile/Favourites";
import UserOrderHistory from "./Profile/UserOrderHistory";
import Settings from "./Profile/Settings";
import AllOrders from "./pages/AllOrders";
import Addbooks from "./pages/Addbooks";
import UpdateBook from "./pages/UpdateBook";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks/>}/>
        <Route path="/LogIn" element={<LogIn/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/profile" element={<Profile/>}>
        {role==="user" ? <Route index element={<Favourites/>}/> : <Route index element={<AllOrders/>}/>}
        {role==="admin" && (<Route path="/profile/add-book" element={<Addbooks/>}/>)}
        <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
        <Route path="/profile/settings" element={<Settings/>}/>
        </Route>
        <Route path="/updateBook/:id" element={<UpdateBook/>}/>
        <Route path="view-book-details/:id" element={<ViewBookDetails/>}/>
      </Routes>
      <Footer />
      </div>
  
  );
}

export default App;
