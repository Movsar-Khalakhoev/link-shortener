import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import s from './Navbar.module.sass'
import AuthContext from '../../context/AuthContext'

const Navbar = () => {
  const {logout} = useContext(AuthContext)
  const history = useHistory()

  const logoutHandler = event => {
    event.preventDefault()
    const isLogout = window.confirm('Вы действительно хотите выйти?')

    if (isLogout) {
      logout()
      history.push('/')
    }
  }
  return (
    <nav>
      <div className={`nav-wrapper blue darken-1 ${s.navbar}`}>
        <span className="brand-logo">Сокращение ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink
              to='/create'
              activeClassName={s.active}
            >Создать ссылку</NavLink>
          </li>
          <li>
            <NavLink
              to='/links'
              activeClassName={s.active}
            >Все ссылки</NavLink>
          </li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
