import React from "react";
import '../style.css'
import { BsSearch } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoBagRemoveSharp } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Selectlist = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="main py-md-5 pt-2 bg-secondaryColor-op responsive">
        <div className="container">
          {/* Ui Ux  */}
          <div className="row">
            <div className="col-md-3 col-12 mobile-list position-relative d-felx pe-5  justify-content-center align-items-center">
              <div className="selectBox m-4 m-md-0">
                <div className="d-inline-block me-2">
                  <BsSearch className="selectIcon-with-circle mb-1" />
                </div>
                <p className="m-0 d-inline-block text-white">UI UX designer</p>
              </div>
            </div>
            {/* Select 1*/}
            <div className="col-md-3 col-12  mobile-list position-relative pe-5">
              <div className="d-flex justify-content-center m-4 m-md-0 align-items-center selectBox">
                <div className="d-inline-block me-2 ">
                  <HiOutlineUserCircle className="selectIcon-without-circle mb-1 d-inline-block" />
                </div>
                <select
                  id="selectedOne"
                  defaultValue="mentor"
                  onChange={(e) => {
                    navigate(`/${e.target.value}`, { replace: true });
                  }}
                  className="form-select bg-transparent selecteList m-0 d-inline-block text-white p-0"
                  aria-label="Default select example"
                >
                  <option value="mentor" className="bg-secondaryColor-op p-2">
                    Mentor
                  </option>
                  <option value="mentee" className="bg-secondaryColor-op p-2">
                    Mentee
                  </option>
                  <option value="opp" className="bg-secondaryColor-op p-2">
                    Opportunities
                  </option>
                  <option value="reqs" className="bg-secondaryColor-op p-2">
                    Requests
                  </option>
                </select>
                <span className="arrow  d-inline-block mt-2"></span>
              </div>
            </div>
            {/* Select 2*/}
            <div className="col-md-3 col-12 mobile-list position-relative pe-5 ">
              <div className="d-flex justify-content-center align-items-center m-4 m-md-0 selectBox">
                <div className="d-inline-block me-2  ">
                  <IoBagRemoveSharp className="selectIcon-with-circle mb-1 d-inline-block" />
                </div>
                <select
                  className="bg-transparent form-select selecteList m-0 d-inline-block text-white p-0"
                  aria-label="Default select example"
                >
                  <option selected className="bg-secondaryColor-op p-2">
                    Experience
                  </option>
                </select>
                <span className="arrow  d-inline-block mt-2"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Selectlist;
