import React, { useEffect, useState } from "react";
import "../style.css";
import img0 from "../../../assets/images/photo-1537511446984-935f663eb1f4.jpg";
import axios from "axios";
import { Localhost } from "../../../config/api";


const FilterMentee = (props) => {
  axios.defaults.withCredentials = true;
  const [filterProductList, setFilterProductList] = useState([])
  
  useEffect(() => {
    const getMentees = async () => {
      await axios
        .get(`${Localhost}/api/v1/menteeProfile`, { withCredentials: true })
        .then((res) => {
          const filtered = res?.data?.response?.filter((mentee) => {
            let x;
            if (props.Availlable) {
              x = mentee.availableForHiring;
            } else {
              x = mentee;
            }
            if( props.locvalue === "null" ){
                return (x && mentee.location !== props.locvalue &&
                  (props.skills.length ? props.skills.every((item) => mentee.skills.includes(item)) : []))}
            return (
              x &&
              mentee.location === props.locvalue &&
              (props.skills.length
                ? props.skills.every((item) => mentee.skills.includes(item))
                : [])
            );
          });
          setFilterProductList(filtered)
        })
        .catch((error) => {
          Error(error.message);
        });
    };
    getMentees();
  }, []);
  
  return (
    <>
      {filterProductList.map((menteeOne) => {
        return (
          <div className="col-md-4 col-12 pt-5 pt-md-4" key={menteeOne._id}>
            {/* Mentor Persons */}
            <div
              className={`mentorPersons menteePersons position-relative`}
            >
              <img src={img0} alt="img" />
            </div>
            {/* Mentor Info */}
            <div>
              <p className="my-2 fw-bold">{menteeOne.user.name}</p>
              <p className="text-muted text-small">{menteeOne.designation}</p>
              <p className="mt-4">
                {menteeOne.skills.map((item) => {
                  return (
                    <span className="me-1   text-white rounded p-1 bg-secondaryColor">
                      {item}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default FilterMentee;
