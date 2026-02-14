import React, {useState} from 'react'
import axios from 'axios'
// import API_BASE_URL from '../api/myApi'
import { API_BASE_URL } from '../api/myApi'
import Loader from './Loader'
import Swal from 'sweetalert2'


const AddRoomPage = () => {
    const [name, setName] = useState('')
    const [rentperday, setRentperday] = useState('')
    const [maxcount, setMaxcount] = useState('')
    const [description, setDescription] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [type, setType] = useState('')
    const [imageurl1, setImageurl1] = useState('')
    const [imageurl2, setImageurl2] = useState('')
    const [imageurl3, setImageurl3] = useState('')
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    const addRoom = async()=>{

        const newRoom ={
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3]
        }

        try {
            setLoading(true)
            const response = await axios.post(`${API_BASE_URL}/api/hotel/addroom`, newRoom)
            setLoading(response.data)
            Swal.fire('Congratulations','New Room Added Successfully','success').then(response=>{
                window.location.href = '/home'
            })
        } catch (error) {
            console.log(error);
            setError(error)
            Swal.fire('Oops','Failed To Add New Room','error')
        } finally {
            setLoading(false)
        }
    }


  return (
    <div className='row'>
        {loading && <Loader/>}

        <div className='col-md-5'>
            <input type="text" placeholder='name' className='form-control'
            value={name} onChange={(e)=>setName(e.target.value)}/>
            
            <input type="text" placeholder='rentperday' className='form-control'
            value={rentperday} onChange={(e)=>setRentperday(e.target.value)}/>

            <input type="text" placeholder='maxcount' className='form-control'
            value={maxcount} onChange={(e)=>setMaxcount(e.target.value)}/>

            
            <input type="text" placeholder='description' className='form-control'
            value={description} onChange={(e)=>setDescription(e.target.value)}/>

            <input type="text" placeholder='phonenumber' className='form-control'
            value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)}/>
        </div>



        <div className='col-md-5'>
            <input type="text" placeholder='type' className='form-control'
            value={type} onChange={(e)=>setType(e.target.value)}/>
            
            <input type="text" placeholder='image url 1' className='form-control'
            value={imageurl1} onChange={(e)=>setImageurl1(e.target.value)}/>

            <input type="text" placeholder='image url 2' className='form-control'
            value={imageurl2} onChange={(e)=>setImageurl2(e.target.value)}/>
            <input type="text" placeholder='image url 3' className='form-control'
            value={imageurl3} onChange={(e)=>setImageurl3(e.target.value)}/>

            <div className='text-right'>
                <button className='btn btn-primary mt-2' onClick={addRoom} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Room'}
                </button>
            </div>
            
        </div>
      
    </div>
  )
}

export default AddRoomPage
