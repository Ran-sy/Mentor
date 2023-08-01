import React, { useState } from "react";
import '../style.css'
import MultiRangeSlider from "multi-range-slider-react";
import OpportunitiesFilter from "./filter";
import { IoFilterOutline } from "react-icons/io5";

const Opportunities = () => {
  // Toogle in mobile view
  const [mobileToggle, setmobileToggle] = useState(true);
  // Min Max of range
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  // chech boxes
  const [locvalue, setlocvalue] = useState("cairo");
  const [Availlable, setAvaillable] = useState(false);
  const [Paid, setPaid] = useState(false);
  const [Certificate, setCertificate] = useState(false);
  // function HandleChange(e){
  //     let index = parseInt(e.target.value)
  //     arrValue[index] = e.target.checked
  //     setarrValue(arrValue)
  // }
  return (
    <>
      <div className="opportunites p-md-5 p-4">
        <div className="container">
          <div className="row">
            <difv className="col-md-3 col-12">
              {/* Headings */}
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="fw-bold h4">Filters</h3>
                <button className="small bg-transparent border-0 d-none d-sm-block">
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
                    value={2}
                    checked={Certificate}
                    onChange={() =>
                      setCertificate((Certificate) => !Certificate)
                    }
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
                    value={1}
                    checked={Paid}
                    onChange={() => setPaid((Paid) => !Paid)}
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
                    value={0}
                    checked={Availlable}
                    onChange={() => setAvaillable((Availlable) => !Availlable)}
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
                  <select
                    id="selectedtwo"
                    className="form-select bg-red m-0 d-inline-block  ps-2 selecteList-mentor"
                    defaultValue="cairo"
                    onChange={(e) => setlocvalue(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="cairo" className="bg-secondaryColor-op p-2 ">
                      Cairo
                    </option>
                    <option
                      value="giza"
                      className="bg-secondaryColor-op p-2 fw-bold"
                    >
                      Giza
                    </option>
                    <option
                      value="alex"
                      className="bg-secondaryColor-op p-2 fw-bold"
                    >
                      Alex
                    </option>
                  </select>
                  <span className="arrow arrow-mentor  d-inline-block mt-2"></span>
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
                  minValue={1}
                  maxValue={5}
                  step={1}
                  min={0}
                  max={11}
                  minCaption={minValue + 1 + " Months"}
                  maxCaption={maxValue + 1 + " Months"}
                  onInput={(e) => {
                    setMinValue(e.minValue);
                    setMaxValue(e.maxValue);
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
            </difv>
            {/* Mentors */}
            <div className="col-md-9 col-12">
              <div className="row">
                <OpportunitiesFilter
                  locvalue={locvalue}
                  Paid={Paid}
                  Certificate={Certificate}
                  Availlable={Availlable}
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
