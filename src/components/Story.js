import React from "react"
import { Avatar, Divider, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"

import Playstory from "./Playstory"

const { Text } = Typography

function Story({ story }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [play, setPlay] = React.useState(null)

  return (
    <>
      <div
        style={{
          padding: "10px 0",
          display: "flex",
          overflowX: "auto",
        }}
      >
        {story.map((data, i) => (
          <div key={i} style={{ margin: "auto 5px" }} span={4}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                src={data.userCover || null}
                icon={<UserOutlined />}
                size={50}
                style={{
                  cursor: "pointer",
                  border: `2px solid #F77737`,
                }}
                onClick={() => {
                  setPlay({...data , i})
                  setIsModalVisible(true)
                }}
              />
              <Text style={{ fontSize: "9px", textAlign: "center" }}>
                {data.username}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <Divider style={{ margin: "0" }} />
      <Playstory
        play={play}
        setPlay={setPlay}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  )
}

export default React.memo(Story)
