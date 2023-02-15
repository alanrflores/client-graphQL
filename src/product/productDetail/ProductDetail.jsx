import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper";
import { CartContext } from "../../context/CartContextProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import toast, { Toaster } from "react-hot-toast";
import UpdateProductForm from "../updateProduct/UpdateProductForm";
import "./product-detail.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetail = ({ product, showProduct }) => {
  const { addItem, items, setItems } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const { stock } = product;
  //se desplaza a la parte superior de la pagina
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    goToTop();
  }, []);

  let item = product && {
    ...product,
    quantity,
  };

  const byAddingCart = () => {
    if (stock <= 0 || quantity <= 0) {
      toast.error('No hay stock disponible para este producto',{
        duration: 2000,
        position: 'top-center',
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }
    addItem(item);
    
  };

  const sumQuantity = () => {
    if (stock - 1 > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const restQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const resultStorage = JSON.parse(localStorage.getItem("data"));

  return (
    <>
      <div className="container-product-detail">
        <Swiper
          style={{
            "--swiper-navigation-color": "black",
            "--swiper-navigation-size": "1.1rem",
          }}
          loop={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={16}
          navigation={true}
          modules={[Navigation, Autoplay, Pagination]}
          grabCursor={true}
          effect={"coverflow"}
          coverflow={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          className="product-images-slider"
        >
          {product?.images?.map((item, index) => (
            <SwiperSlide key={index} className="swiper-product">
              <img
                src={item?.url}
                alt="product-image"
               
              />
              <div style={{ padding: 6 }}>
                <span style={{ color: "gray" }}>Disponibles: {stock}</span>
              </div>
              <hr />
              <span style={{ padding: 10, color: "gray", marginTop: 10 }}>
                Cantidad
              </span>
              <div className="btn-buy">
                <RemoveCircleIcon onClick={() => restQuantity()} />
                <span style={{ color: "gray", padding: 4 }}>{quantity}</span>
                <AddCircleIcon onClick={() => sumQuantity()} />
                <div></div>
              </div>
              <button
                style={{ padding: 6, color: "gray", marginTop: 4 }}
                onClick={() => byAddingCart(item)}
              >
                Comprar ahora
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="div-container-title">
          <h2>{product?.title}</h2>
          <div className="div-description">
            <label>Precio original </label>
            <span>USD {product?.price}</span>
            <hr />
            <label>Descripción </label>
            <span>{product?.description}</span>
          </div>
        </div>
        <button
          style={{
            marginBottom: 10,
            padding: 8,
            backgroundColor: "Gainsboro",
            border: 0,
            borderRadius: 6,
            fontFamily: "monospace",
          }}
          onClick={() => showProduct(null)}
        >
          Cerrar
        </button>
        <Toaster />
      </div>
      <hr />
      {resultStorage?.loginUser?.role === "ADMIN" ? (
        <UpdateProductForm productId={product.id} product={product} />
      ) : (
        ""
      )}
    </>
  );
};

export default ProductDetail;
