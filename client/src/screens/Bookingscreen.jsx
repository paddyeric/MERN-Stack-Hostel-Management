import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams
import { API_BASE_URL } from '../api/myApi'
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import Swal from "sweetalert2";



const Bookingscreen = () => {
  const { roomid, fromDate, toDate } = useParams(); // Get roomid, fromDate, and toDate from URL params
  const [room, setRoom] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalamount, setTotalAmount] = useState();

  const fromdate = moment(fromDate, "DD-MM-YYYY");
  const todate = moment(toDate, "DD-MM-YYYY");
  const totaldays = moment(fromdate + todate).days();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/hotel/getroomsbyid`,
          { roomid: roomid },
        );
        setRoom(response.data);
        console.log("Room data:", response.data);
        setTotalAmount(response.data.rentperday * totaldays);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching room data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (roomid) {
      fetchData();
    }
  }, [roomid]);

  const bookRoom = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please login to book a room");
      return;
    }

    const bookingDetails = {
      room,
      userid: currentUser._id,
      fromdate: fromdate.format("DD-MM-YYYY"),
      todate: todate.format("DD-MM-YYYY"),
      totalamount,
      totaldays,
    };
    try {
      const result = await axios.post(
        `${API_BASE_URL}/api/bookings/bookroom`,
        bookingDetails,
      );
      Swal.fire(
        "Congratulations",
        "Your Room Booked Successfully",
        "success",
      ).then((result) => {
        window.location.href = "/bookings";
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Please Select Date To Proceed", "error");
    }
  };

  return (
    <div className="m-5">
      {loading && <Loader />}
      {error && <Error />}

      {room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6" style={{ textAlign: "right" }}>
            <p>
              <strong>Room Name:</strong> {room.name || "N/A"}
            </p>
            <img src={room.imageurls[0]} className="bigimg" />
          </div>

          <div className="col-md-6" style={{ textAlign: "right" }}>
            <h2>Booking Details</h2>
            <p>
              <b>Name:</b>
              {JSON.parse(localStorage.getItem("currentUser")).name}
            </p>
            <p>
              <b>From Date:</b> {fromDate}
            </p>
            <p>
              <b>To Date:</b> {toDate}
            </p>
            <p>
              <b>Max Count:</b> {room.maxcount || "N/A"}
            </p>

            <div>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total days: {totaldays}</p>
                <p>Rent per day: {room.rentperday}</p>
                <p>Total Amount: {totalamount}</p>
              </b>
            </div>

            <div>
              <button
                className="btn btn-primary"
                style={{ float: "right" }}
                onClick={bookRoom}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No room data found</p>
      )}
    </div>
  );
};

export default Bookingscreen;
