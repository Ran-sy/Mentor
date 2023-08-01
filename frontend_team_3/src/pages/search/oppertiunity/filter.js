import React, { useEffect, useState } from 'react';
import '../style.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Localhost } from '../../../config/api';
import { loginFailure } from '../../../features/user';

const OpportunitiesFilter = (props) => {
    const [filterOpp, setFilterOpp] = useState([]);
    const user = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
 
    useEffect(() => {
        const getOpportunities = async () => {
            
            await axios
              .get(`${Localhost}/api/opp/opp`, { withCredentials: true })
              .then((res) => {
                setFilterOpp(res.data.data);
              })
              .catch((error) => {
                console.log(error);
              });
        }
        getOpportunities()
    }, []);
    let filterOppList = filterOpp.filter((mentee) => {
        let x;
        if (props.Certificate && props.Paid && props.getHired) {
            x = mentee.certificate && mentee.paid.isPaid && mentee.getHired
        }
        else if (props.Certificate || props.Paid || props.getHired) {
            if (props.Certificate) {
                x = mentee.certificate
            }
            if (props.Paid) {
                x = mentee.paid.isPaid
            }
            if (props.getHired) {
                x = mentee.getHired
            }
        }
        else {
            x = mentee
        }
        return (x && mentee.location === props.locvalue && (mentee.duration - 1 <= props.maxValue && mentee.duration - 1 >= props.minValue) && (props.Certifiacte ? mentee.certificate : true))
    })
    return (
        <>
            {
                filterOppList.map((OpportOne) => {
                    return <div className='col-md-6 col-12 pt-4' key={OpportOne._id}>
                        <div className='border   rounded-3 p-3' style={{ borderColor: "#c3c3c3" }}>
                            <div className='d-flex justify justify-content-between '>
                                <div className='info'>
                                    <h3 className='small fw-bold moblie-font' >Website UI design implementaion</h3>
                                    <p className='small text-muted moblie-font' >Get Mentored by : <span className='fw-bold'>{OpportOne.title}</span></p>
                                </div>
                                <div className='req '>
                                    <button className=' custom-padding text-white text-respon  bg-main-color d-block border-0 small custom-padding rounded-pill'>Request</button>
                                    <Link to='/oppShowpage'> <button className='text-white text-respon bg-main-color  small d-block border-0 w-100 mt-1  rounded-pill'>View</button></Link>
                                </div>
                            </div>
                            <div className='skills mt-3'>
                                {OpportOne.certificate ? <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Certifiacte </span> : <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Not Certifiacte </span>}
                                <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>{OpportOne.location}</span>
                                <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>{OpportOne.duration} Months</span>
                                {OpportOne.paid.isPaid ? <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Paid</span> : <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Not Paid</span>}
                                {OpportOne.getHired ? <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Might get hired</span> : <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Not Availlable For Hiring</span>}

                            </div>
                            <div className='mt-4 small'>
                                <p className=''>looking for someone who's intrested in project managment related tasks</p>
                                <p className=''>and who's eagre to gain knowledge and have fun during the experince !</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    );
}

export default OpportunitiesFilter;