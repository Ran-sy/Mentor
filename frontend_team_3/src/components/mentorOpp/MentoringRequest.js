import React, { useState, useEffect } from "react";
import "./mentoropp.css";
import Items from "./Items";
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Error, Success } from '../Toast';
import axios from "axios";
import { Localhost } from "../../config/api";

const MentoringRequest = () => {
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.currentUser);
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const getMenteeRequests = async () => {
      if(!user.tokens[0]) {
        return console.log('please login first')
      }
      document.cookie = 'accessToken=' + user?.tokens[0]
        axios.get(`${Localhost}/api/req/request/owner/${user._id}`)
        .then((res)=>{
          setData(res.data)
        }).catch(e=>Error('unable get requests: ' + e.message))
    }
    getMenteeRequests()
  }, []);

  const removeItem = (index, item) => {
    axios.delete(`${Localhost}/api/req/request/${item._id}`)
    .then(res=>{
      Success('deleted successfully '+item._id)
      setData(res.data)
      setData(data.filter((_, i) => i !== index))
    }).catch(e=>Error('unable delete request: ' + e.message))
  }

  return (
    <div>
      <aside>
        <div className="dff">
          <p>User Profile</p>
          <p>Settings</p>
          <p>Terms and Privacy</p>
          <p className="mentor">My Mentoring Requests</p>
          <p>
            New Mentoring Request &nbsp;
            <Link to='/PostRequest'>
              {/* <i className="fas fa-plus-square icon1"></i> */}
              <FaPlusSquare className="add-request icon1" />
            </Link>
          </p>
        </div>
      </aside>
      <section className='mentoringsection'>
        <p className="hidden">Applications</p>
        {
        data?.map((item, i) => (
          <Items item={item} key={item._id} removeItem={() => removeItem(i, item)} />))
        }
      </section>
    </div>
  );
};

export default MentoringRequest;
