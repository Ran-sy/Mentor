
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './style.css'
import { NavLink, useParams } from 'react-router-dom'
import { Localhost } from '../../../config/api'

const Info = () => {
    const [data, setData] = useState([])
    const [datainfo, setDataInfo] = useState([])
    const [avatar, setAvatar]= useState("")
    const { id } = useParams()
    useEffect(() => {
        const getReq = async () => {
            try {
                const response = await axios.get(`${Localhost}/api/req/request/${id}`, {
                    withCredentials: true,
                });
                setData([response.data[0].profile]);
                console.log(response.data[0].profile)
                setDataInfo([response.data[0].owner]);
               
                setAvatar(response.data[0].profile.avatar)
                console.log("Avatar URL:",response.data[0].profile.avatar)
                // console.log(avatar)
            } catch (error) {
                console.log(error);
            }
        };
        getReq();
    }, [id]);
  
 
    // console.log(baseURL+ data.avatar)
   
  const baseURL = "http://localhost:5000/";
  const avatar2 = baseURL + avatar;
  console.log("Complete Avatar URL:", avatar2);
    if (data.length === 0) {
        return <div>Loading...</div>;
      }
    

    if (data.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div className="mb-2 userinfo px-5 pt-5 box-info">
            {data.map((item) => (
                <>
                    {datainfo.map((item) => (

                        <h3 className=" text-capitalize fw-bold blue-color title-info">
                            About {item.name}
                        </h3>
                    ))}
                    <div className="bg-white p-4 radius d-flex box-info-container">
                        <div className="w-100">
                            {/*  */}
                            <div className="d-flex flex-wrap w-100 mt-1 text-capitalize box-info-left">
                                {/* info1  d-flex flex-column */}
                                <div className="">
                                    {datainfo.map((item) => (
                                        <p className=" d-flex flex-column">
                                            <span className="data1 ">name </span>
                                            <span>{item.name}</span>
                                        </p>
                                    ))}

                                    <p className="  d-flex flex-column">
                                        <span className="data1 ">Iam a</span>
                                        <span>Fresh Graduate</span>
                                    </p>

                                    <p className=" d-flex flex-column">
                                        <span className="data1 ">university</span>
                                        <span>international university</span>
                                    </p>
                                </div>
                                {/* my-2 d-flex flex-column */}
                                <div className="middleBox ">
                                    {datainfo.map((item) => (
                                        <>
                                            <p className=" my-2 d-flex flex-column">
                                                <span className="data1 ">phone Number </span>
                                                <span>{item.phoneNumber}123456789</span>
                                            </p>
                                            <p className="my-2 d-flex flex-column">
                                                <span className="data1 ">email </span>
                                                <span>{item.email}</span>
                                            </p>
                                        </>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5 w-100 pragraphContainer">
                                <p className="w-60 boxBaragraph">specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                            </div>
                        </div>
                        {/* user avatar */}
                        <div className="box-info-right">
                            <div className="info1 d-flex flex-column listExperince">
                                <ul className=" d-flex flex-column">
                                    <span className="data1 mb-4"> experise </span>
                                    {item.expertise.map((i) =>
                                        <li>{i}</li>
                                    )}
                                </ul>
                            </div>
                            <div className="d-flex flex-column align-items-center  userAvatar">
                            {data.length > 0 && 
                             
                                <img
                                src={avatar2}
                                    alt="avatar"
                                    width="80"
                                    height="80"
                                    className="rounded-circle shadow-1-strong mb-3"
                                />}
                                <NavLink
                                    to={`/external/${id}`} 
                                    className="profileBtn px-4 py-2 rounded-pill "
                                    style={{
                                        backgroundColor: "darkgray",
                                        color: "#000000d6",
                                        fontWeight: "500",
                                    }}
                                >
                                    view profile
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </>
            )
            )}
        </div>
    )
}

export default Info
