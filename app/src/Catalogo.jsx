import React, { useState } from 'react';
import Pagination from "react-js-pagination";
import ProductCard from './ProductCard';
import styles from './catalogo.module.css'


const Catalogo = (props) => {


     let hits = props.data.hits;

     const [order, setOrder] = useState('asc');

     const [condition, setCondition] = useState('new');

      // Order-------------------------------
      if(order==="asc")
        hits = hits.sort((a,b) => {
          if (a.price > b.price) {  return 1; }
          if (a.price < b.price) {  return -1; }
          return 0; 
        });
      else  
        hits = hits.sort((a,b) => {
          if (a.price > b.price) { return -1; }
          if (a.price < b.price) { return 1; }
          return 0; 
        }); 

      // Filter-------------------------------
      hits = hits.filter(function (item) {
        return ( item.condition === condition) ;
      })

      const itemsPerPage = 30;
      const [ activePage, setCurrentPage ] = useState( 1 );
   
      const indexOfLastItem  = activePage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems     = hits.slice( indexOfFirstItem, indexOfLastItem );

      const renderItems = currentItems.map( ( item, index ) => {
        return <div className="bloque"> <ProductCard item={item} isLoading={props.isLoading} /> </div> ;
      } );

      const handlePageChange = ( pageNumber ) => {
        console.log( `active page is ${ pageNumber }` );
        setCurrentPage( pageNumber )
     };


   

  return (
  <div>
      <div className={styles.catalogo}>
      <h1>Catalogo</h1>
      </div>
      { props.isLoading ? (
        <div>Loading ...</div>
      ) : (
      <div>
        { renderItems }
     </div>
     
      )}
<div>
       Precio: <select defaultValue='asc'
      onChange={event => setOrder(event.target.value)}
      className="browser-default custom-select" >
        <option value='asc' selected>Asc</option>
        <option value='desc'>Desc</option>
      </select>


      Condicion:
      <select defaultValue='new'
      onChange={event => setCondition(event.target.value)}
      className="browser-default custom-select" >
        <option value='new' selected>New</option>
        <option value='used'>Used</option>
      </select>  
      </div>
          <div className="pagination">
            <Pagination
               activePage={ activePage }
               itemsCountPerPage={ 5 }
               totalItemsCount={ hits.length }
               pageRangeDisplayed={ 3 }
               onChange={ handlePageChange }
            />
         </div>
      </div>
  );
}
export default Catalogo;