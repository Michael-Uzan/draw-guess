import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
    return (
        <header className="full">
            <nav className="flex justify-center">
                <NavLink activeClassName="active" exact to="/" >Home</NavLink>
                <NavLink activeClassName="active" exact to="/about" >About</NavLink>
            </nav>
        </header>
    )
}
