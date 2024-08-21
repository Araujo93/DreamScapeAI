import {useEffect, useState} from 'react'

const useFetchPosts = () => {
 const [allPosts, setAllPosts] = useState([])
 const [loading, setLoading] = useState(false)

 useEffect(() => {
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/posts", {
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