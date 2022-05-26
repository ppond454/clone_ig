import React from "react"
import { Button, Row, Layout } from "antd"
import {
  HomeOutlined,
  SearchOutlined,
  PlusOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons"

import Post from "./Post"

function Footer() {
  const [isModalVisible, setIsModalVisible] = React.useState(false)

  return (
    <>
      <Layout.Footer
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          textAlign: "center",
          padding: "10px",
          height: "50px",
          zIndex: "1",
        }}
      >
        <Row justify="space-around" style={{}}>
          <Button
            style={{ borderRadius: "50%" }}
            icon={<HomeOutlined />}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <Button
            style={{ borderRadius: "50%" }}
            icon={<SearchOutlined />}
          ></Button>
          <Button
            style={{
              borderRadius: "50%",
              bottom: "20px",
              height: "50px",
              width: "50px",
            }}
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          ></Button>
          <Button
            style={{ borderRadius: "50%" }}
            icon={<ShoppingOutlined />}
          ></Button>
          <Button style={{ borderRadius: "50%" }} icon={<UserOutlined />} />
        </Row>
      </Layout.Footer>
      <Post
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </>
  )
}

export default React.memo(Footer)
