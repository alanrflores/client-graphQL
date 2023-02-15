import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../../graphql/mutation";
import { ALL_PRODUCT } from "../../graphql/queries";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import isValidUrl from 'valid-url';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "./product-form.scss";



const ProductForm = ({ setError }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([{ url: "", title: ""}]);
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();

  let quantityInt = parseInt(quantity, 10);

  const [createProduct, { data }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: ALL_PRODUCT }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!title || !price || !description || !stock ) 
    return toast('Rellena los campos', {
    duration: 3000,
    });

    const invalidUrls = images.filter(image => !isValidUrl.isUri(image.url));

    if(invalidUrls.length > 0){
     console.log(`Invalid URLs: ${invalidUrls.map(image => image.url).join(', ')}`);
     return;
    };

   try {

     const response = await createProduct({ variables: { product: { title, price, description, quantity, stock, images }}});
     if(response){
            toast.success('Producto creado con éxito', {
              duration: 3000,
              position: 'top-center',
              icon: '👏',
              style: {
                borderRadius: '8px',
                background: '#333',
                color: '#fff',
              },
            });
          }else{
            toast.error('Por favor complete los campos correctamente',{
              duration: 3000,
              position: 'top-center',
              style: {
                borderRadius: '8px',
                background: '#333',
                color: '#fff',
              },
            });
          };
          setTitle("");
          setPrice("");
          setDescription("");
          setStock("");
          setImages([{ url: "", title: ""}]);
          navigate('/home')
   } catch (error) {
     console.log(error);
   }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className="container-create-product">
      <Button
        sx={{
          borderRadius: 5,
          border: 0,
          color: "black",
          borderBlockColor: "black",
          fontFamily: "monospace",
          padding: 1.2,
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Agregar nuevo producto
      </Button>
      <Dialog
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        open={open}
        onClose={handleClose}
      >
        <h1 style={{ color: "gray", padding: 8, fontFamily: "monospace" }}>
          Nuevo Producto
        </h1>
        <DialogContentText sx={{ padding: 4, fontFamily: "monospace" }}>
          Para agregar producto a este sitio web, por favor ingrese sus datos aquí.
        </DialogContentText>
        <form
          style={{ display: "flex", justifyContent: "center" }}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              style={{
                padding: 8,
                width: 180,
                borderRadius: 8,
                border: 0,
                backgroundColor: "aliceblue",
                marginTop: 10,
              }}
              type="title"
              placeholder="titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              style={{
                padding: 5,
                width: 80,
                borderRadius: 8,
                border: 0,
                backgroundColor: "aliceblue",
                marginTop: 10,
              }}
              type="price"
              placeholder="precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              style={{
                padding: 20,
                width: 400,
                borderRadius: 8,
                border: 0,
                backgroundColor: "aliceblue",
                marginTop: 10,
              }}
              type="description"
              placeholder="descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
             <input
              style={{
                padding: 20,
                width: 400,
                borderRadius: 8,
                border: 0,
                backgroundColor: "aliceblue",
                marginTop: 10,
              }}
              type="quantity"
              placeholder="cantidad"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
             <input
              style={{
                padding: 20,
                width: 400,
                borderRadius: 8,
                border: 0,
                backgroundColor: "aliceblue",
                marginTop: 10,
              }}
              type="stock"
              placeholder="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <label style={{ marginTop: 6, color: 'gray' }}>
              Imagenes
            { images?.map((image, index)=> (
               <div key={index}>
                  <input 
                   type="text"
                   placeholder="url"
                   value={images.url}
                   onChange={(e) => setImages(images?.map((item, i) => (
                    index === i ? {...item, url: e.target.value} : item
                   )))}
                   style={{ 
                    padding: 15, 
                    width: 240, 
                    borderRadius: 8,
                    border: 0,
                    backgroundColor: "aliceblue"
                  }} 
                   />
                   <input 
                   type="text"
                   placeholder="titulo"
                   value={images.title}
                   onChange={(e)=> setImages(images?.map((img, i) => (
                    index === i ? {...img, title: e.target.value} : img
                   )))}
                   style={{ 
                    padding: 8,
                    width: 152,
                    borderRadius: 8,
                    border: 0,
                    backgroundColor: "aliceblue",
                    marginTop: 10 ,
                    marginLeft: 8
                  }} 
                   />
                <button 
                 type="button"
                 style={{ 
                  paddingLeft: 12, 
                  paddingRight: 12, 
                  marginLeft: 20,
                  backgroundColor: 'Olive',
                  border: 0,
                  borderRadius: 4,
                  color: 'white',
                  
                }}
                 onClick={() => setImages(images.filter((img, i) =>  index > 0 ? i !== index : img  ))}>
                  -
                </button>
                <button
                 type="button"
                 style={{ 
                  paddingLeft: 12, 
                  paddingRight: 12, 
                  marginLeft: 12,
                  backgroundColor: 'Olive',
                  border: 0,
                  borderRadius: 4,
                  color: 'white'
                }}
                 onClick={() => setImages([...images, { url: "" , title: "" }])}>
                  +
                 </button>
               </div>
            )) 
          }
          </label>
            <br />
            <div style={{ padding: 8, marginBottom: 6 }}>
                <button
                  style={{
                    borderRadius: 4,
                    padding: 8,
                    border: 0,
                    marginTop: 4,
                    fontFamily: "monospace",
                    color: "white",
                    backgroundColor: "black",
                  }}
                  onClick={handleClose}
                >
                  Agregar Producto
                </button>
                <Toaster />
            </div>
          </div>
        </form>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default ProductForm;
