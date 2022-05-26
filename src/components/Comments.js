import React from "react"
import { Avatar, Card, Typography, Modal, Divider, Input, Button } from "antd"
import { UserOutlined, CaretRightOutlined } from "@ant-design/icons"

import { ContextData } from "../context/index"
const { Text, Paragraph } = Typography

function Comments({ isModalVisible, setIsModalVisible, _title, feed, i }) {

  const [input, setInput] = React.useState("")
  const { setFeed, feeds } = React.useContext(ContextData)

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleComment = async (e) => {
    e.preventDefault()
    if (input === "") return null
    let newComment = {
      username: "me",
      commentText: input,
      userCover: "",
    }
    let user = [...feeds]
    await user[i].comments.push(newComment)
    setFeed(user)
    setInput("")
  }

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
      style={{ top: 0 }}
    >
      <Card
        title={_title()}
        style={{
          width: "100%",
          margin: "0",
          padding: "10px",
        }}
        cover={<img alt="example" src={feed.image.url} />}
        bordered={false}
      >
        <div style={{ display: "flex", flexDirection: "row", color: "black" }}>
          <Paragraph>
            <Text strong style={{ marginRight: "5px", maxWidth: "100px" }}>
              {feed.username}
            </Text>
            {feed.image.caption}
          </Paragraph>
        </div>
        <Divider style={{ margin: "0" }} />

        <div>
          {feed.comments?.length > 0 &&
            feed.comments?.map((val, i) => {
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "15px 0",
                  }}
                >
                  <Paragraph>
                    <Avatar
                      src={val.userCover || null}
                      icon={<UserOutlined />}
                    />
                    <Text strong style={{ margin: "0 5px", maxWidth: "100px" }}>
                      {`${val.username} ∙`}
                    </Text>
                    {val.commentText}
                  </Paragraph>
                </div>
              )
            })}
        </div>
        <AlwaysScrollToBottom />
      </Card>
      <Input.Group
        compact
        style={{
          background: "white",
          bottom: "0",
          padding: "10px",
          position: "absolute",
        }}
      >
        <Input
          value={input}
          type="text"
          style={{ width: "85%", borderRadius: "10px 0 0 10px" }}
          placeholder="Add a comment"
          onChange={(e) => {
            setInput(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") return handleComment(e)
          }}
        />
        <Button
          type="default"
          disabled={input === "" ? true : false}
          style={{
            width: "15%",
            borderRadius: "0 10px 10px 0",
            background: input === "" ? "white" : `skyblue`,
          }}
          onClick={handleComment}
        >
          <CaretRightOutlined />
        </Button>
      </Input.Group>
    </Modal>
  )
}

export default Comments

const AlwaysScrollToBottom = () => {
  const elementRef = React.useRef()
  React.useEffect(() =>
    elementRef.current?.scrollIntoView({ behavior: "smooth" })
  )
  return <div ref={elementRef} />
}
