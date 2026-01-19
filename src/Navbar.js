import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#FFE3DA" }}>
            <div className="container d-flex justify-content-center">
                <a className="navbar-brand" href="/">
                    <img src="/JapMala.png" alt="JapMala logo" width="100" height="50"/>
                </a>
            </div>
        </nav>
    )
}