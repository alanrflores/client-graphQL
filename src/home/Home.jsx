import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import AllProduct from "../product/allProduct/AllProduct";
import { ALL_PRODUCT } from "../graphql/queries";
import ReactLoading from 'react-loading';
import "./home.scss";

const Home = () => {
  const { data, error, loading } = useQuery(ALL_PRODUCT);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 9;
  const lastItem = currentPage * itemPerPage;
  const firstItem = lastItem - itemPerPage;

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

  const currentItems = data?.getAllProduct?.slice(firstItem, lastItem);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="container-loading">
              <ReactLoading type={"spokes"} color={"black"} height={40} width={40} />
           </div>;
  }
  return (
    <>
              <AllProduct
                products={currentItems}
                itemPerPage={itemPerPage}
                paginated={paginated}
                items={data?.getAllProduct?.length}
              />
     </>
  );
};

export default Home;
