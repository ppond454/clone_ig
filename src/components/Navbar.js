import React from "react"
import { Layout } from "antd"
import { InstagramOutlined } from "@ant-design/icons"

function Navbar() {
  return (
    <Layout.Header
      style={{
        position: "fixed",
        width: "100%",
        textAlign: "center",
        zIndex: "1",
        background: "#ffffff",
        borderBottom: "2px solid #e8e8e8",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h3 style={{ color: "black" }}>Low Cost Instragram</h3>
        <InstagramOutlined
          style={{
            margin: "auto 5px",
            fontSize: "35px",
            color: "white",
            borderRadius: "15px",
            backgroundImage:
              "linear-gradient(to right bottom, #405DE6, #5851D8, #833AB4, #C13584, #E1306C , #FD1D1D ,#F56040 ,#F77737 ,#FCAF45,#FFDC80)",
            backgroundClip: "padding-box , border-box",
            backgroundOrigin: "border-box",
            border: "double 0.2em transparent",
          }}
        />
      </div>
    </Layout.Header>
  )
}

export default React.memo(Navbar)
