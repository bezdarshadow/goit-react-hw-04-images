import { useState, useEffect, useRef, useCallback } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { searchImages } from '../shared/services/images';

import { Hearts } from 'react-loader-spinner';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

import styles from './app.module.css';

export const App = () => {
  const [modal, setModal] = useState({
    open: false,
    content: null,
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    images: [],
    error: null,
    totalHits: null,
  });

  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    async function fetchImages() {
      setLoading(true);
      try {
        const { totalHits, hits } = await searchImages(page, search);
        setData(state => ({
          images: [...state.images, ...hits],
          error: null,
          totalHits,
        }));
        setLoading(false);
      } catch (error) {
        setData(state => ({
          ...state,
          error: error.message,
        }));
        setLoading(false);
      }
    }

    fetchImages();
  }, [search, page]);

  const loadMore = useCallback(() => {
    setPage(state => state + 1);
  }, []);

  const changeSearch = useCallback(newSearch => {
    if (newSearch === search) {
      return;
    }
    setSearch(newSearch);
    setPage(1);
    setData(state => ({
      ...state,
      images: [],
    }));
  }, []);

  const showModal = useCallback((image, alt) => {
    setModal({
      open: true,
      content: {
        image,
        alt,
      },
    });
  }, []);

  const hideModal = () => {
    setModal({
      open: false,
      content: null,
    });
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={changeSearch} />
      {data.error && <p>Ошибка поиска</p>}
      {!data.images.length && search && !loading && !data.error && (
        <p>По запросу {search} ничего не найдено</p>
      )}
      {modal.open && (
        <Modal handleClose={hideModal}>
          <img src={modal.content.image} alt={modal.content.alt} />
        </Modal>
      )}
      {Boolean(data.images.length) && (
        <ImageGallery images={data.images} handleClick={showModal} />
      )}
      <div className={styles.wrapperButton}>
        {loading && <Hearts color="#3f51b5" height={80} width={80} />}
        {data.images.length < data.totalHits && !loading && (
          <Button onClick={loadMore} text="Load more" />
        )}
      </div>
    </div>
  );
};

