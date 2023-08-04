

import React, { useEffect, useState } from "react";
import "./style.css";
import SidaNav2 from "./sideBar";
import Mony from "@iconscout/react-unicons/icons/uil-dollar-alt";
import Location from "@iconscout/react-unicons/icons/uil-location-point";
import Time from "@iconscout/react-unicons/icons/uil-clock";
import Exp from "@iconscout/react-unicons/icons/uil-bag";
import Comments from "../../components/comments/Comments";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Localhost } from "../../config/api";
import { faClock, faDollarSign, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Info from "./userInfo";
// import Comments from '../comments/Comments'

function ShowReqest() {
  const { id } = useParams();
  const [data, setData] = useState([])
  const [datainfo, setDataInfo] = useState([])

  useEffect(() => {
    const getReq = async () => {
      try {
        const response = await axios.get(`${Localhost}/api/req/request/${id}`, {
          withCredentials: true,
        });

        setData(Array.isArray(response.data) ? response.data : [response.data]);
        setDataInfo([response.data[0].owner]);
      } catch (error) {
        console.log(error);
      }
    };
    getReq();
  }, [id]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div className="RequestMentor2">
        {data && data.map((item) => (
          <div className="container mt-4">
            <div className="row">
              <div className="col col-lg-3 d-none d-lg-block">
                <div className="Left-Request d-sm-flex d-none justify-content-start align-items-start">
                  <SidaNav2 />
                </div>
              </div>
              <div className="col-sm">
                <div className="Right-Request p-2 ">
                  <div className="right-green-title-box d-flex justify-content-end align-items-center ">
                    <div className="right-green-title text-white p-2 text-center ">
                      <span>{"mentoring request"} </span>
                    </div>
                  </div>
                  <div className="Left-Request-Top m-2">
                    <div className="Left-Request-Top-right d-flex w-25 justify-content-end align-items-end d-sm-flex d-none">
                      <button className="border-0 m-auto p-2 text-center ">
                        Mentor
                      </button>
                    </div>
                    <div className="Left-Request-Top-container d-flex  m-auto">
                      <div className="Left-Request-Top-left d-flex flex-column mx-2">
                        <div className=" d-sm-flex flex-sm-column d-none nameInfo">
                          <h5 style={{ marginTop: '30px' }}>{item.title} </h5>
                          <span className="d-flex ">
                            {
                              datainfo.map((item) => (
                                <h5 className="mr-3">
                                  <span className="blue-color">{item.name}</span>{" "}
                                </h5>
                              ))
                            }
                            <small className="p-1">
                              {" "}
                              is looking for a mentor{" "}
                            </small>{" "}
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="lh-base des mt-5 descriptionOfPerson">
                    <p>
                      <p>{item.description}</p>
                    </p>
                  </div>

                  <div className=" flex-wrap my-3 text-capitalize listOfInfo">
                    <div className="row">
                      <div className="row">
                        <p className="info1 my-2">
                          <span className="me-1">
                            <Mony icon={faDollarSign} className="fa-2xl" /> paid :

                          </span>
                          <span className="data1">{item.paid.amount} {item.paid.currency}</span>
                        </p>

                        <p className="info1 my-2">
                          <span className="me-1">
                            <Location icon={faLocationDot} className="fa-2xl" />location :
                          </span>
                          <span className="data1">{item.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <p className="info1 my-2">
                        <span className="me-1">
                          <Mony icon={faDollarSign} className="fa-2xl" />{" "}
                          Experince :
                        </span>
                        <span className="data1">{item.experience}</span>
                      </p>

                      <p className="info1 my-2">
                        <span className="me-1">
                          <Time icon={faClock} className="fa-2xl" /> duration :
                        </span>
                        <span className="data1">{item.duration}</span>
                      </p>
                    </div>
                  </div>

                  <div className="listOfExperience">
                    <div className="Left-Request-Top-left-parags-1 py-2">
                      <h5 className="data1 text-capitalize fw-bold">
                        I'm looking for help with
                      </h5>
                      <ul>
                        <li>
                          {item.helpWith.map((q, i) => (
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
                        {item.requirements.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="Left-Request-Top-left-parags-3 py-2 ">
                      <h5 className="data1 text-capitalize fw-bold">
                        I have a background about
                      </h5>
                      <ul>
                        <li>
                          {item.haveBgWith.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Info />
                  <Comments id={id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>

  );
}


export default ShowReqest;