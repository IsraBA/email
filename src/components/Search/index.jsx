import React from 'react'
import styles from './styles.module.css'

export default function Search({ senders, filterdSenders = [], setFilterdSenders }) {

    const onChange = (e) => {
        const input = e.target.value;
        let newFilter = senders.filter(sender => sender.sender.toLowerCase().includes(input.toLowerCase()));
        setFilterdSenders(newFilter);
    };

    return (
        <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
            <label>
                <input
                    required
                    autoComplete="off"
                    placeholder="search your chats"
                    id="search" type="text"
                    onChange={onChange}
                />
                <div className={styles.icon}>
                    <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.swapOn}>
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                    <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.swapOff}>
                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                </div>
                <button type="reset" className={styles.closebtn} onClick={() => setFilterdSenders(senders)}>
                    <svg viewBox="0 0 20 20" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fillRule="evenodd"></path>
                    </svg>
                </button>
            </label>
        </form>
    )
}
