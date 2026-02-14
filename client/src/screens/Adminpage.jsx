import { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { API_BASE_URL } from '../api/myApi'
import Loader from "../components/Loader";
import AddRoomPage from "../components/AddRoomPage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Adminpage = () => {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

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
          <Rooms />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="3">
          <Users />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add Room" key="4">
          <AddRoomPage />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Adminpage;

//Bookings
export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/bookings/getallbookings`,
        );
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bs">
              <TableRow>
                <TableCell>Booking Id</TableCell>
                <TableCell>User Id</TableCell>
                <TableCell>Rooms</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.length &&
                bookings.map((booking, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{booking._id}</TableCell>
                    <TableCell>{booking.userid}</TableCell>
                    <TableCell>{booking.room}</TableCell>
                    <TableCell>{booking.fromdate}</TableCell>
                    <TableCell>{booking.todate}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
        const response = await axios.get(
          `${API_BASE_URL}/api/hotel/getallrooms`,
        );
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bs">
              <TableRow>
                <TableCell>Room Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Rent Per day</TableCell>
                <TableCell>Max Count</TableCell>
                <TableCell>Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.length &&
                rooms.map((room, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{room._id}</TableCell>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>{room.rentperday}</TableCell>
                    <TableCell>{room.maxcount}</TableCell>
                    <TableCell>{room.phonenumber}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

//Users
export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/users/getallusers`,
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h3>Users</h3>

        {loading && <Loader />}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bs">
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Is Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length &&
                users.map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isAdmin ? "YES" : "NO"}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
