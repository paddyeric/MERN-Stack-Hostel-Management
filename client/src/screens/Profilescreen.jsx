import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../api/myApi'
import Swal from "sweetalert2";

import { Tag } from "antd";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const Profilescreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h3>My Profile</h3>

          <br />

          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>isAdmin: {user.isAdmin ? "Yes" : "No"}</p>
        </TabPane>

        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profilescreen;

export const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/bookings/getbookingsbyuserid`,
          { userid: user._id },
        );
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Error fetching users", error);
        console.error("Error fetching users:", error);
      }
    };
    fetchBookings();
  }, [user._id]);

  const cancelBooking = async (bookingid, roomid) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/bookings/cancelbooking`,
        { bookingid, roomid },
      );
      console.log(response.data);
      Swal.fire(
        "Congratulations",
        "Your Booking Is Cancelled Successfully",
        "success",
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      setError(error);
      console.log(error);
      Swal.fire("Oops", "Could Not Cancel The Booking", "error");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="bs">
                <h4>{booking.room}</h4>
                <p>
                  <b>Booking Id:</b> {booking._id}
                </p>
                <p>
                  <b>From:</b> {booking.fromdate}
                </p>
                <p>
                  <b>To:</b> {booking.todate}
                </p>
                <p>
                  <b>Total Amount:</b> {booking.totalamount}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  {booking.status === "cancelled" ? (
                    <Tag color="red">CANCELLED</Tag>
                  ) : (
                    <Tag color="green">CONFIRMED</Tag>
                  )}
                </p>

                {booking.status !== "cancelled" && (
                  <div className="text-right">
                    <button
                      class="btn btn-primary"
                      onClick={() => cancelBooking(booking._id, booking.roomid)}
                    >
                      CANCEL BOOKING
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
};
