import React, { useEffect } from 'react'
import styles from './styles.module.css'
import api from '../../functions/api'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSearchHighlight } from '../../Context/HighlightContext';

export default function Search({ setChats, resetChats }) {

    const { type } = useParams();

    const { setHighlightText } = useSearchHighlight();

    const [textInput, setTextInput] = useState('');
    const [lastSearchInput, setLastSearchInput] = useState('');

    const searchChats = (e) => {
        e.preventDefault();
        const trimmedText = textInput.trim();
        if (trimmedText !== '') {
            if (trimmedText !== lastSearchInput) {
                setLastSearchInput(trimmedText);
                api.get('chat/' + type + '/search/' + textInput).then(setChats);
                setHighlightText(textInput);
            }
        };
    }

    const resetInput = () => {
        if (textInput.trim() !== '') {
            resetChats();
        }
        setTextInput('');
        setHighlightText('');
    }

    useEffect(() => {
        if (textInput === '') {
            resetChats();
        }
    }, [textInput])



    return (
        <form className={styles.search} onSubmit={(e) => searchChats(e)}>
            <label>
                <input
                    required
                    autoComplete="off"
                    placeholder="search your chats"
                    id="search"
                    type="text"
                    onChange={(e) => setTextInput(e.target.value)}
                />
                <button className={styles.icon} type={textInput ? 'submit' : 'button'}>
                    <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.swapOn}>
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                    <svg style={{ cursor: "pointer" }} strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.swapOff}>
                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                </button>
                <button type="reset" className={styles.closebtn} onClick={resetInput}>
                    <svg viewBox="0 0 20 20" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fillRule="evenodd"></path>
                    </svg>
                </button>
            </label>
        </form>
    )
}
