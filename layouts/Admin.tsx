import { useRouter } from 'next/router'
import { createRef, useEffect } from 'react'
import React from 'react'
import { Container } from 'reactstrap'

import AdminFooter from '../components/Footers/AdminFooter'
import AdminNavbar from '../components/Navbars/AdminNavbar'
import Sidebar from '../components/Sidebar/Sidebar'
import routes from '../routes'

const Admin = (props) => {
  const router = useRouter()
  const mainContentRef = createRef<any>()
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContentRef.current.scrollTop = 0
  }, [])
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(`${routes[i].layout}${routes[i].path}`) !== -1) {
        return routes[i].name
      }
    }
    return 'Brand'
  }
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          imgSrc: '/assets/img/brand/nextjs_argon_black.png',
          imgAlt: '...'
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar {...props} brandText={getBrandText()} />
        {props.children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  )
}

export default Admin
