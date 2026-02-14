import React, { useState, useEffect } from "react";
import axios from "axios";
import Rooms from "../components/Rooms";
import Loader from "../components/Loader";
import { API_BASE_URL } from '../api/myApi'
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const [rooms, setRooms] = useState([]);
  const [originalRooms, setOriginalRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  //search field useState
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/hotel/getallrooms`);
        setRooms(response.data);
        setOriginalRooms(response.data);
        console.log("Total posts:", response.data.length);
      } catch (error) {
        setError("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  //search input function
  const filteredBySearch=()=>{
    if (searchKey === '') {
      setRooms(originalRooms);
    } else {
      const filtered = originalRooms.filter(room => room.name.toLowerCase().includes(searchKey.toLowerCase()));
      setRooms(filtered);
    }
  }
 
  return (
    <div className="container">
      <div className="row mt-5 justify-content-between bs">
        <div className="col-md-3 m-auto">
          <RangePicker
            format={"DD-MM-YYYY"}
            onChange={(dates) => {
              if (dates && dates[0] && dates[1]) {
                setFromDate(dates[0].format("YYYY-MM-DD"));
                setToDate(dates[1].format("YYYY-MM-DD"));
              }
            }}
          />
        </div>

        <div className="col-md-5 m-auto">
          <input type="text" className="form-control" placeholder="search rooms"
          value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} onKeyUp={filteredBySearch}
          />
        </div>
        
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          rooms.map((room, index) => (
            <div className="col-md-9 mt-2" key={index}>
              <Rooms room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Homescreen;
