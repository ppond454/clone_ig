import { useContext } from "react"
import "antd/dist/antd.min.css"

import Story from "./components/Story"
import Layout from "./layout/index"
import Card from "./components/Cards"
import { ContextData } from "./context/index"

function App() {
  const { story, feeds } = useContext(ContextData)

  return (
    <Layout>
      {story.length > 0 && <Story story={story} />}
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {feeds.length > 0 &&
          feeds.map((feed, i) => <Card key={i} feed={feed} i={i} />)}
      </div>
    </Layout>
  )
}

export default App
