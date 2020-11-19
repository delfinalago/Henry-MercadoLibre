import React from 'react';
import styles from './ProductCard.module.css';
import { Card } from 'react-bootstrap';



const ProductCard = (props) => {



    return (

   
          <div className={styles.linea}>

      { props.isLoading ? (
        <div>Loading ...</div>
      ) : (
       
        <Card className={styles.card}>
          
            <Card.Img className={styles.imagen}
            component="src"
           
            src={props.item.thumbnail}
            /> 
            <Card.Title className={styles.title}>
              {props.item.title} 
              </Card.Title>

              <Card.Subtitle className={styles.precio} variant="body2" color="textSecondary" component="p" >
              Precio:{props.item.price} {props.item.currency_id} </Card.Subtitle>
              <Card.Subtitle>
              Condicion: {props.item.condition} &nbsp;|
              Stock: {props.item.available_quantity}
              </Card.Subtitle>
              
            
          
        </Card>  
      )}
     </div> 
    )
}

export default ProductCard;