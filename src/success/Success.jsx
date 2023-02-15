import React, { useEffect } from 'react'
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import './success.scss';
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT, UPDATE_PRODUCT_STOCK } from '../graphql/mutation';
import { useContext } from 'react';
import { CartContext } from '../context/CartContextProvider';
import { ALL_PRODUCT } from '../graphql/queries';


const Success = () => {
const { clearItem, cart } = useContext(CartContext);  

const payment = JSON.parse(localStorage.getItem('payment'));
const dataCart = JSON.parse(localStorage.getItem('dataCart'));

const item = dataCart?.map((data) => data);
const stockUpdate = parseInt(item?.map(i => i.stock)) - item?.map((i) => i.quantity)
const navigate = useNavigate();

const [updateProductStock, {data}] = useMutation(UPDATE_PRODUCT_STOCK , {
  variables: {
    updateProductStockId: item.map(i => i.id).join(''),
    stock: stockUpdate.toString(),
},
});

 const updateData = async() => {
   try {
     await updateProductStock();
     
   } catch (error) {
     console.log(error)
   }
 };

 const onSubmit = async() => {
  try {
    localStorage.removeItem('payment');
    localStorage.removeItem('dataCart');
    clearItem(item?.map(i => i.id))
    navigate('/home')
  } catch (error) {
    console.log(error)
  }
};

  useEffect(() => {
    updateData();
    const set = setTimeout(() => {
     onSubmit();
    }, 6000);
   }, []);

 

//  console.log(cart)
  return (
    <div className='container-success'>
        {
          payment ? (
            <>
            <Card sx={{ maxWidth: 420 }}>
            <div className='success-id'>
            <h2>Gracias por la compra
              <ThumbUpAltSharpIcon sx={{ color: 'green', marginLeft: 1, marginTop: 2 }}/>
            </h2> 
              <h3>ID de orden de compra: 
                <br /> {payment.createPayment.id}
              </h3>
              <hr />
              <div>
                { payment?.createPayment?.items?.map((item, index)=> (
                <div key={index} className='success-item'>
                <CardMedia
                  sx={{ height: 0 }}
                  title={item.title}
                />
                <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                <span>{item.title}</span> <br />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <span>{item.description}</span> <br />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <span>Cantidad: {item.quantity}</span> <br />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <span>Precio: USD {item.unit_price}</span> <br />
                </Typography>
                </CardContent>
                </div>
                ))}
              </div>
              {/* {
                payment?.createPayment?.items?.length > 0 ? (

                <CardActions>
                 <Link to={'/'}>
                 <Button onClick={() => onSubmit()} size="small">Go Home</Button>
                 </Link> 
                </CardActions>
                ) : ( null )
              } */}
            </div>
          </Card>  
            </>
          ) : ""
        }
    </div>
  )
}

export default Success