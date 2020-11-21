import React, {
  useState,
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';
import Catalogo from './Catalogo';
import styles from './navbar.module.css'
import Logo from './logo2.png';



const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

function App() {
  const [query, setQuery] = useState('');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'http://localhost:3000/api/search/zapatillas',
    { hits: [] },
  );







  return (

    <nav className={styles.nav}>
      <div className={styles.logoml}>
       <img src={Logo} width="90" height="85" alt="" />
      </div>
    <div className={styles.search}>
      <form className={styles.search}
        onSubmit={event => {
            doFetch(
            `http://localhost:3000/api/search/${query}`,
          );
          console.log("post-dofetch");
          event.preventDefault();
          setQuery('')
        }}
      >
        <input className={styles.input}
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button className={styles.botonbuscar} type="submit">Search</button>
      </form>
      </div >
        <div className={styles.todo}>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul className={styles.cartas}>
          <Catalogo data={data} isLoading={isLoading}/>
        </ul>


      )}
   </div>
  </nav>
  );
}

export default App;
