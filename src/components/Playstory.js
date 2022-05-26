import React from "react"
import { Modal, Button, Avatar } from "antd"
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"

import { ContextData } from "../context/index"

const Playstory = ({ isModalVisible, setIsModalVisible, setPlay, play }) => {
  const { story } = React.useContext(ContextData)
  const len = story.length - 1

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onNext = async (e) => {
    e.preventDefault()
    if (play.i === len) {
      let user = await story[0]
      setPlay({ ...user, i: 0 })
    } else {
      let user = await story[play.i + 1]
      setPlay({ ...user, i: play.i + 1 })
    }
  }
  const onPrev = async (e) => {
    e.preventDefault()
    if (play.i === 0) {
      let user = await story[len]
      setPlay({ ...user, i: len })
    } else {
      let user = await story[play.i - 1]
      setPlay({ ...user, i: play.i - 1 })
    }
  }

  return (
    <>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        width="100vw"
      >
        <div style={{ zIndex: 2, position: "absolute", color: "white" }}>
          <Avatar
            src={play?.userCover || ""}
            style={{ marginRight: "5px", border: "2px solid white" }}
          />
          <strong>{play?.username}</strong>
        </div>
        <div style={{ display: "flex", height: "95%", width: "100%" }}>
          <Button
            size="large"
            style={{
              position: "absolute",
              zIndex: 2,
              left: "0",
              fontSize: "30px",
              top: "50vh",
            }}
            icon={<CaretLeftOutlined />}
            onClick={onPrev}
          />

          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
            height="100%"
            width="100%"
            allow="autoplay"
            title={play?.username}
            src={play?.storyUrl}
            // onEnded={()=> console.log("end") }
          />
          <Button
            size="large"
            style={{
              position: "absolute",
              zIndex: 2,
              right: "0",
              top: "50vh",
            }}
            icon={<CaretRightOutlined />}
            onClick={onNext}
          ></Button>
        </div>
      </Modal>
    </>
  )
}

export default Playstory
