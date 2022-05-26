import React from "react"
import {
  UserOutlined,
  SendOutlined,
  CommentOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons"
import { Avatar, Card, Typography, Image } from "antd"

import Comments from "./Comments"

const { Text, Link, Paragraph } = Typography

function Cards({ feed, i }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [love, setLove] = React.useState(false)

  const _title = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Avatar src={feed.userCover || null} icon={<UserOutlined />} />
          <span style={{ marginLeft: "10px" }}>
            <span>
              <strong>{feed.username}</strong>
            </span>
          </span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Card
        title={_title()}
        style={{
          width: "100%",
          margin: "10px auto",
          padding: "10px",
        }}
        cover={
          <Image
            alt={feed.username}
            src={feed.image.url}
            preview={false}
            onDoubleClick={() => setLove((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        }
      >
        <div>
          {!love ? (
            <HeartOutlined
              onClick={() => setLove(true)}
              style={{ marginLeft: "5px", fontSize: "30px", cursor: "pointer" }}
            />
          ) : (
            <HeartFilled
              onClick={() => setLove(false)}
              style={{
                marginLeft: "5px",
                fontSize: "30px",
                color: "red",
                cursor: "pointer",
              }}
            />
          )}
          <CommentOutlined
            style={{ marginLeft: "5px", fontSize: "30px" }}
            onClick={() => {
              setIsModalVisible(true)
            }}
          />
          <SendOutlined style={{ marginLeft: "5px", fontSize: "30px" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            color: "black",
            marginTop: "6px",
          }}
        >
          <Paragraph>
            <Text strong style={{ marginRight: "5px", maxWidth: "100px" }}>
              {feed.username}
            </Text>
            {feed.image.caption}
          </Paragraph>
        </div>
        <div>
          {feed.comments?.length > 0 && (
            <Link onClick={() => setIsModalVisible(true)}>
              {`View all ${feed.comments?.length} comment`}
              {feed.comments?.length > 1 && "s"}
            </Link>
          )}
        </div>
      </Card>
      <Comments
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        feed={feed}
        _title={_title}
        i={i}
      />
    </>
  )
}

export default Cards
