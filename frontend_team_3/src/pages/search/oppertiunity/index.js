import React, { useState } from "react";
import '../style.css'
import MultiRangeSlider from "multi-range-slider-react";
import OpportunitiesFilter from "./filter";
import { locationList } from "../../../components/data/data";
import { IoFilterOutline } from "react-icons/io5";


const Opportunities = () => {

const [location, setLocation] = useState(locationList[0].value);
const [mobileToggle, setmobileToggle] = useState(true);
const [minValue, setMinValue] = useState(0);
const [maxValue, setMaxValue] = useState(11);
const [availlable, setAvaillable] = useState(false);
const [paid, setPaid] = useState(true);
const [certificate, setCertificate] = useState(false);


function handleClear(){
  setMinValue(0)
  setMaxValue(11)
  setLocation("null")
  setAvaillable(false)
  setPaid(false)
  setCertificate(false)
}


  return (
    <>
      <div className="opportunites p-md-5 p-4">
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
                </button>{" "}
              </div>
              {/* Check boxes */}
              <div
                className={
                  mobileToggle ? "mt-3 d-none d-sm-block" : "mt-3 d-sm-block"
                }
              >
                <div className="form-check ps-0">
                  <label
                    className="form-check-label small "
                    htmlFor="flexCheckDefault"
                  >
                    Certificate
                  </label>
                  <input
                    className="form-check-input float-end"
                    value={certificate}
                    checked={certificate}
                    onChange={() => setCertificate((prev) => !prev) }
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                </div>

                <div className="form-check ps-0">
                  <label
                    className="form-check-label small "
                    htmlFor="flexCheckDefault"
                  >
                    Paid
                  </label>
                  <input
                    className="form-check-input float-end"
                    value={paid}
                    checked={paid}
                    onChange={() => setPaid((prev) => !prev)}
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                </div>

                <div className="form-check ps-0">
                  <label
                    className="form-check-label small "
                    htmlFor="flexCheckDefault"
                  >
                    Hiring Possibility
                  </label>
                  <input
                    className="form-check-input float-end"
                    value={availlable}
                    checked={availlable}
                    onChange={() => setAvaillable((prev) => !prev)}
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                </div>
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
                  <span className="arrow arrow-mentor d-inline-block mt-2"></span>
                </div>
              </div>

              {/* Duration */}
              <div
                className={
                  mobileToggle
                    ? "skills mt-5 d-none d-sm-block"
                    : "skills mt-5 d-sm-block"
                }
              >
                <h6 className="fw-bold ">Duration</h6>
                <MultiRangeSlider
                  className="mt-5"
                  minValue={-1}
                  maxValue={11}
                  step={1}
                  min={-1}
                  max={11}
                  minCaption={minValue + 1 + " Months"}
                  maxCaption={maxValue + 1 + " Months"}
                  onInput={(e) => {
                    setMinValue(e?.minValue || e?.target?.minValue);
                    setMaxValue(e.maxValue || e?.target?.setMaxValue);
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
            </div>
            {/* Mentors */}
            <div className="col-md-9 col-12">
              <div className="row">
                <OpportunitiesFilter
                  locvalue={location}
                  Paid={paid}
                  Certificate={certificate}
                  Availlable={availlable}
                  minValue={minValue}
                  maxValue={maxValue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Opportunities;
