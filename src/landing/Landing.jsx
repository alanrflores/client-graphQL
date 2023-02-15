import React, { useEffect } from "react";
import ProductImageSlider from "../product/productImageSlider/ProductImageSlider";
import { productImages } from "../assets";
import { Link } from "react-router-dom";
import Register from "../user/register/Register";
import "./landing.css";
import Login from "../user/login/Login";
import { UseAuth } from "../useAuth/UseAuth.jsx";
import { motion } from 'framer-motion';
import { useState } from "react";

const Landing = () => {
  // const client = useApolloClient();
  const { userData, setUserData, logout } = UseAuth();
  const result = JSON.parse(localStorage.getItem("data"));
  const [animation, setAnimation] = useState(false);
 
  useEffect(() => {
     if(!result) {
      setUserData(result)
     }
  },[]);

  // console.log('user', userData)
  return (
    <div>
      <div>
        {productImages?.length > 0 && (
          <ProductImageSlider images={productImages} />
        )}
      </div>
      <div>
        <h1 style={{ marginTop: 50, color: "gray" }}>
         Todas nuestras zapatillas disponibles.
        </h1>
        <img
          src="https://i.pinimg.com/originals/53/4b/3d/534b3d306b597e6c19291686b5e04033.png"
          width="50px"
          heigth="50px"
          alt=""
        />
      </div>
      <motion.div 
       className="containerImg"
       drag
       dragConstraints={{
        right: 20
       }}
       whileHover={{
        scale: 1
       }}
       whileTap={{
        scale: 0.4
       }}
       >
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1184,c_limit/957a33a3-83b5-4c7d-a482-c2e41005f3f1/marca-jordan.png"
          alt="nike-jordan"
          width="100%"
          heigth="100%"
          style={{ borderRadius: "10px" }}
        />
      </motion.div>
      <motion.div 
       className="containerImg"
       drag
       dragConstraints={{
        right: 20
       }}
       whileHover={{
        scale: 1
       }}
       whileTap={{
        scale: 0.4
       }}
       >
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1184,c_limit/22953560-c7db-4617-ae29-cebb6a59a799/marca-jordan.jpg"
          alt="nike-jordan"
          width="100%"
          heigth="100%"
          style={{ borderRadius: "10px" }}
        />
      </motion.div>
      <div className="titleReleases">
        <h2 style={{ fontFamily: "Futura", color: "gray", fontSize: "24px" }}>
         Últimos lanzamientos.
        </h2>
      </div>
      <div className="containerImgPar">
        <div className="divImgPar">
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1184,c_limit/9121b388-0658-4c84-a451-09a373d599d7/nike-sportswear.png"
            alt="nike-zero"
            width="100%"
            heigth="100%"
            style={{  borderRadius: "10px", zIndex: 1 }}
          />
          <div className="divCraterbtn">
            <button className="buttonCrater">Ver más</button>
          </div>
        </div>
        <h4 className="textImPar">CRATER IMPACT</h4>
        <div className="divImgParTwo">
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1184,c_limit/85b1cd26-23ff-44a1-80b6-360ce24cf5ed/nike-sportswear.jpg"
            alt="nike-jordan"
            width="100%"
            heigth="100%"
            style={{ borderRadius: "10px" }}
          />
        </div>
      </div>
      <div className="containerTitle">
        <h2 style={{ fontFamily: "Futura", color: "gray", fontSize: 24 }}>
        El lugar ideal para encontrar tus zapatillas.
        </h2>
      </div>
      <div className="divButton">
        <Link to="/home">
          <button className="buttonSeeMore">Ver más</button>
        </Link>
      </div>
      { result ? (
        <h1 style={{ color: "gray", padding: 30, fontFamily: "futura" }}>
          Hola, {result?.loginUser?.username} disfruta de nuestros productos.
        </h1>
      ) : (
        <>
          <h1
            style={{
              marginTop: 60,
              color: "gray",
              padding: 20,
              fontFamily: "Futura",
              fontSize: 24,
            }}
          >
            Inicia sesión para ver nuestros productos.
          </h1>
          <div className="container-form">
            <Login />
            <Register />
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
