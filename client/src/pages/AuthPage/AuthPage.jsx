import React, {useContext, useEffect, useRef, useState} from 'react'
import s from './AuthPage.module.sass'
import useFormValidator from '../../hooks/formValidator.hook'
import useHttp from '../../hooks/http.hook'
import {useMessage} from '../../hooks/message.hook'
import AuthContext from '../../context/AuthContext'

const loginCondition = value => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(value).toLowerCase())
}

const passwordCondition = value => {
  const passwordLength = value.length

  return passwordLength >= 6 && passwordLength <= 48
}

const AuthPage = () => {
  const [
    [loginInputRef, loginValueHandler, loginError],
    [passwordInputRef, passwordValueHandler, passwordError],
    [triedHandler, isTried]
  ] = useFormValidator([
        {
          ref: useRef(),
          errorState: useState(true),
          condition: loginCondition
        },
        {
          ref: useRef(),
          errorState: useState(true),
          condition: passwordCondition
        }
      ])
  const {loading, request, clearError} = useHttp()
  const message = useMessage()
  const auth = useContext(AuthContext)

  const loginHandler = () => {
    const fetchLogin = async (login, password) => {
      try {
        const data =  await request('/api/auth/', 'POST', {
          login,password
        })
        if (data.message) {
          message(data.message)
        } else {
          clearError()
          auth.login(data.token, data.userId)
        }
      } catch (e) {
        console.log(e)
      }
    }

    triedHandler(fetchLogin)
  }

  const registerHandler = () => {
    const fetchRegister = async (login, password) => {
      try {
        const data =  await request('/api/auth/register', 'POST', {
          login,password
        })
        message(data.message)
        clearError()
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }

    triedHandler(fetchRegister)
  }

  useEffect(window.M.updateTextFields, [])

  return (
    <div className='row'>
      <div className="col s6 offset-s3">
        <h1>Сокращатель ссылок</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <div>
              <div className={`${s.input_container} input-field`}>
                <input
                  name='login'
                  placeholder="Введите логин"
                  id="login"
                  ref={loginInputRef}
                  type="text"
                  onChange={loginValueHandler}
                  className={`validate white-text ${s.yellow_input}`}
                />
                <label
                  className='white-text'
                  htmlFor="login"
                >Логин</label>
                {loginError}
                {
                  loginError && isTried
                    ? <i className={`${s.error} icofont-warning-alt`} />
                    : null
                }
              </div>
              <div className={`${s.input_container} input-field`}>
                <input
                  name='password'
                  placeholder="Введите пароль"
                  id="password"
                  ref={passwordInputRef}
                  type="text"
                  onChange={passwordValueHandler}
                  className={`validate white-text ${s.yellow_input}`}
                />
                <label
                  className='white-text'
                  htmlFor="password"
                >Пароль</label>
                {passwordError}
                {
                  passwordError && isTried
                  ? <i className={`${s.error} icofont-warning-alt`} />
                  : null
                }
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className={`btn yellow darken-4 ${s.login_button}`}
              onClick={loginHandler}
              disabled={loading || (isTried && (loginError || passwordError))}
            >Войти</button>
            <button
              className={`btn grey lighten-1 ${s.login_button}`}
              onClick={registerHandler}
              disabled={loading || (isTried && (loginError || passwordError))}
            >Зарегистрироваться</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
