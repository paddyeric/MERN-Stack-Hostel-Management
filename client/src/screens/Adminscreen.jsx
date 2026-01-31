import { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import AddRoomPage from "../components/AddRoomPage";
import { API_BASE_URL } from '../api/myApi'

const Adminscreen = () => {

    useEffect(()=>{

        if(!JSON.parse(localStorage.getItem('currentUser')).isAdmin){
            window.location.href='/home'
        }

    },[])


  return (
    <div className="mt-3 mx-3 bs">
      <h2 className="text-center">
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          <Bookings />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Rooms" key="2">
          <Rooms/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add Room" key="3">
          <AddRoomPage/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="4">
          <Users/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Adminscreen;




//Bookings
export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/bookings/getallbookings`);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">

        <h3>Bookings</h3>

        {loading && <Loader />}

        <div class="table-responsive">
        <table class="table table-bordered table-dark">
            <thead className="bs">
                <tr>
                    <th>Booking Id</th>
                    <th>User Id</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
            {bookings.length && (bookings.map((booking, index)=>{
                return <tr key={index}>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                </tr>
            }))}
            </tbody>
        </table>
        </div>
        
      </div>
    </div>
  );
};


//Rooms
export const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/hotel/getallrooms`);
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">

        <h3>Rooms</h3>

        {loading && <Loader />}

        <table className="table table-bordered table-dark">
            <thead className="bs">
                <tr>
                    <th>Room Id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Rent Per day</th>
                    <th>Max Count</th>
                    <th>Phone Number</th>
                </tr>
            </thead>

            <tbody>
            {rooms.length && (rooms.map((room)=>{
                return <tr key={rooms._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                </tr>
            }))}
            </tbody>
        </table>
        
      </div>
    </div>
  );
};


//Users
export const Users=()=>{

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(()=>{
        const fetchUsers = async()=>{
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users/getallusers`)
                setUsers(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error)
            } finally{
                setLoading(false)
            }
        }
        fetchUsers();
    },[])


    return(
        <div className="row">
            <div className="col-md-12">
                <h3>Users</h3>

                {loading && <Loader/>}

                <table className="table table-dark table-bordered">
                    <thead className="bs">
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>

                    <tbody>
                    {users.map((user)=>{
                        return <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.emai}</td>
                            <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}