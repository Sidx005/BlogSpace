import { Box, Card, Inset, Strong, Text } from "@radix-ui/themes/dist/cjs/index.js";
import { useAuth } from "../Context";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify'
import { BiRefresh } from "react-icons/bi";
import { useState, useEffect } from 'react'

const Blogs = () => {
  const { fetchBlogs, loading, blogs, token, navigate } = useAuth();

  // State
  const [allTags, setAllTags] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)

  // Extract unique tags
  useEffect(() => {
    if (blogs?.length) {
      const tags = blogs.flatMap(blog => blog.tags || [])
      const uniqueTags = [...new Set(tags)]
      setAllTags(uniqueTags)
    }
  }, [blogs])

  //  Filter logic
  const filteredBlogs = selectedTag
    ? blogs.filter(blog => blog.tags?.includes(selectedTag))
    : blogs

  if (loading) {
    return (
      <div className='flex justify-center items-center h-72 text-2xl'>
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full p-5 flex justify-center items-center flex-col gap-3">

      {/* Top Buttons */}
      <div className="w-full flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            if (!token) alert('Please Login to Create Blogs');
            navigate('/createBlog')
          }}
          disabled={!token}
        >
          Create Blog
        </button>

        <button
          onClick={() => fetchBlogs()}
          className="text-2xl px-2 rounded-md border-2 mx-1"
        >
          <BiRefresh />
        </button>
      </div>

      {/* ✅ Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full cursor-pointer border ${
            selectedTag === null ? 'bg-black text-white' : 'bg-gray-100'
          }`}
        >
          All
        </span>

        {allTags.map((tag, index) => (
          <span
            key={index}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full cursor-pointer border ${
              selectedTag === tag
                ? 'bg-violet-600 text-white'
                : 'bg-violet-100 text-violet-700 border-violet-300'
            }`}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Active Filter Label */}
      {selectedTag && (
        <p className="text-sm text-gray-400">
          Showing results for #{selectedTag}
        </p>
      )}

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-5 gap-5 w-full">

        {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`}>
            <Box minWidth="340px">
              <Card size="2">

                {/* Image */}
                <Inset clip="padding-box" side="top" pb="current">
                  <img
                    src={blog.header || "https://images.unsplash.com/photo-1617050318658-a9a3175e34cb"}
                    alt="blog"
                    style={{
                      display: "block",
                      objectFit: "cover",
                      width: "100%",
                      height: 140,
                      backgroundColor: "var(--gray-5)",
                    }}
                  />
                </Inset>

                {/* Title + Content */}
                <Text as="p" size="3">
                  <Strong>{blog.title}</Strong>
                  <br />

                  <div
                    className='text-lg'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        blog?.content?.length > 100
                          ? blog.content.slice(0, 100) + "..."
                          : blog.content || ''
                      ),
                    }}
                  />
                </Text>

                {/* Author */}
                <Text as="p" size="3">
                  <Strong>Author : </Strong> {blog.author?.name}
                </Text>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {blog?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-violet-100 text-violet-700 border border-violet-300 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </Card>
            </Box>
          </Link>
        )) : (
          <div className='flex text-gray-400 text-center justify-center text-2xl col-span-full'>
            No blogs found for this tag
          </div>
        )}

      </div>
    </div>
  );
};

export default Blogs;
