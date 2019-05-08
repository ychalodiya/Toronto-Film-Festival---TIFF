import React from 'react';

function Header(props) {
    // Default Message if not assign new one
    const message = props.message ? props.message : 'Welcome To The Movie Festival';

    return (
        <header className= "headerComponent">
            <h1> {props.title} </h1>
            <h2> {message} </h2>
        </header>
    );
}
export default Header;