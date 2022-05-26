import React from "react"
import { Card, Modal, Input, Button, message, Upload } from "antd"
import {
  LoadingOutlined,
  FormOutlined,
  ClearOutlined,
  DeleteFilled,
  UploadOutlined,
} from "@ant-design/icons"

import { ContextData } from "../context"

const { TextArea } = Input
const { Dragger } = Upload

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok")
  }, 2000)
}

function Post({ setIsModalVisible, isModalVisible }) {
  const { setFeed } = React.useContext(ContextData)
  const [loading, setLoading] = React.useState(false)
  const [image, setImage] = React.useState("")
  const [caption, setCap] = React.useState("")
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handlePost = async () => {
    if (image === "" || caption === "") {
      message.error("Please fill all the fields")
      return
    }
    setLoading(true)
    let newPost = {
      username: "me",
      userCover: "",
      image: {
        url: image,
        caption,
      },
      comments: [],
    }

    setFeed((prev) => [newPost, ...prev])
    message.success("Post Successful")
    setCap("")
    setImage("")
    setLoading(false)
    setIsModalVisible(false)
  }

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setImage(url)
      })
    }
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!")
    }

    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isLt2M) {
      message.error("Image must smaller than 2MB!")
    }

    return isJpgOrPng && isLt2M
  }

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined style={{ fontSize: "30px" }} />
      ) : (
        <UploadOutlined style={{ fontSize: "30px" }} />
      )}
      <div style={{ width: "100%", height: "100%" }}>Upload Photo</div>
    </div>
  )

  return (
    <Modal
      visible={isModalVisible}
      footer={null}
      onCancel={handleCancel}
      width="100vw"
      bodyStyle={{
        overflowY: "auto",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Card
        title={null}
        style={{
          width: "100%",
          margin: "0",
          padding: "10px",
          justifyContent: "center",
        }}
        bordered={false}
      >
        <div style={{}}>
          <div
            style={{
              margin: "60px 0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Dragger
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              customRequest={dummyRequest}
            >
              {image ? (
                <>
                  <img
                    src={image}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                </>
              ) : (
                uploadButton
              )}
            </Dragger>
            {image && (
              <DeleteFilled
                style={{
                  marginTop: "5px",
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => setImage("")}
              />
            )}
          </div>

          <TextArea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCap(e.target.value)}
            style={{ height: "100px" }}
          />
        </div>
      </Card>
      {caption !== "" && (
        <Button
          type="danger"
          style={{
            height: "50px",
            position: "absolute",
            bottom: "50px",
            width: "100%",
          }}
          onClick={() => {
            setCap("")
          }}
        >
          Reset
          <ClearOutlined />
        </Button>
      )}
      <Button
        type="primary"
        style={{
          height: "50px",
          position: "absolute",
          bottom: "0",
          width: "100%",
        }}
        disabled={image && caption !== "" ? false : true}
        onClick={handlePost}
      >
        Post
        <FormOutlined />
      </Button>
    </Modal>
  )
}

export default Post
