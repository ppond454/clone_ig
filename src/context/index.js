import React, { useEffect, useState } from "react"

const ContextData = React.createContext({})

export default function ContextProvider({ children }) {
  const [feeds, setFeed] = useState([])
  const [story, setStory] = useState([])
  const apiFeed =
    process.env.API_FEED_URL ||
    "https://run.mocky.io/v3/a210a8f1-530c-42f1-b46f-25bd65d558fa"
  const apiStory =
    process.env.API_STORY_URL ||
    "https://run.mocky.io/v3/f48649bf-2bfd-48db-9a64-5c8ad0646186"

  const fetchFeed = React.useCallback(async () => {
    const res = await fetch(apiFeed)
    const data = await res.json()
    setFeed(data.feeds)
  }, [apiFeed])

  const fetchStory = React.useCallback(async () => {
    const res = await fetch(apiStory)
    const data = await res.json()
    setStory(data.story)
  }, [apiStory])

  useEffect(() => {
    fetchFeed()
  }, [fetchFeed])

  useEffect(() => {
    fetchStory()
  }, [fetchStory])

  return (
    <ContextData.Provider value={{ feeds, setFeed, story, setStory }}>
      {children}
    </ContextData.Provider>
  )
}

export { ContextData }
