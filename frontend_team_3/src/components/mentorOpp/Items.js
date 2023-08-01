import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import axios from "axios";
import { Localhost } from "../../config/api";

const Items = ({ item, removeItem }) => {
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.currentUser);
  const [isShowList, setIsShowList] = useState(false)
  const [isHovering, setIsHovering] = useState(false);
  let [element, setElement] = useState({...item, doneOnce: false})

  useEffect(()=>{
    if(!user) return console.log('please login first')

    if(!element.doneOnce){
    let storedApplicants = [];
      element.applicants.forEach( async (applicant, i) => {
      const config = {
        headers: { 'Cookie': `accessToken=${user.tokens[0]}`, },
      };
      try{
        const res = await axios.get(`${Localhost}/api/v1/mentorProfile/user/${applicant}`, config)
        const res1 = await axios.get(`${Localhost}/api/auth/user/${applicant}`, config)
        storedApplicants.push({
          _id: applicant,
          designation: res?.data?.designation || "Front end developer",
          avatar: res?.data?.avatar || "https://image.lexica.art/md2/37d7fb15-eed3-472b-bbae-57240a15704a",
          name: res1.data?.name || "Balquees Hamdi",
        })
      }catch{
        storedApplicants.push({
          _id: applicant,
          name: "Balquees Hamdi",
          avatar: "https://image.lexica.art/md2/37d7fb15-eed3-472b-bbae-57240a15704a",
          designation: "Front end developer",
        })
      }
      })

    let status = "Closed";
    if(element.progress === "in progress")
      status = "In progress";
    else if(element.progress === "open")
      status = "Published";

    setElement({
      ...element, 
      progress: status, 
      doneOnce: true,
      applicants: storedApplicants
    })
    }
    console.log(element) 
  }, [])

  const acceptApplicant = async(acceptedUser) => {
    const config = {
      headers: { 'Cookie': `accessToken=${user.tokens[0]}`, },
    };
    const url = user.role === 'mentee' 
    ?`${Localhost}/api/auth/accept/request`
    :`${Localhost}/api/auth/accept/opp`
    try{
      const res = await axios.patch(url,{
        id: element._id,
        acceptedUser
      }, config)
      console.log(res.data, 'accepted success')
      window.location.reload()
    }catch(e){
        console.log('unable accept applicant: ' + e)
    }
  }

  const rejectApplicant = async(rejectedUser) => {
    const config = {
      headers: { 'Cookie': `accessToken=${user.tokens[0]}`, },
    };
    const url = user.role === 'mentee' 
    ?`${Localhost}/api/auth/reject/request`
    :`${Localhost}/api/auth/reject/opp`
    try{
      const res = await axios.patch(url,{
        id: element._id,
        rejectedUser
      }, config)
      console.log(res.data, 'reject success')
      window.location.reload()
    }catch(e){
        console.log('unable reject applicant: ' + e)
    }
  }

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <div className="published1" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
        <div className="details d1" >
          <div>{element?.title}</div>
          <div className="updated">
            <div className="date1">{element?.createdAt?.toString()?.split('T')[0]}</div>
            <div className="status1">{element?.progress}</div>
          </div>
        </div>
        <div className="buttons1 b1">
          <button className="btn1" onClick={() => setIsShowList(!isShowList)}>
            {item?.applicants?.length || 0} Requests
          </button>
          {isHovering && <FontAwesomeIcon icon={faTrash} className='trash' onClick={removeItem} />}
        </div>
      </div>
      {isShowList && (
        element.applicants.map((child) => (
          <div className="disapear1_inprogress" key={child._id}>
            <div className="developer1">
              <div className="details1">
                <img className="img1" src={child.avatar} alt="logo" />
                <div className="content">
                  <p className="cyan">{child?.name}</p>
                  <p>{child.designation}</p>
                </div>
              </div>
              {element.acceptedBy
              ?(element.acceptedBy !== child._id
              ?<div className="buttons1 bb1"></div>
              :<button className="btn2">Accepted</button>)
              :<div className="buttons1 bb1">
                <button className="btn2" onClick={()=>acceptApplicant(child._id)}>Accept</button>
                <button className="btn3" onClick={()=>rejectApplicant(child._id)}>Reject</button>
              </div>}
            </div>
          </div>
        ))
      )
      }
    </>

  )
}

export default Items