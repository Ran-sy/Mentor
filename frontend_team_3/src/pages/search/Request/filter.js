import React, { useEffect, useState } from 'react';
import '../style.css'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Error, Success } from '../../../components/Toast';
import { Localhost } from '../../../config/api';

const RequestsFilter = (props) => {
    const user = useSelector(state => state.currentUser);
    const [filterProductList, setFilterProductList] = useState([])
   
    useEffect(() => {
        axios.defaults.withCredentials = true;
        const getRequests = async () => {
            await axios
              .get(`${Localhost}/api/req/request`, { withCredentials: true })
              .then((response) => {
                const filtered = response.data[0].filter((mentee) => {
                    let x;
                    if (props.Availlable) {
                        x =mentee.lookingJob;
                    }else {
                        x = mentee
                    }
                    if( props.locvalue === "null" ){
                        return (x && mentee.location !== props.locvalue && (mentee.duration - 1 <= props.maxValue && mentee.duration - 1 >= props.minValue))}
                    return (
                        x && mentee.location === props.locvalue && (mentee.duration - 1 <= props.maxValue && mentee.duration - 1 >= props.minValue)
                    );
                });
                setFilterProductList(filtered)
              })
              .catch((error) => {
                Error(error.message)
              });
        }
        getRequests()
    }, []);

    const applyForReq = async (id) => {
        await axios.patch(`${Localhost}/api/auth/applicant/request/${id}`)
        .then(() =>{
        Success('Applied Successfully')
        })
        .catch((e)=>{Error(e.message);})
    }

    return ( <>
        {filterProductList.map((filterOne) => { return (
            <div key={filterOne._id} className='col-12 pt-4'>
                <div className='rounded p-4' style={{ backgroundColor: '#e6f2f2' }} >
                    <div className='d-flex flex-column  flex-md-row justify justify-content-between '>
                        <div className='info ' style={{ flexBasis: '50%' }}>
                            <h3 className='fw-bold h5 text-sec-color moblie-font-req'> {filterOne.title} </h3>
                            <p className='small fw-bold  '>
                                {filterOne?.owner?.name ||"user"}{' '}
                                <span className='text-sec-color w-50'> {' '}  is looking for a mentor </span>
                            </p>
                            <p className='small lh-sm  mt-4 mb-md-3 mb-1'> {filterOne.description} </p>
                            <p className='fw-bold small'>...Read more</p>
                        </div>
                        <div className='req flex-column-reverse d-flex flex-md-column justify-content-between' style={{ flexBasis: '50%' }} >
                            <div className='text-end moblie-font-req'>
                                <Link to={'/ShowReq/'+filterOne._id}>
                                    <button className='me-2 custom-padding text-respon text-white bg-main-color d-inline-block border-0 small custom-padding rounded-pill'>View details</button>
                                </Link>
                                {(filterOne?.applicants?.indexOf(user?._id) === -1) && (filterOne?.owner !== user?._id)
                                ?<button className="bg-main-color text-white  text-respon custom-padding small d-inline-block border-0  mt-1  rounded-pill" onClick={()=>applyForReq(filterOne._id)}> Apply </button>
                                :<button className="bg-main-color text-white  text-respon custom-padding small d-inline-block border-0  mt-1  rounded-pill" > Applied </button>}
                            </div>
                            <div className='d-flex justify-content-around mb-4 moblie-font-req mt-4 mt-md-0'>
                                <div>
                                    <p>
                                      <span className='text-sec-color fw-bold'> Duration </span> : {filterOne.duration / 30} Month
                                    </p>
                                    <p>
                                        <span className='text-sec-color fw-bold'> Looking for a job:{' '} </span>{' '}
                                        {filterOne.lookingJob ? 'yes' : 'no'}
                                    </p>
                                </div>
                                <div className=''>
                                    <p>
                                        {' '} <span className='text-sec-color fw-bold'>Paid</span>:{' '}
                                        {filterOne.paid.isPaid ? 'yes' : 'no'}{' '}
                                    </p>
                                    <p>
                                        <span className='text-sec-color fw-bold'> Experince </span>{' '}
                                        : {filterOne.experience.map(exp=>{
                                            return (exp + " ")
                                        })}{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );})}
    </> );
};

export default RequestsFilter;

