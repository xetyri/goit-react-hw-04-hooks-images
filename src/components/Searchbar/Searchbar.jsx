import { useState } from "react";
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar ({onSubmit}) {
    const [pictureName, setPictureName] = useState('');
 
    const handlChange = e => {
        setPictureName(e.currentTarget.value.toLowerCase());
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(pictureName);
        setPictureName("");
    }

    return (
        <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={handleSubmit}>
                <button className={s.SearchForm_button} type="submit" >
                    <span className={s.SearchForm_button_label}>
                    Search
                </span>
            </button>

            <input
            className={s.SearchForm_input}
            type="text"
            name="pictureName"
            value={pictureName}
            onChange={handlChange}
        
            placeholder="Search images and photos"
            />
        </form>
    </header>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};