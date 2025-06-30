import { Box, Card, Inset, Strong, Text } from "@radix-ui/themes/dist/cjs/index.js";
import { useAuth } from "../Context";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify'
import { FaRecycle } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";

const Blogs = () => {
    const {  fetchBlogs,loading,blogs,token ,navigate} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>
    <div className="w-full p-5 flex justify-center items-center flex-col gap-3">
        <div className="w-full flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>{if(!token) alert('Please Login to Create Blogs');navigate('/createBlog')}} disabled={!token}>Create Blog</button>
       <button onClick={()=>fetchBlogs()} className="text-2xl px-2 rounded-md border-2 mx-1"><BiRefresh/></button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-5 gap-5 w-full">
        {blogs.length>0 && blogs ? blogs.map((blog) => (
            <Link to={`/blog/${blog._id}`}>            <Box minWidth="340px">
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
               <div
                        className='text-lg'
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blog?.content.length>100?blog.content.slice(0,100)+"...":blog.content || ''),
                        }}
                    />
            {/* {blog.content} */}
            	</Text>
                <Text as="p" size="3">
            <Strong>Author : </Strong> {blog.author.name}</Text>
	</Card>
</Box>
</Link>
        )): <div className='flex text-red-300 text-center justify-center  text-2xl   lg:col-span-3  md:col-span-2'> No Blogs Found</div>}
        </div>
        </div></>;
};
export default Blogs;