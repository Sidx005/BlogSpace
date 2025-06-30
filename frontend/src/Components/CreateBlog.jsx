import React, { useState } from 'react'
import { useAuth } from '../Context'
import {EditorContent, isActive, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@radix-ui/themes/dist/cjs/index.js'
import parse from 'html-react-parser'
import { axiosLocal } from '../utils/Axios'
import { FaCross, FaTimes } from 'react-icons/fa'
// import axiosInstance from '../utils/Axios'
const extensions=[
  StarterKit
]
const content=``
const CreateBlog = () => {

    const {token,user,navigate} = useAuth()
    const [header,setHeader]=useState('')
    const [title,setTitle]=useState('')
    const[tags,setTags]=useState([])
    const[tagsInp,setTagsInp]=useState('')
    const[html,setHtml]=useState('')
    const editor=useEditor({
      extensions,
      content
    })
    if(!editor){
      return null
    }
    if(!token){
        navigate('/login')
    }
    const addTag=e=>{
      if((e.key=='Enter'||  e.key === ',') && tagsInp.trim()&& !tags.includes(tagsInp.trim())&& tags.length<5){
        e.preventDefault();
        setTags([...tags,tagsInp.trim()])
        setTagsInp('')
      }
    }
    const removeTag = (index) => {
  setTags(tags.filter((_, i) => i !== index))
}

    const handleSave=async(e)=>{
     e.preventDefault()
     const contentHtml=editor.getHTML()

     const data=await axiosLocal.post('/blogs/',{
      title,
      tags,
      content:contentHtml,
      authorId:user._id
     },{
      headers:{Authorization:`Bearer ${token}`}
     })
     if(data.data.success){
      alert('Blog created successfully')}
     if(data.error){
      alert(data.error)
     }
     console.log(data)
     setHtml(contentHtml)
    }
  return (
    <>
    <div className='flex justify-center w-full
     items-center flex-col text-black min-h-screen h-full'>
    <div className=' max-w-4xl w-full bg-white flex justify-end  mb-5 rounded-md'>

     <input placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} type="text" className='w-full h-full  rounded-md p-5' />
      </div>
      <input accept='image/*' type="file" />
  <div className="p-6 gap-5 flex flex-col bg-white rounded-xl w-full max-w-4xl shadow-lg">
    
    {/* Toolbar */}
    <div className="w-full flex flex-wrap gap-2 mb-4 border-b pb-2">
      {[
        { label:<strong>B</strong>, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
        { label: <em>I</em>, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
        { label: <s>S</s>, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike') },
        { label: '<>', action: () => editor.chain().focus().toggleCode().run(), active: editor.isActive('code') },
        { label: 'UL', action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
        { label: 'OL', action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
        { label: 'H1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
        { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
        { label: '“”', action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote') },
        { label: 'CodeBlock', action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock') },
        { label: 'Clear', action: () => editor.chain().focus().unsetAllMarks().clearNodes().run(), active: false },
        { label: 'Undo', action: () => editor.chain().focus().undo().run(), active: false },
        { label: 'Redo', action: () => editor.chain().focus().redo().run(), active: false },
      ].map((btn, i) => (
        <button
          key={i}
          onClick={btn.action}
          className={`px-3 py-1 text-sm rounded-md border ${
            btn.active ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>

    {/* Editor Content */}
    <div className='border rounded-md p-4 min-h-[300px]'>
      <EditorContent editor={editor} className='tiptap-content focus:outline-0 prose max-w-none w-full border-0 h-full ' />
    </div>
    <div className="tag-input">
  <input
    type="text"
    value={tagsInp}
    onChange={(e) => setTagsInp(e.target.value)}
    onKeyDown={addTag}
    placeholder="Add a tag and press Enter"
  />
  <div className="tags flex flex-wrap gap-2 mt-2">
    {tags.map((tag, index) => (
      <span key={index} className="bg-blue-100 px-3 py-1 rounded-full">
        {tag} <button onClick={() => removeTag(index)}><FaTimes/></button>
      </span>
    ))}
  </div>
  </div>
    <div className="w-full flex justify-start">
    <Button type='submit' onClick={handleSave} className='mt-5 w-fit'>Publish</Button>

    </div>
  </div>


    </div>
    <hr />
   {html&& <div className="text-black tiptap-content h-fit p-5 bg-white">
      {
      parse(html)
      
      }
    </div>}
    </>
  )
}

export default CreateBlog