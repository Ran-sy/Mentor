import React, { useEffect, useState } from 'react';
import '../style.css'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Error, Success } from '../../../components/Toast';
import { Localhost } from '../../../config/api';

const OpportunitiesFilter = (props) => {
    const user = useSelector(state => state.currentUser);
    const [filterProductList, setFilterProductList] = useState([])
 
    useEffect(() => {
        axios.defaults.withCredentials = true;
        const getOpportunities = async () => {
            
            await axios
              .get(`${Localhost}/api/opp/opp`, { withCredentials: true })
              .then((res) => {
                const filtered = res.data.data.filter((mentee) => {
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
                    if( props.locvalue === "null" ){
                        return (x )}
                    return (x && mentee.location === props.locvalue && (mentee.duration - 1 <= props.maxValue && mentee.duration - 1 >= props.minValue) && (props.Certifiacte ? mentee.certificate : true))
                })
                setFilterProductList(filtered)
              })
              .catch((error) => {
                Error(error.message);
              });
        }
        getOpportunities()
    }, []);

    const applyForOpp = async (id) => {
        await axios.patch(`${Localhost}/api/auth/applicant/opp/${id}`)
        .then(() =>{
          Success('Applied Successfully')
        })
        .catch((e)=>{Error(e.message);})
      }

    return (
        <>
            {
                filterProductList.map((OpportOne) => {
                    return <div className='col-md-6 col-12 pt-4' key={OpportOne._id}>
                        <div className='border   rounded-3 p-3' style={{ borderColor: "#c3c3c3" }}>
                            <div className='d-flex justify justify-content-between '>
                                <div className='info'>
                                    <h3 className='small fw-bold moblie-font' >{OpportOne.title}</h3>
                                    <p className='small text-muted moblie-font' >Get Mentored by : <span className='fw-bold'>{OpportOne.owner.name}</span></p>
                                </div>
                                <div className='req '>
                                    {(OpportOne?.applicants?.indexOf(user?._id) === -1) && (OpportOne?.owner !== user?._id)
                                    ?<button className="text-white text-respon bg-main-color  small d-block border-0 w-100 mt-1  rounded-pill" onClick={()=>applyForOpp(OpportOne._id)}> Apply </button>
                                    :<button className="text-white text-respon bg-main-color  small d-block border-0 w-100 mt-1  rounded-pill" > Applied </button>}
                                    <Link to={'/ShowOpp/'+OpportOne._id}> <button className='text-white text-respon bg-main-color small d-block border-0 w-100 mt-1 rounded-pill'>View</button></Link>
                                </div>
                            </div>
                            <div className='skills mt-3'>
                                {OpportOne.certificate ? <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Certifiacte </span> : <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Not Certifiacte </span>}
                                <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>{OpportOne.location}</span>
                                <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>{OpportOne.duration/30} Months</span>
                                {OpportOne.paid.isPaid ? <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Paid</span> : <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Not Paid</span>}
                                {OpportOne.getHired ? <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Might get hired</span> : <span className='me-1 me-md-2 mt-2 d-inline-block moblie-font py-1 small px-3 rounded-pill bg-secondaryColor text-white'>Not Availlable For Hiring</span>}

                            </div>
                            <div className='mt-4 small'>
                                <p className=''>{OpportOne.description}</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    );
}

export default OpportunitiesFilter;