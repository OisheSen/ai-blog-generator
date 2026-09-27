import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {

  const {id} = useParams()

  const {axios} = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async ()=>{
    try {
      const {data} = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () =>{
    try {
      const { data } = await axios.post('/api/blog/comments', {blogId: id})
      if (data.success){
        setComments(data.comments)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const addComment = async (e)=>{
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', {blog: id, name, content});
      if (data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      }else{
         toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchBlogData()
    fetchComments()
  },[])

  return data ? (
    <div className='blog-page'>
      <img src={assets.gradientBackground} alt="" className='blog-bg-image'/>

      <Navbar/>

      <div className='blog-header'>
        <p className='blog-date'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='blog-title'>{data.title}</h1>
        <h2 className='blog-subtitle'>{data.subTitle}</h2>
        <p className='blog-author'>Michael Brown</p>
      </div>

      <div className='blog-content-wrap'>
          <img src={data.image} alt="" className='blog-main-image'/>

          <div className='rich-text' dangerouslySetInnerHTML={{__html: data.description}}></div>

          {/* Comments Section */}
          <div className='blog-comments-section'>
            <p className='comments-title'>Comments ({comments.length})</p>
            <div className='comments-list'>
                {comments.map((item, index)=>(
                  <div key={index} className='comment-item'>
                    <div className='comment-item-header'>
                      <img src={assets.user_icon} alt="" className='comment-user-icon'/>
                      <p className='comment-author'>{item.name}</p>
                    </div>
                    <p className='comment-text'>{item.content}</p>
                    <div className='comment-time'>{Moment(item.createdAt).fromNow()}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Add Comment Section */}
          <div className='blog-add-comment-section'>
             <p className='comments-title'>Add your comment</p>
             <form onSubmit={addComment} className='comment-form'>

                <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Name' required className='comment-input'/>

                <textarea onChange={(e)=> setContent(e.target.value)} value={content} placeholder='Comment' className='comment-textarea' required></textarea>

                <button type="submit" className='comment-submit-btn'>Submit</button>
             </form>
          </div>

          {/* Share Buttons */}
          <div className='blog-share-section'>
              <p className='share-title'>Share this article on social media</p>
              <div className='share-icons'>
                <img src={assets.facebook_icon} width={50} alt="" />
                <img src={assets.twitter_icon} width={50} alt="" />
                <img src={assets.googleplus_icon} width={50} alt="" />
              </div>
          </div>
      </div>
      <Footer/>

    </div>
  ) : <Loader/>
}

export default Blog
