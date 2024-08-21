import {useEffect, useState} from 'react'

const useFetchPosts = () => {
 const [allPosts, setAllPosts] = useState([])
 const [loading, setLoading] = useState(false)

 useEffect(() => {
  const fetchPosts = async () => {
    setLoading(true);
    https://dreamscapeai.onrender.com


    try {
      const response = await fetch("https://dreamscapeai.onrender.com/api/v1/posts", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse())
      }

    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }
  fetchPosts()
 }, [])
  return {allPosts, loading}
}

export default useFetchPosts