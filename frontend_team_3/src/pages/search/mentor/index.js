import React, { useState } from "react";
import "../style.css";
import FilterMenotrs from "./filter";
import { IoFilterOutline } from "react-icons/io5";
import MultiRangeSlider from "multi-range-slider-react";
import { locationList } from "../../../components/data/data";

const SearchMentor = () => {
  // Toogle in mobile view
  const [mobileToggle, setmobileToggle] = useState(true);
//   Experience
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(30);
  const [location, setLocation] = useState(locationList[0].value);


  function handleClear(){
    setMinValue(0)
    setMaxValue(30)
    setLocation("null")
  }

  return (
    <>
      <div className="mentor p-md-5 p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12">
              {/* Headings */}
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="fw-bold h4">Filters</h3>
                <button className="small bg-transparent border-0 d-none d-sm-block" onClick={handleClear}>
                  Clear All
                </button>
                <button
                  className="small bg-transparent border-0 d-sm-none text-main-color "
                  onClick={() =>
                    setmobileToggle((mobileToggle) => !mobileToggle)
                  }
                >
                  <IoFilterOutline className="h2 fw-bold" />
                </button>
              </div>
              {/* Experience */}
              <div className={mobileToggle ? "mt-5 skills d-none d-sm-block" : "mt-5 skills d-sm-block"}>
                  <h6 className='fw-bold '>Experience</h6>
                  <MultiRangeSlider className='mt-5'
                      minValue={-1}
                      maxValue={30}
                      step={1}
                      min={-1}
                      max={30}
                      minCaption={(minValue + 1) + " Years"}
                      maxCaption={(maxValue + 1) + " Years"}
                      onInput={(e) => {
                        setMinValue(e?.target?.minValue);
                        setMaxValue(e?.target?.maxValue);
                      }}
                      label={false}
                      ruler={false}
                      style={{ border: "none", boxShadow: "none", padding: "5px" }}
                      barLeftColor="#d6f2f2"
                      barInnerColor="#007580"
                      barRightColor="#d6f2f2"
                      thumbLeftColor="#fed049"
                      thumbRightColor="#fed049"
                  />
              </div>
              {/* Location */}
              <div
                className={
                  mobileToggle ? "mt-5 d-none d-sm-block" : "mt-5 d-sm-block"
                }
              >
                <h6 className="fw-bold ">Location</h6>
                <div className="d-flex justify-content-center align-items-center">
                <select onChange={(e) => setLocation(e.target.value)}
                name="location" id="select-data" className="form-select bg-red m-0 d-inline-block  ps-2 selecteList-mentor" defaultValue={"null"} >
                    {locationList?.map(list =>
                        <option value={list.value}>{list.label}</option>
                    )}
                </select>
                  <span className="arrow arrow-mentor  d-inline-block mt-2"></span>
                </div>
              </div>
            </div>
            {/* Mentors */}
            <div className="col-md-9 col-12">
              <div className="row">
                <FilterMenotrs locvalue={location} maxValue={maxValue} minValue={minValue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchMentor;
