
import { Button } from './Button/Button';
import { fetchImg } from 'api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { Loader } from './Loader/Loader';
import { MainApp } from './App.styled';
import Notiflix from 'notiflix';
import { useState, useEffect} from "react";


export const App = () => {

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const getValue = (value) => {
      setQuery(value);
      setPage(1);
      setImages([]);
    };


    const onLoadMore = () => setPage(page + 1);

    useEffect(() => {
        setError(false);
        setIsLoadMore(false);
      
        if (query === '') {
            return;
      }
      
        setLoading(true);  
        const perPage = 12;
        fetchImg(page, query, perPage)

        .then((data) => {
          const { hits, totalHits } = data;

          if (hits.length === 0) {
            noImagesFound();
            return;
          }

          const totalPages = Math.ceil(totalHits / perPage);

          (page < totalPages) ? setIsLoadMore(true) : setIsLoadMore(false)
          setImages(prevImages => [...prevImages, ...hits])
        })
              
        .catch(() => {
          setError(true)
        })

        .finally(() => {
          setLoading(false)
        })    
    },[query, page])

    const noImagesFound = () => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }

    return (
      <MainApp>
        <Searchbar getValue={getValue}></Searchbar>
        {loading && (<Loader/>)}
        {error && (<ErrorMessage title='Whoops! Error! Please reload this page!' />)}
        {images.length > 0 && <ImageGallery data={images} />}
        {isLoadMore && <Button onClick={onLoadMore}/>}
      </MainApp>
      )
  }


