import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked'

const AddBlog = () => {

    const {axios} = useAppContext()
    const [isAdding, setIsAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);

    const generateContent = async ()=>{
        if(!title) return toast.error('Please enter a title')

        try {
            setLoading(true);
            const {data} = await axios.post('/api/blog/generate', {prompt: title})
            if (data.success){
                quillRef.current.root.innerHTML = parse(data.content)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    const onSubmitHandler = async (e) =>{
        try {
            e.preventDefault();
            setIsAdding(true)

            const blog = {
                title, subTitle,
                description: quillRef.current.root.innerHTML,
                category, isPublished
            }

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)

            const {data} = await axios.post('/api/blog/add', formData);

            if(data.success){
                toast.success(data.message);
                setImage(false)
                setTitle('')
                setSubTitle('')
                quillRef.current.root.innerHTML = ''
                setCategory('Startup')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsAdding(false)
        }

    }

    useEffect(()=>{
        // Initiate Quill only once
        if(!quillRef.current && editorRef.current){
            quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
        }
    },[])

  return (
    <form onSubmit={onSubmitHandler} className='addblog-form'>
      <div className='addblog-card'>

        <p>Upload thumbnail</p>
        <label htmlFor="image">
            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='addblog-upload-img'/>
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required/>
        </label>

        <p className='addblog-field-label'>Blog title</p>
        <input type="text" placeholder='Type here' required className='addblog-input' onChange={e => setTitle(e.target.value)} value={title}/>

        <p className='addblog-field-label'>Sub title</p>
        <input type="text" placeholder='Type here' required className='addblog-input' onChange={e => setSubTitle(e.target.value)} value={subTitle}/>

        <p className='addblog-field-label'>Blog Description</p>
        <div className='addblog-editor-wrap'>
            <div ref={editorRef}></div>
            {loading && (
            <div className='addblog-editor-loading'>
                <div className='addblog-editor-spinner'></div>
            </div> )}
            <button disabled={loading} type='button' onClick={generateContent} className='addblog-ai-btn'>Generate with AI</button>
        </div>

        <p className='addblog-field-label'>Blog category</p>
        <select onChange={e => setCategory(e.target.value)} name="category" className='addblog-select'>
            <option value="">Select category</option>
            {blogCategories.map((item, index)=>{
                return <option key={index} value={item}>{item}</option>
            })}
        </select>

        <div className='addblog-publish-row'>
            <p>Publish Now</p>
            <input type="checkbox" checked={isPublished} className='addblog-checkbox' onChange={e => setIsPublished(e.target.checked)}/>
        </div>

        <button disabled={isAdding} type="submit" className='addblog-submit-btn'>
            {isAdding ? 'Adding...' : 'Add Blog'}
        </button>

      </div>
    </form>
  )
}

export default AddBlog
