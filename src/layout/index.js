import React from "react"
import { Layout } from "antd"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function index({ children }) {
  return (
    <>
      <Navbar />
      <AlwaysScrollToTop />
      <Layout.Content
        style={{
          paddingTop: "60px",
          paddingBottom: "60px",
          overflowY: "auto",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Layout.Content>
      <Footer />
    </>
  )
}

export default index

const AlwaysScrollToTop = () => {
  const elementRef = React.useRef()
  React.useEffect(() =>
    elementRef.current?.scrollIntoView({ behavior: "smooth" })
  )
  return <div ref={elementRef} />
}
