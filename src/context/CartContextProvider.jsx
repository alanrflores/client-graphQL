import React, { createContext, useState , useEffect} from 'react'
import { checkExistInTheCart } from '../check/check';
import toast, { Toaster } from 'react-hot-toast';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
  const product = products;
  if(product){
    setProducts(product);
  } else {
    setProducts([]);
  }
  },[products]);

//Revisamos si se encuentra algo dentro de 'datacart'
  useEffect(() => {
  const dataCart = JSON.parse(localStorage.getItem('dataCart'));
  if(dataCart){
    setCart(dataCart);
  }
  },[]);


//agregamos producto al carrito  
  const addItem = (item) => {
   if(checkExistInTheCart(cart, item)){
    setCart([...cart]);
    toast.error('Este producto ya existe en el carrito',{
      duration: 2000,
      position: 'top-center',
      style: {
        borderRadius: '8px',
        background: '#333',
        color: '#fff',
      },
    })
    return;
   }
   setCart([...cart, item]);
   localStorage.setItem('dataCart', JSON.stringify([...cart, item]));
   toast.success('¡Buen trabajo!, Añadido al carrito', {
    icon: '👏',
    duration: 2000,
    position: 'top-center',
    style: {
      borderRadius: '8px',
      background: '#333',
      color: '#fff',
    },
   })
   return;
  };

//eliminamos el producto  
  const clearItem = (id) => {
      let newCart = cart.filter((item) => item.id !== id)
      setCart(newCart);
      localStorage.removeItem('dataCart');
  };
  

//sacamos el total  
  useEffect(() => {
    const getTotal = () => {
      const data = cart.reduce((acc, current) => {
        return acc + current.price * current.quantity;
      }, 0);
      setTotal(data);
    };
    getTotal();
  }, [cart]);

//validamos los campos  
  const validateAll = (fields) => {
    return fields.some((field) => field === "");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        products,
        setProducts,
        addItem,
        clearItem,
        validateAll,
        total,
      }}
    >
       {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;