import React, { useEffect, useState } from 'react';
import '../style.css'
import img0 from '../../../assets/images/computer-g8dee30bb2_1280.jpg'
import { BiSolidStar } from "react-icons/bi"
import axios from 'axios';
import { Localhost } from '../../../config/api';

const FilterMenotrs = (props) => {
  axios.defaults.withCredentials = true;
  const [filterProductList, setFilterProductList] = useState([])

    useEffect(() => {
        const getMentors = async () => {
            console.log('mentor', props)
            await axios
                .get(`${Localhost}/api/v1/mentorProfile`, { withCredentials: true })
                .then((res) => {
                    const filtered = res?.data?.filter((mentee) => {
                        let x;
                        if (props.locvalue) {
                        x = mentee.location;
                        } else {
                        x = mentee;
                        }
                        if( props.locvalue === "null" || props.yearsOfExperence === null ){
                            if(props.yearsOfExperence === null && props.locvalue==="null")
                            return(x)
                            if(props.yearsOfExperence === null)
                            return (x && mentee.location !== props.locvalue)
                            if(props.locvalue === "null")
                            return (x && mentee.location !== props.locvalue && (mentee.yearsOfExperence - 1 <= props.maxValue && mentee.yearsOfExperence - 1 >= props.minValue))
                        }
                        return (
                        x &&
                        mentee.location === props.locvalue &&
                        (mentee.yearsOfExperence - 1 <= props.maxValue && mentee.yearsOfExperence - 1 >= props.minValue)
                        );
                    })
                    setFilterProductList(filtered)
                })
                .catch((error) => {
                    Error(error.message);
                });
        };
        getMentors();
    }, []);
    return (
        <>
            {
                filterProductList.map((mentorOne) => {
                    return <div className='col-md-4 col-12 pt-4' key={mentorOne._id}>
                        {/* Mentor Persons */}
                        <div className={`mentorPersons mentorPersons position-relative`}>
                            <img src={img0} alt="img"/>
                            <div className=' info bg-white d-inline-flex  justify-content-center align-items-center rounded position-absolute bottom-0 start-0 ms-2 mb-2 p-1'>
                                <BiSolidStar className='text-main-color  text-small' />
                                <span className='fw-bold  text-small'>{mentorOne.rating}</span>
                                <span className='text-muted text-small '>({mentorOne.reveiew} reveiews)</span>
                            </div>
                        </div>
                        {/* Mentor Info */}
                        <div>
                            <p className='my-2 fw-bold'>{mentorOne.user.name}</p>
                            <p className='text-muted text-small'>{mentorOne.title}</p>
                        </div>
                    </div>
                })
            }
        </>
    );
}

export default FilterMenotrs;