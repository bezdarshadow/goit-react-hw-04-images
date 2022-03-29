import { useState, memo } from 'react';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css'



const Searchbar = ({onSubmit}) => {
  const [search, setSearch] = useState('');

  const getInputValue = (event) => {
    const {value} = event.target;
    setSearch(value)
}
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(search)
    setSearch('')
}

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}> 
          <span className={styles.buttonLabel}>Search</span>
        </button>

        <input
          className={styles.input}
          name='search'
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={getInputValue}
          required
        />
      </form>
    </header>
  );
}

export default memo(Searchbar);


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}