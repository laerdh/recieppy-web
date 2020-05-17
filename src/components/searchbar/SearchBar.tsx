import React from 'react'
import styles from './SearchBar.module.css'
import SearchIcon from '../../assets/images/search.svg'

const SearchBar = (props: any) => {
    return (
        <div className={`${styles.innerAddon} ${styles.leftAddon}`}>
            <img src={SearchIcon} className={styles.searchIcon} alt="Søk" />
            <input className={styles.input} type="text" placeholder="Søk" />
        </div>
    )
}

export default SearchBar