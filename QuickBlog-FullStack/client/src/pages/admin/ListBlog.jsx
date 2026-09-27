import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {

 const [blogs, setBlogs] = useState([]);
 const {axios} = useAppContext()

 const fetchBlogs = async () =>{
    try {
        const {data} = await axios.get('/api/admin/blogs')
        if(data.success){
            setBlogs(data.blogs)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
 }

 useEffect(()=>{
    fetchBlogs()
 },[])

  return (
    <div className='listblog-container'>
        <h1>All blogs</h1>

        <div className='admin-table-wrap listblog-table-wrap'>
                <table className='admin-table'>
                    <thead className='admin-table-head'>
                        <tr>
                            <th scope='col' className='admin-table-cell head-hash'> # </th>
                            <th scope='col' className='admin-table-cell'> Blog Title </th>
                            <th scope='col' className='admin-table-cell hide-mobile'> Date </th>
                            <th scope='col' className='admin-table-cell hide-mobile'> Status </th>
                            <th scope='col' className='admin-table-cell'> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index)=>{
                            return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1}/>
                        })}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default ListBlog
