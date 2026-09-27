import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment, fetchComments}) => {

    const { blog, createdAt, _id } = comment;
    const BlogDate = new Date(createdAt);

    const { axios } = useAppContext()

    const approveComment = async () =>{
      try {
        const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
        if (data.success) {
          toast.success(data.message)
          fetchComments()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const deleteComment = async () =>{
      try {
        const confirm = window.confirm('Are you sure you want to delete this comment?');
        if(!confirm) return;

        const {data} = await axios.post('/api/admin/delete-comment', {id: _id})
        if (data.success) {
          toast.success(data.message)
          fetchComments()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }


  return (
    <tr className='admin-table-row'>
      <td className='admin-table-cell comment-cell'>
        <b className='comment-label'>Blog</b> : {blog.title}
        <br/>
        <br/>
        <b className='comment-label'>Name</b> : {comment.name}
        <br/>
        <b className='comment-label'>Comment</b> : {comment.content}
      </td>
      <td className='admin-table-cell hide-mobile'>
        {BlogDate.toLocaleDateString()}
      </td>
      <td className='admin-table-cell'>
        <div className='comment-actions'>
            {
            !comment.isApproved ?
            <img onClick={approveComment} src={assets.tick_icon} className='comment-action-icon'/>
            :
            <p className='comment-approved-badge'>Approved</p>
            }
            <img onClick={deleteComment} src={assets.bin_icon} alt="" className='comment-action-icon'/>
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
