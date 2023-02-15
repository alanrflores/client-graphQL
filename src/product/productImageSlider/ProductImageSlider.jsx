import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper';
import { motion } from 'framer-motion'
import './product-image-slider.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const ProductImageSlider = props => {

    const [activeThumb, setActiveThumb] = useState();
    const [showBackground, setShowBackground] = useState(false);

    const urlImg = 'https://c.static-nike.com/a/images/i7uaonkqzhahrozhpake/air-jordan-2.png'
    const urlImgTwo = 'https://static.nike.com/a/images/gmp2gru4y1xlw279fs3x/air-jordan-4.png'
    const urlImgThree = 'https://static.nike.com/a/images/ztgw7rob4n8xqtbtggcw/air-jordan-15.png'
   
     useEffect(()=> {
         const set = setTimeout(() => {
             setShowBackground(true)
          },1000);
     }, []);
    

  return (
    <>
    <Swiper
    style={{
        "--swiper-navigation-color": "black",
        "--swiper-navigation-size": "1.1rem"
    }}
     loop={true}
     centeredSlides={true}
     slidesPerView={'auto'}
     spaceBetween={16}
     navigation={true}
     modules={[Navigation, Autoplay, Pagination]}
     grabCursor={true}
     thumbs={{ swiper: activeThumb }}
     effect={'coverflow'}
     coverflow={{
         rotate:20,
         stretch:0,
         depth: 200,
         modifier: 1,
         slideShadows: true,
     }}
     className='product-images-slider'
    >
         {
             props?.images?.map((item, index)=> {
              const word = item.substring(19, 31)
              return (
                  
                    <SwiperSlide key={index} style={{ 
                        backgroundImage: `url(${ showBackground && word === 'air-jordan-1'  ? urlImg 
                        : showBackground && word === 'air-jordan-2' ?  urlImgTwo : urlImgThree })`,
                        }}>
                        <div className='container-slider-img'>
                        <motion.div  
                         className='slider-img'
                         animate={{ 
                            opacity: 1,
                            rotate: 360
                        }} 
                         initial={{ opacity: 0.1 }}
                         transition={{ 
                            type: 'spring',
                            stiffness: 60
                         }}>    
                        <img src={item} alt="slider-images" /> 
                        </motion.div> 
                       
                        </div> 
                        <div className='title-sneakers'>
                        <span style={{ color: 'white', fontSize: 22}}>
                        { word === 'air-jordan-1' ? 'AIR JORDAN XX8' 
                        : word === 'air-jordan-2' ?  'AIR JORDAN XX9' 
                        : word === 'air-jordan-3' ?  'AIR JORDAN XXX' 
                        : 'AIR JORDAN XXXI'  }</span>
                        <h1>{ word === 'air-jordan-1' ? 'LAS ZAPATILLAS CONCEPTUALES DEL BALONCESTO' :  word === 'air-jordan-2' ? 'LAS MEJORES ZAPATILLAS DE BALONCESTO DEL MUNDO' : word === 'air-jordan-3' ? 'LA PRÓXIMA FRONTERA DEL VUELO' : 'LAS NUEVAS MÁQUINAS ANTIGRAVEDAD'  }</h1>
                        <p style={{ color: 'white',fontSize: 30, marginTop: 30}}>{ word === 'air-jordan-1' 
                        ? 'Como pionera de la innovación durante casi tres décadas, la marca Jordan una vez más fue más allá con las Air Jordan XX9, las primeras zapatillas de baloncesto tejidas del mundo. Inspirándose en la sastrería italiana, el calzado tenía una parte superior totalmente tejida y estableció un nuevo punto de referencia para el Air Jordan más ligero de la historia.' 
                        :  word === 'air-jordan-2' 
                        ? 'En 2013, con la presentación de las AJ XX8, se produjo un cambio radical en la línea Air Jordan. El calzado de alto rendimiento nunca había visto nada igual. Dentro de su carcasa única, a la altura de la bota, se ocultaba un zapato sorprendentemente receptivo con menos peso de lo que los jugadores esperaban razonablemente.' 
                        :  word === 'air-jordan-3' 
                        ? 'Con la tercera X llega un hito épico en el linaje de Air Jordan. Tres décadas de innovación y logros culminan aquí, en un calzado para la historia. Una celebración está en orden, ya que nuevamente, las vistas están puestas hacia la próxima frontera.' 
                        : 'El AJ XXXI rinde homenaje a la herencia de Air Jordan como ningún otro modelo lo ha hecho hasta ahora. Desde la figura descarada y enérgica que MJ tenía en su Air Jordan Is, hasta el legado de más de 30 años de Air que inspiró, el XXXI está en una posición única para llevar la antorcha y mantenerla en alto.'}</p>
                        </div>
                    </SwiperSlide>
                
              )
              
          })
         } 
    </Swiper>
    </>
  )
}

export default ProductImageSlider;
