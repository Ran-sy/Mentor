import React from "react";
import {useState} from 'react';
import {useEffect} from "react";
import "./style.css";
import SidaNav2 from "../showReq/sideBar";
import Comments from "../../components/comments/Comments";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Localhost } from "../../config/api";
import Info from "./userInfo";
import { PiCertificateBold } from "react-icons/pi"
import { MdLocationOn } from "react-icons/md"
import { MdOutlineAttachMoney } from "react-icons/md"
import { FaRegClock } from "react-icons/fa"
import { PiBagBold } from "react-icons/pi"

// import Comments from '../comments/Comments'

function ShowOpp() {

    
    
    const [data, setData] = useState([])
    const [datainfo, setDataInfo] = useState([])
    const { id } = useParams();

    useEffect(() => {
        const getOpp = async () => {
            try {
                const response = await axios.get(`${Localhost}/api/opp/opp/${id}`, {
                    withCredentials: true,
                });
                setData(Array.isArray(response.data) ? response.data : [response.data]);
                // console.log(Array.isArray(response.data) ? response.data : [response.data]);
                setDataInfo([response.data[0].owner])
            } catch (error) {
                console.log(error);
            }
        };
        getOpp();
    }, [id]);
    console.log(data)

    let message;
    let backgroundColor;
    let textColor;
    if (data.progress === "close") {
      message = "Closed Mentoring opportunity";
      backgroundColor = "red";
      textColor = "white";
    } else  if (data.progress==="open"){
      message = "Open mentoring";
      backgroundColor = "green";
      textColor = "white";
    } else{
        message = "in progress mentoring";
      backgroundColor = "brown";
      textColor = "white";

    }

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="RequestMentor2">
            {data && data.map((items) => (
                <div className="container mt-4">
                    <div className="row">
                        <div className="col col-lg-3 d-none d-lg-block">
                            <div className="Left-Request d-sm-flex d-none justify-content-start align-items-start">
                                <SidaNav2 />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="Right-Request ">
                                <div className="right-green-title-box d-flex justify-content-end align-items-center ">
                                    <div className="right-green-title text-white  text-center " style={{
                                        backgroundColor,
                                        color: textColor,
                                         
                                        }}>

                                     <span> {message} </span>
                                    </div>
                                </div>
                                <div className="Left-Request-Top m-2 ">

                                    <div className="Left-Request-Top-container d-flex  ">
                                        <div className="Left-Request-Top-left d-flex flex-column mx-2">
                                            <div className=" d-sm-flex flex-sm-column d-none nameInfo">
                                                <h5 style={{ marginTop: '30px' }}>{items.title || "Website Ui design implementation"}</h5>
                                                <span className="d-flex ">
                                                    {datainfo.map((item) => (
                                                        <h5 className="mr-3">
                                                            Get mentored by :
                                                            <span className="blue-color"> {item.name}</span>{" "}
                                                        </h5>
                                                    ))
                                                    }

                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="lh-base des mt-5 descriptionOfPerson">
                                    <p>{items.description}</p>
                                </div>

                                <div className=" flex-wrap my-3 text-capitalize listOfInfo">
                                    <div className="containerFlex">
                                        <div>
                                            <p className="info1 my-2 d-flex">
                                                <span className="me-1 d-flex">
                                                    <PiCertificateBold className="iconReact" />{" "}
                                                    certificate:
                                                </span>
                                                <span className="data1">{items.certificate}</span>
                                            </p>
                                            <p className="info1 my-2 d-flex">
                                                <span className="me-1 d-flex">
                                                    <MdOutlineAttachMoney className="iconReact" />{" "}
                                                    paid:
                                                </span>
                                                <span className="data1">{items.paid.amount} {items.paid.currency}</span>
                                            </p>
                                        </div>

                                        <div>
                                            <p className="info1 my-2 d-flex">
                                                <span className="me-1 d-flex">
                                                    <MdLocationOn className="iconReact" />{" "}
                                                    location:
                                                </span>
                                                <span className="data1">{items.location}</span>
                                            </p>
                                            <p className="info1 my-2 d-flex">
                                                <span className="me-1 d-flex">
                                                    <FaRegClock className="iconReact" />{" "}
                                                    Duration:
                                                </span>
                                                <span className="data1">{items.duration} months</span>
                                            </p>
                                        </div>

                                        <div>
                                            {data.map((items) => (
                                                <p className="info1 my-2 d-flex">
                                                    <span className="me-1 d-flex">
                                                        <PiBagBold className="iconReact" />{" "}
                                                        Might get hired:
                                                    </span>
                                                    <span className="data1">{items.getHired}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="listOfExperience">
                                    <div className="Left-Request-Top-left-parags-1 py-2">
                                        <h5 className="data1 text-capitalize fw-bold">
                                            responsibilities
                                        </h5>
                                        <ul>
                                            <li>
                                                {items.responsibilities.map((q, i) => (
                                                    <li key={i}>{q}</li>
                                                ))}{" "}
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="data1 text-capitalize fw-bold">
                                            requirements
                                        </h5>
                                        <ul>
                                            {items.requirements.map((q, i) => (
                                                <li
                                                    key={i}
                                                >{q}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="Left-Request-Top-left-parags-3 py-2 ">
                                        <h5 className="data1 text-capitalize fw-bold">
                                            Expected outcome
                                        </h5>
                                        <ul>
                                            <li>
                                                {items.expOutcome.map((q, i) => (
                                                    <li key={i}>{q}</li>
                                                ))}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <Info />
                                <Comments />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default ShowOpp;











