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

// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import { Grid, Grow } from '@material-ui/core';




// const ProductCard = (props) => {

//     const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//     padding: 10,
//   },
  
// });

 
//   const classes = useStyles();


//     return (

   
//           <div>

//       { props.isLoading ? (
//         <div>Loading ...</div>
//       ) : (
       
//         <Card className={classes.root}>
//           <CardActionArea>
//             <CardMedia
//             component="img"
//             alt="Contemplative Reptile"
//             height="140"
//             image={props.item.thumbnail}
//             title="Contemplative Reptile"
//             /> 
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="h2"> 
//               {props.item.title} 
//               </Typography> 

//               <Typography variant="body2" color="textSecondary" component="p" >
//               Precio:{props.item.price} {props.item.currency_id} | 
//               Condicion: {props.item.condition} &nbsp;|
//               Stock: {props.item.available_quantity}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>  
//       )}
//      </div> 

      
    
//     )
// }


export default ProductCard;