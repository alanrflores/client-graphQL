import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContextProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { CREATE_PAYMENT } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import toast, { Toaster } from 'react-hot-toast';
import ReactLoading from 'react-loading';
import "./cart.scss";

const Cart = () => {
  const { cart, total, clearItem } = useContext(CartContext);
  const [createPayment, { data, loading, error }] = useMutation(CREATE_PAYMENT);

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

  const result = localStorage.getItem("dataCart");
  const product = JSON.parse(result);
  const handleSubmit = async (productIds, quantities) => {
    
    try {
      const { data } = await createPayment({
        variables: { productIds, quantities },
      });
      console.log("data", data.createPayment);
      localStorage.setItem('payment', JSON.stringify(data))
      window.location.href = data.createPayment.init_point;
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <div className="container-loading-cart">
              <ReactLoading type={"spokes"} color={"black"} height={40} width={40} />
           </div>;
  }
    
    
    const id = product?.map((item) => item.id)
    const quantity = product?.map((item) => item.quantity)
    // console.log(id)
    
  return (
    <div className="container-padre-cart">
      <div className="container-cart">
        {cart.length === 0 ? (
          <>
            <div className="cart-empty">
              <div className="cart-empty-items">
              <h2>Vacío</h2>
              <p>No hay artículos en su carrito.</p>
              <div className="button-empty">
                <Link to={"/home"}>
                  <button>Buscar ahora</button>
                </Link>
              </div>
              </div>
            </div>
            <div className="div-image">
            <img src="https://i.pinimg.com/474x/b1/e1/7c/b1e17c62658ececa20f2c9061e98d1bc.jpg" alt="" />
            </div>
            <div className="div-image2">
              <img
                src="https://static.nike.com/a/images/mlsqoply7sjsmpjxyi1x/air-jordan-7.png"
                alt=""
              />
            </div>
            <div className="div-image2">
              <img
                src="https://static.nike.com/a/images/uowcecixzq4be7y3j11g/air-jordan-12.png"
                alt=""
              />
            </div>
          </>
        ) : (
           
           cart?.map((item, index) => {
            const findImage = item?.images?.find((firstImg) => firstImg);
            let itemQuantity = item.quantity;
            let quantityInt = parseInt(itemQuantity, 10);
            let newItem = {
              ...item,
              quantity: quantityInt,
            };
            // console.log("newItem", newItem);
            return (
              <div key={index} className="container-cart-map">
                <div className="cart-product">
                  <div className="cart-detail">
                    <img src={findImage?.url} alt="image-not-found" />
                    <div className="cart-description">
                      <div className="cart-div">
                        <h2>{newItem.title}</h2>
                        <span>USD {newItem.price * newItem.quantity}</span>
                      </div>
                      <div style={{ padding: 6 }}>
                        <span style={{ color: "gray" }}>
                          Cantidad: {newItem.quantity}
                        </span>
                        <hr />
                      </div>

                      <div className="icon-div">
                        <DeleteIcon
                          className="delete-icon"
                          onClick={() => clearItem(newItem.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )
        }
        {
                  total ?  (
                    <div className="buttonCart">
                         <span style={{ margin: 10}}> <span style={{ fontWeight: "bold"}}>Total:</span>  USD {total}</span>
                      <button
                        onClick={() => handleSubmit(id, quantity)}
                      >
                        Confirmar
                      </button>
                    </div>
                  ) : ( "" )
                }
      </div>
    </div>
  );
};

export default Cart;
