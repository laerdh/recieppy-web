import React, { ChangeEvent } from 'react'
import styles from './SearchBar.module.css'
import SearchIcon from '../../assets/images/search.svg'

export interface SearchBarProps {
    onInputChanged: (text: string) => void
}

const SearchBar = ({ onInputChanged }: SearchBarProps) => {
    return (
        <div className={`${styles.innerAddon} ${styles.leftAddon}`}>
            <img src={SearchIcon} className={styles.searchIcon} alt="Søk" />
            <input
                className={styles.input}
                type="text"
                placeholder="Søk"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputChanged(event.target.value)} />
        </div>
    )
}

export default SearchBar