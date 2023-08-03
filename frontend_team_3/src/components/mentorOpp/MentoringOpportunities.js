import React, { useState, useEffect } from 'react';
import './mentoropp.css'
import Items from './Items';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Error, Success } from '../Toast';
import axios from "axios";
import { Localhost } from "../../config/api";

const MentoringOpportunities = () => {
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.currentUser);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMentorOpp = async () => {
      if(!user.tokens[0]) {
        return console.log('please login first')
      }
      document.cookie = 'accessToken=' + user?.tokens[0]?.slice(1, -1)
      axios.get(`${Localhost}/api/opp/opp/owner/${user._id}`)
      .then(res=>{
        setData(res.data)
      }).catch(e=>Error('unable get requests: ' + e))
    }
    getMentorOpp()
  }, []);

  const removeItem = (index, item) => {
    axios.delete(`${Localhost}/api/opp/opp/${item._id}`)
    .then(res=>{
      Success('deleted successfully ')
      setData(res.data)
      setData(data.filter((_, i) => i !== index))
    }).catch(e=>Error('unable delete opportunity: ' + e.message))
  }

  return (
    <div style={{position:'relative'}}>
      <aside>
        <div className="dff">
            <Link to={'/external'+user._id}>
          <p>User Profile</p>
              </Link>
          <p>Settings</p>
          <p>Terms and Privacy</p>
          <p className="mentor">My Mentoring Opportunities</p>
          <p>
            Post a new opportunity &nbsp;
            <Link to='/PostOpp'>
              <i className="fas fa-plus-square icon1"></i>
              </Link>
          </p>
        </div>
      </aside>
      <section className='mentoringsection'>
        <p className="hidden">Applications</p>
        {
        data?.map((item, i) => (
          <Items item={item} key={item._id} removeItem={() => removeItem(i, item)} />))}
         
      </section>
    </div>
  );
};

export default MentoringOpportunities;
