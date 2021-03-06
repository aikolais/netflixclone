import React from 'react';

import './Header.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({black}) => {

    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src="https://i.pinimg.com/originals/e3/94/30/e39430434d2b8207188f880ac66c6411.png" alt="Usuário" />
                </a>
            </div>

        </header>
    )

}