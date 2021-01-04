import React, {useContext, useEffect, useState} from 'react'
import s from './CreatePage.module.sass'
import useHttp from '../../hooks/http.hook'
import AuthContext from '../../context/AuthContext'
import {useHistory} from 'react-router-dom'

const CreatePage = () => {
  const [link, setLink] = useState('')
  const {request} = useHttp()
  const {token} = useContext(AuthContext)
  const history = useHistory()

  const linkHandler = e => setLink(e.target.value)

  const keyPressHandler = async e => {
    if (e.key === 'Enter') {
      try {
        const data =
          await request('/api/links/generate', 'POST', {from: link}, {
            Authorization: `Bearer ${token}`
          })
        history.push(`/detail/${data.link._id}`)
        console.log(data)
      } catch (e) {}
    }
  }


  useEffect(window.M.updateTextFields, [])

  return (
    <div className='row'>
      <div className={`col s8 offset-s2 ${s.page}`}>
        <div className='input-field'>
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            className='validate'
            value={link}
            onChange={linkHandler}
            onKeyPress={keyPressHandler}
          />
          <label
            className='white-text'
            htmlFor="login"
          >Логин</label>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
