import React, { useState } from 'react';
import '../style.css'
import FilterMenotrs from './filter';
import { IoFilterOutline } from "react-icons/io5"
const SearchMentor = () => {
    // Toogle in mobile view
    const [mobileToggle, setmobileToggle] = useState(true)
    // Cheack Boxes
    const [toogleCheackParent, settoogleCheackParent] = useState(false)
    const [toogleCheack5, settoogleCheack5] = useState(false)
    const [toogleCheack4, settoogleCheack4] = useState(false)
    const [toogleCheack3, settoogleCheack3] = useState(false)
    const [toogleCheack2, settoogleCheack2] = useState(false)
    const [toogleCheack1, settoogleCheack1] = useState(false)
    let [arrValue] = useState([])
    const [locvalue, setlocvalue] = useState("cairo")
    function handleChange(e) {
        let index = parseInt(e.target.value)
        arrValue[index - 1] = e.target.checked
    }

    return (
        <>
            <div className="mentor p-md-5 p-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-12">
                            {/* Headings */}
                            <div className='d-flex justify-content-between align-items-center'>
                                <h3 className='fw-bold h4'>Filters</h3>
                                <button className='small bg-transparent border-0 d-none d-sm-block' >Clear All</button>
                                <button className='small bg-transparent border-0 d-sm-none text-main-color ' onClick={() => setmobileToggle((mobileToggle) => !mobileToggle)} ><IoFilterOutline className='h2 fw-bold' /></button>

                            </div>
                            {/* Check boxes */}
                            <div className={mobileToggle ? "mt-5 d-none d-sm-block" : "mt-5 d-sm-block"}>
                                <h6 className='mb-3 fw-bold'>Rating</h6>
                                <div className="form-check ps-0">
                                    <label className="form-check-label " htmlFor="flexCheckDefault">Five Starts</label>
                                    <input className="form-check-input float-end" checked={toogleCheack5} onClick={handleChange} onChange={() => settoogleCheack5((settoogleCheack5) => !settoogleCheack5)} type="checkbox" value="5" id="flexCheckDefault" />
                                </div>

                                <div className="form-check ps-0">
                                    <label className="form-check-label " htmlFor="flexCheckDefault">Four Starts</label>
                                    <input className="form-check-input float-end" checked={toogleCheack4} onClick={handleChange} onChange={() => settoogleCheack4((settoogleCheack4) => !settoogleCheack4)} type="checkbox" value="4" id="flexCheckDefault" />
                                </div>

                                <div className="form-check ps-0">
                                    <label className="form-check-label " htmlFor="flexCheckDefault">Three Starts</label>
                                    <input className="form-check-input float-end" checked={toogleCheack3} onClick={handleChange} onChange={() => settoogleCheack3((settoogleCheack3) => !settoogleCheack3)} type="checkbox" value="3" id="flexCheckDefault" />
                                </div>

                                <div className="form-check ps-0">
                                    <label className="form-check-label " htmlFor="flexCheckDefault">Two Starts</label>
                                    <input className="form-check-input float-end" checked={toogleCheack2} onClick={handleChange} onChange={() => settoogleCheack2((settoogleCheack2) => !settoogleCheack2)} type="checkbox" value="2" id="flexCheckDefault" />
                                </div>

                                <div className="form-check ps-0">
                                    <label className="form-check-label " htmlFor="flexCheckDefault">One Start</label>
                                    <input className="form-check-input float-end" checked={toogleCheack1} onClick={handleChange} onChange={() => settoogleCheack1((settoogleCheack1) => !settoogleCheack1)} type="checkbox" value="1" id="flexCheckDefault" />
                                </div>

                                <div className="form-check ps-0">
                                    <label className="form-check-label " htmlFor="flexCheckDefault">All</label>
                                    <input className="form-check-input float-end" checked={toogleCheackParent} onClick={handleChange} onChange={() => settoogleCheackParent((settoogleCheackParent) => !settoogleCheackParent)} type="checkbox" value="6" id="flexCheckDefault" />
                                </div>
                            </div>

                            {/* Location */}
                            <div className={mobileToggle ? "mt-5 d-none d-sm-block" : "mt-5 d-sm-block"}>
                                <h6 className='fw-bold '>Location</h6>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <select id='selectedtwo' defaultValue="cairo" onChange={(e) => setlocvalue(e.target.value)}
                                        className="form-select bg-red m-0 d-inline-block  ps-2 selecteList-mentor" aria-label="Default select example">
                                        <option value="cairo" className='bg-secondaryColor-op p-2 '>Cairo</option>
                                        <option value="giza" className='bg-secondaryColor-op p-2 fw-bold'>Giza</option>
                                        <option value="alex" className='bg-secondaryColor-op p-2 fw-bold'>Alex</option>
                                    </select>
                                    <span className='arrow arrow-mentor  d-inline-block mt-2'></span>
                                </div>
                            </div>
                        </div>
                        {/* Mentors */}
                        <div className="col-md-9 col-12">
                            <div className='row'>
                                <FilterMenotrs locvalue={locvalue} arrValue={arrValue} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchMentor;