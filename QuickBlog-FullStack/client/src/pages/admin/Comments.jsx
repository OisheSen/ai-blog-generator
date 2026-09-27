import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {

    const [comments, setComments] = useState([])
    const [filter, setFilter] = useState('Not Approved')

    const {axios} = useAppContext();

    const fetchComments = async ()=>{
        try {
          const { data } = await axios.get('/api/admin/comments')
          data.success ? setComments(data.comments) : toast.error(data.message)
        } catch (error) {
          toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchComments()
    },[])

  return (
    <div className='comments-page'>
      <div className='comments-page-header'>
        <h1>Comments</h1>
        <div className='comments-filter-group'>
            <button onClick={()=> setFilter('Approved')} className={`comments-filter-btn ${filter === 'Approved' ? 'comments-filter-btn-active' : ''}`}>Approved</button>

            <button onClick={()=> setFilter('Not Approved')} className={`comments-filter-btn ${filter === 'Not Approved' ? 'comments-filter-btn-active' : ''}`}>Not Approved</button>
        </div>
      </div>
      <div className='admin-table-wrap comments-table-wrap'>
        <table className="admin-table">
            <thead className="admin-table-head">
                <tr>
                    <th scope="col" className="admin-table-cell comment-head-cell"> Blog Title & Comment </th>
                    <th scope="col" className="admin-table-cell comment-head-cell hide-mobile"> Date </th>
                    <th scope="col" className="admin-table-cell comment-head-cell"> Action </th>
                </tr>
            </thead>
            <tbody>
                {comments.filter((comment)=>{
                    if(filter === "Approved") return comment.isApproved === true;
                    return comment.isApproved === false;
                }).map((comment, index)=> <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />)}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
