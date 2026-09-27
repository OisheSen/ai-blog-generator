import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {

    const {title, description, category, image, _id} = blog;
    const navigate = useNavigate()

  return (
    <div onClick={()=> navigate(`/blog/${_id}`)} className='blog-card'>
      <img src={image} alt="" className='blog-card-image'/>
      <span className='blog-card-category'>{category}</span>
      <div className='blog-card-content'>
        <h5 className='blog-card-title'>{title}</h5>
        <p className='blog-card-desc' dangerouslySetInnerHTML={{"__html": description.slice(0,80)}}></p>
      </div>
    </div>
  )
}

export default BlogCard
