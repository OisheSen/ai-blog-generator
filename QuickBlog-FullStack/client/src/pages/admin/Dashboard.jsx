import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const { axios } = useAppContext()

     const fetchDashboard = async ()=>{
       try {
         const {data} = await axios.get('/api/admin/dashboard')
         data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
       } catch (error) {
            toast.error(error.message)
       }
     }

     useEffect(()=>{
        fetchDashboard()
     },[])

  return (
    <div className='dashboard-container'>

        <div className='dashboard-cards'>

            <div className='dashboard-card'>
                <img src={assets.dashboard_icon_1} alt="" />
                <div>
                    <p className='dashboard-card-value'>{dashboardData.blogs}</p>
                    <p className='dashboard-card-label'>Blogs</p>
                </div>
            </div>

            <div className='dashboard-card'>
                <img src={assets.dashboard_icon_2} alt="" />
                <div>
                    <p className='dashboard-card-value'>{dashboardData.comments}</p>
                    <p className='dashboard-card-label'>Comments</p>
                </div>
            </div>

            <div className='dashboard-card'>
                <img src={assets.dashboard_icon_3} alt="" />
                <div>
                    <p className='dashboard-card-value'>{dashboardData.drafts}</p>
                    <p className='dashboard-card-label'>Drafts</p>
                </div>
            </div>
        </div>

        <div>
            <div className='dashboard-latest-header'>
                <img src={assets.dashboard_icon_4} alt="" />
                <p>Latest Blogs</p>
            </div>

            <div className='admin-table-wrap'>
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
                        {dashboardData.recentBlogs.map((blog, index)=>{
                            return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  )
}

export default Dashboard
