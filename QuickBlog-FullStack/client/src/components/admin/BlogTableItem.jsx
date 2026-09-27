import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog, fetchBlogs, index}) => {

    const {title, createdAt} = blog;
    const BlogDate = new Date(createdAt)

    const { axios } = useAppContext();

    const deleteBlog = async ()=>{
      const confirm = window.confirm('Are you sure you want to delete this blog?')
      if(!confirm) return;
      try {
        const { data } = await axios.post('/api/blog/delete', {id: blog._id})
        if (data.success){
          toast.success(data.message)
          await fetchBlogs()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

     const togglePublish = async () =>{
      try {
        const { data } = await axios.post('/api/blog/toggle-publish', {id: blog._id})
        if (data.success){
            toast.success(data.message)
            await fetchBlogs()
          }else{
            toast.error(data.message)
          }
      } catch (error) {
        toast.error(error.message)
      }

     }

  return (
    <tr className='admin-table-row'>
      <th className='admin-table-cell'>{ index }</th>
      <td className='admin-table-cell'> {title} </td>
      <td className='admin-table-cell hide-mobile'> {BlogDate.toDateString()} </td>
      <td className='admin-table-cell hide-mobile'>
        <p className={blog.isPublished ? "status-published" : "status-unpublished"}
        >{blog.isPublished ? 'Published' : 'Unpublished'}</p>
      </td>
      <td className='admin-table-cell admin-table-actions'>
        <button onClick={togglePublish} className='table-action-btn'>{blog.isPublished ? 'Unpublish' : 'Publish'}</button>
        <img src={assets.cross_icon} className='table-delete-icon' alt="" onClick={deleteBlog}/>
      </td>
    </tr>
  )
}

export default BlogTableItem
