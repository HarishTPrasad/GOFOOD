import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Footer from './components/Footer';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import MyOrders from './screens/MyOrders';

function App() {
  return (
    <CartProvider>
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route exact path="/createuser" element={<SignUp/>}/> 
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/myorder" element={<MyOrders/>}/>
        </Routes>
        <Footer/>
    </Router>
    </CartProvider>
  );
}

export default App;
