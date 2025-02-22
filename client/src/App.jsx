import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import Authlogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminOrders from './pages/admin-view/orders';
import AdminProducts from './pages/admin-view/products';
import AddBarCode from './pages/admin-view/AddBarCode';

import ShoppingLayout from './components/shopping-view/layout';
import NotFound from './pages/notfound';
import ShoppingHome from './pages/shopping-view/Home';
import ShoppingListing from './pages/shopping-view/listing';
import SearchProducts from './pages/shopping-view/search';
import RFID from './pages/shopping-view/RFID';
import ShoppingCheckout from './pages/shopping-view/checkout';
import BookSuggestions from './pages/shopping-view/rule';
import ShoppingTour from './pages/shopping-view/tour';
import ShoppingAccount from './pages/shopping-view/account';
import ShoppingAbout from './pages/shopping-view/about';
import VenueBooking from './pages/shopping-view/VenueBooking';
import CheckAuth from './components/common/check-auth';
import UnAuth from './pages/un-auth/un-auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';

import { Skeleton } from "./components/ui/skeleton"

function App() {
 

  const {isAuthenticated,user,isLoading} =useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
   dispatch(checkAuth()) 
  },[dispatch]);

  if(isLoading){
    return(
      <Skeleton className="w-[800px] h-[600px] bg-black" />

    )
  }
  return (
   <div className="flex flex-col overflow-hidden bg-white">
   
    <Routes>
      <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout/></CheckAuth>}>
      <Route path="login" element={<Authlogin/>}></Route>
      <Route path="register" element={<AuthRegister/>}></Route>
      </Route>

      <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}>
      <Route path="dashboard" element={<AdminDashboard/>}></Route>
      <Route path="layout" element={<AdminLayout/>}></Route>
      <Route path="products" element={<AdminProducts/>}></Route>
      <Route path="orders" element={<AdminOrders/>}></Route>
      <Route path="AddBarCode" element={<AddBarCode/>}></Route>
      
      </Route>


      <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout/></CheckAuth>}> 
      <Route path='home' element={<ShoppingHome/>}> </Route>
      <Route path='listing' element={<ShoppingListing/>}> </Route>
      <Route path="search" element={<SearchProducts />} />
      <Route path='checkout' element={<ShoppingCheckout/>}> </Route>
      <Route path='account' element={<ShoppingAccount/>}> </Route>
      <Route path='suggestions' element={<BookSuggestions/>}> </Route>
      <Route path='tour' element={<ShoppingTour/>}> </Route>
      <Route path='VenueBooking' element={<VenueBooking/>}> </Route>
      <Route path='RFID' element={<RFID/>}> </Route>
      <Route path='about' element={<ShoppingAbout/>}> </Route>
      </Route>
      <Route path="/unauth-page" element={<UnAuth/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>

    
   </div>
  )
}

export default App
