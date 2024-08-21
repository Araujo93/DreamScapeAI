import { useState } from 'react'

// components
import { Loader, Card, FormField } from '../components'

// hooks 
import useFetchPosts from '../hooks/useFetchPosts'

// eslint-disable-next-line react/prop-types
const RenderCards = ({data, title}) => {
 // eslint-disable-next-line react/prop-types
 if (data?.length > 0) { 
  // eslint-disable-next-line react/prop-types
  return data.map((post) => <Card key={post._id} {...post} />)
 }

  return (
   <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
  )
}

const Home = () => {
  const { allPosts,loading } = useFetchPosts()

 const [searchText, setSearchText] = useState("")
 const [searchResults, setSearchResults] = useState(null)
 const [searchTimout, setSearchTimout] = useState(null)


 const handleSearchChange = (e) => {
  clearTimeout(searchTimout)
  setSearchText(e.target.value);

  setSearchTimout(
    setTimeout(() => {
      const searchResults = allPosts.filter((post) => 
        post.name.toLowerCase().includes(searchText.toLowerCase()) || 
        post.prompt.toLowerCase().includes(searchText.toLowerCase()));
      setSearchResults(searchResults)
    }, 500)
  )
 }
 
  return (
    <section className='max-w-7xl mx-auto'>
     <div>
      <h1 className='font-extrabold text-[#222328] text-[32px]'>The Community Showcase</h1>
      <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
        Browse through a collection of imaginative and visually stunning images generated by DALL-E AI
      </p> 
     </div>
     
     <div className='mt-16'>  
      <FormField 
      labelName="Search Posts"
      type="text"
      name="text"
      placeholder='Search posts'
      value={searchText}
      handleChange={handleSearchChange}
      />
     </div>

     <div className='mt-10'>
      {loading ? (
       <div className='flex justify-center items-center'>
        <Loader />
       </div>
      ) : (
       <>
       {searchText && (
        <h2 className='font-medium text-[#666e75] text-xl mb-3'>
         Showing results for <span className='text-[#222328]'>{searchText}</span>
        </h2>
       ) }

       <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
        {searchText ? (
         <RenderCards  data={searchResults} title="No search results found"/>
        ) : (
         <RenderCards  data={allPosts} title="No posts found"/>
        )}

       </div>
       </>
      )}

     </div>

    </section>
  )
}

export default Home