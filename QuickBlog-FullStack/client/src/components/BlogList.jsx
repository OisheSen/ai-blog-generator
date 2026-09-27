import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {

    const [menu, setMenu] = useState("All")
    const {blogs, input} = useAppContext()

    const filteredBlogs = ()=>{
      if(input === ''){
        return blogs
      }
      return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }

  return (
    <div>
      <div className='blog-menu'>
        {blogCategories.map((item)=> (
            <div key={item} className='blog-menu-item'>
                <button onClick={()=> setMenu(item)}
                 className={`blog-menu-btn ${menu === item ? 'blog-menu-btn-active' : ''}`}>
                    {item}
                    {menu === item && (
                        <motion.div layoutId='underline'
                        transition={{type: 'spring', stiffness: 500, damping: 30}}
                        className='blog-menu-underline'></motion.div>
                    )}

                </button>
            </div>
        ))}
      </div>
      <div className='blog-grid'>
        {filteredBlogs().filter((blog)=> menu === "All" ? true : blog.category === menu).map((blog)=> <BlogCard key={blog._id} blog={blog}/>)}
      </div>
    </div>
  )
}

export default BlogList
