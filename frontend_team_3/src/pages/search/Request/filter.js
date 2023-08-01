import React, { useEffect, useState } from 'react';
import '../style.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Localhost } from '../../../config/api';
import { loginFailure } from '../../../features/user';

const RequestsFilter = (props) => {
    const [filterArr, setFilterArr] = useState([]);
    const user = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
   
    useEffect(() => {
        const getRequests = async () => {
            await axios
              .get(`${Localhost}/api/req/request`, { withCredentials: true })
              .then((response) => {
                setFilterArr(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
        }
        getRequests()
    }, []);
    let filterReqList = filterArr.filter((mentee) => {
        let x;
        if (props.Paid && props.lookingJob) {
            x = mentee.paid.isPaid && mentee.lookingJob;
        } else if (props.Paid || props.lookingJob) {
            if (props.Paid) {
                x = mentee.paid.isPaid
            }
            else if (props.lookingJob) {
                x = mentee.lookingJob
            }
        } else {
            x = mentee
        }
        return (
            x && mentee.location === props.locvalue && (mentee.duration - 1 <= props.maxValue && mentee.duration - 1 >= props.minValue)
        );
    });
    return (
        <>
            {filterReqList.map((filterOne) => {
                return (
                    <div key={filterOne._id} className='col-12 pt-4'>
                        <div
                            className='rounded p-4'
                            style={{ backgroundColor: '#e6f2f2' }}
                        >
                            <div className='d-flex flex-column  flex-md-row justify justify-content-between '>
                                <div className='info ' style={{ flexBasis: '50%' }}>
                                    <h3 className='fw-bold h5 text-sec-color moblie-font-req'>
                                        Front end development
                                    </h3>
                                    <p className='small fw-bold  '>
                                        {filterOne.title}{' '}
                                        <span className='text-sec-color w-50'>
                                            {' '}
                                            is looking for a mentor
                                        </span>
                                    </p>
                                    <p className='small lh-sm  mt-4 mb-md-3 mb-1'>
                                        i'm a recent computer science graduate from khartom
                                        university , intrested in front end development and Ui / UX
                                        looking for a mentor to guide me through becoming a
                                        proficional fornt end developer
                                    </p>
                                    <p className='fw-bold small'>...Read more</p>
                                </div>
                                <div
                                    className='req flex-column-reverse d-flex flex-md-column justify-content-between'
                                    style={{ flexBasis: '50%' }}
                                >
                                    <div className='text-end moblie-font-req'>
                                        <Link to='/reqShowpage'>
                                            <button className='me-2 custom-padding text-respon text-white bg-main-color d-inline-block border-0 small custom-padding rounded-pill'>
                                                View details
                                            </button>
                                            <button className=' bg-main-color text-white  text-respon custom-padding small d-inline-block border-0  mt-1  rounded-pill'>
                                                Mentor
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='d-flex justify-content-around mb-4 moblie-font-req mt-4 mt-md-0'>
                                        <div>
                                            <p>
                                                <span className='text-sec-color fw-bold'>
                                                    Duration
                                                </span>
                                                : {filterOne.duration} Month
                                            </p>
                                            <p>
                                                <span className='text-sec-color fw-bold'>
                                                    Looking for a job:{' '}
                                                </span>{' '}
                                                {filterOne.lookingJob ? 'yes' : 'no'}
                                            </p>
                                        </div>
                                        <div className=''>
                                            <p>
                                                {' '}
                                                <span className='text-sec-color fw-bold'>Paid</span>:{' '}
                                                {filterOne.paid.isPaid ? 'yes' : 'no'}{' '}
                                            </p>
                                            <p>
                                                <span className='text-sec-color fw-bold'>
                                                    Experince
                                                </span>{' '}
                                                : {filterOne.experience}{' '}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default RequestsFilter;

