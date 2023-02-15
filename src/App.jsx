import "@fontsource/roboto/500.css";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
// import ProductForm from "./product/ProductForm";
import Landing from "./landing/Landing";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import "./App.scss";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import Cart from "./cart/Cart";
import Success from "./success/Success";

function App() {
  // const routes = [
  //   {
  //     path: "/",
  //     component: Landing,
  //   },
  //   {
  //     path: "/home",
  //     component: Home,
  //   },
  //   {
  //     path: "/about",
  //     component: ProductForm,
  //   },
  // ];
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
