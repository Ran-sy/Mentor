import React, { useState, useEffect } from 'react';
import './mentoropp.css'
import Items from './Items';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Localhost } from "../../config/api";

const MentoringOpportunities = () => {
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.currentUser);
  const [data, setData] = useState([]);

  useEffect(() => {
    const config = {
      headers: { 'Cookie': `accessToken=${user?.tokens[0]}` },
    };
    const getMentorOpp = async () => {
      if(!user.tokens[0]) {
        return console.log('please login first')
      }
      try{
        axios.get(`${Localhost}/api/opp/opp/owner/${user._id}`, config)
        .then((res, err)=>{
          if(err) console.log('error getting data..', err.message)
          setData(res.data)
        })
      }catch(e){
          console.log('unable get requests: ' + e)
      }
    }
    getMentorOpp()
  }, []);

  const removeItem = (index, item) => {
    const config = {
      headers: { 'Cookie': `accessToken=${user.tokens[0]}`, },
    };
    try{
      axios.delete(`${Localhost}/api/opp/opp/${item._id}`, config)
      .then((res, err)=>{
        if(err) console.log('error deleting data..', err.message)
        console.log('deleted successfully ', item._id)
        setData(res.data)
        setData(data.filter((_, i) => i !== index))
      })
    }catch(e){
        console.log('unable delete opportunity: ' + e.message)
    }
  }

  return (
    <div style={{position:'relative'}}>
      <aside>
        <div className="dff">
          <p>User Profile</p>
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
