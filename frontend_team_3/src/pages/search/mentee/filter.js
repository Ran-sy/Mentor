import React, { useEffect, useState } from "react";
import "../style.css";
import img0 from "../../../assets/images/photo-1537511446984-935f663eb1f4.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Localhost } from "../../../config/api";
import { loginFailure } from "../../../features/user";


const FilterMentee = (props) => {
  const [filterMentee, setFilterMentee] = useState([]);
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getMentees = async () => {
      await axios
        .get(`${Localhost}/api/v1/menteeProfile`, { withCredentials: true })
        .then((res) => {
          setFilterMentee(res.data.response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getMentees();
  }, []);
  let filterProductList = filterMentee.filter((mentee) => {
    let x;
    if (props.Availlable) {
      x = mentee.availableForHiring;
    } else {
      x = mentee;
    }
    return (
      x &&
      mentee.location === props.locvalue &&
      (props.skills.length
        ? props.skills.every((item) => mentee.skills.includes(item))
        : [])
    );
  });
  return (
    <>
      {filterProductList.map((menteeOne) => {
        return (
          <div className="col-md-4 col-12 pt-5 pt-md-4" key={menteeOne._id}>
            {/* Mentor Persons */}
            <div
              className={`mentorPersons menteePersons position-relative`}
            >
              <img src={img0} />
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
};

export default FilterMentee;
