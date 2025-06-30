import React from 'react'
import { useAuth } from '../Context'
import { Box,Card,Inset,Strong,Text } from '@radix-ui/themes/dist/cjs/index.js'
import DOMPurify from 'dompurify'
import { Link } from 'react-router-dom'
const HomeBlogs = () => {
    const {blogs,loading}=useAuth()
  return (
    <>
	<h1 className='text-4xl font-bold mt-3 '>BLOGS</h1>
{loading?<p>Loading..</p>:blogs && blogs.length>0 ?blogs.map(blog=>(
	<Box minWidth="440px" width={'500px'} key={blog._id}>
	<Link to={`blog/${blog._id}`}>
	<Card size="2">
		<Inset clip="padding-box" side="top" pb="current">
			<img
				src={blog.header?blog.header:"https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"}
				alt="Bold typography"
				style={{
					display: "block",
					objectFit: "cover",
					width: "100%",
					height: 140,
					backgroundColor: "var(--gray-5)",
				}}
			/>
		</Inset>
		<Text as="p" size="3">
			<Strong>            {blog.title}
            </Strong> <br />
            
            	</Text>

				<div dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(blog.content.length>100?blog.content.slice(0,100)+"...":blog.content)}} />
                <Text as="p" size="3">
            <Strong>Author : </Strong> {blog.author.name}</Text>
   <Text as="p" size="3">{blog.tags?.map(tag=>'#'+tag+' ')} </Text>
	</Card>
	</Link>
</Box>)):<div className='flex justify-center items-center  h-72 text-3xl w-full'> No Blogs Found</div>}
</>
  )
}

export default HomeBlogs