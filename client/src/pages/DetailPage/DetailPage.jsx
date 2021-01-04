import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import useHttp from '../../hooks/http.hook'
import Loader from '../../components/Loader/Loader'
import LinkCard from '../../components/LinkCard/LinkCard'
import AuthContext from '../../context/AuthContext'

const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/links/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })

      setLink(data)
    } catch (e) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      {
        !loading && link && <LinkCard link={link} />
      }
    </div>
  )
}

export default DetailPage
