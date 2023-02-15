import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FIND_PRODUCT } from "../../graphql/queries";
import UpdateProductForm from "../updateProduct/UpdateProductForm";
import ProductDetail from "../productDetail/ProductDetail";
import ProductForm from "../productForm/ProductForm";
import Paginated from "../../paginated/Paginated";
import "./all-product.scss";

const AllProduct = ({ products, itemPerPage, paginated, items }) => {
  const [getProduct, result] = useLazyQuery(FIND_PRODUCT);
  const [product, setProduct] = useState(null);

  const showProduct = (id) => {
    getProduct({ variables: { findProductId: id } });
  };

  useEffect(() => {
    if (result?.data) {
      setProduct(result?.data?.findProduct);
    }
  }, [result]);

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

  const resultStorage = JSON.parse(localStorage.getItem("data"));

  if (product) {
    return (
      <div className="produc-detail-container">
        <ProductDetail 
        product={product}
        showProduct={showProduct} />
      </div>
    );
  };
  
  if (products === null) return null;
  
  return (
    <>
      <div className="container-product">
        <h1>ZAPATILLAS EXCLUSIVAS</h1>
        {resultStorage.loginUser.role === "ADMIN" ? <ProductForm /> : ""}

        <section className="div-product">
          {
            products?.map((p) => (
              <div
                key={p.id}
                onClick={() => showProduct(p.id)}
                style={{ color: "violet" }}
                className="div-product-info"
              >
                <img
                  src={p?.images[0]?.url}
                  alt="product-image"
                  width="220px"
                  height="140px"
                />
                <h3
                  style={{
                    color: "black",
                    fontWeight: "bolder",
                    fontSize: 12,
                    fontFamily: "monospace",
                  }}
                >
                  {p.title}
                </h3>
              </div>
            ))
          }
        </section>
        <div className="paginated-container">
          <Paginated
            itemPerPage={itemPerPage}
            paginated={paginated}
            items={items}
          />
        </div>
        
        <section className="section-img">
          <div className="div-title-img">
            <h1 className="title-img">AJ XXXIII Vault</h1>
            <div className="img-design">
              <img
                src="https://static.nike.com/a/images/wd2uvykayfkh0gxthn3g/ejection.jpg"
                alt=""
              />
            </div>
          </div>
          <hr />
          <div className="div-title-img-two">
            <h1 className="title-img">JORDAN 2023</h1>
            <div className="img-design-two">
              <img
                src="https://static.nike.com/a/images/b4192f12-cfc5-401c-94d8-0c3c5c3672ba/air-jordan-xxxiv.jpg"
                alt=""
              />
            </div>
          </div>
        </section>
        <section className="section-img-two">
          <h1>
             PUEDO ACEPTAR EL FRACASO. TODOS FALLAMOS EN ALGO. PERO NO PUEDO
             ACEPTAR NO INTENTAR.
          </h1>
          <div className="div-img-jordan">
            <img
              src="https://static.nike.com/a/images/n4twiihk5ezusuwk5vqc/air-jordan-33.png"
              alt=""
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default AllProduct;
