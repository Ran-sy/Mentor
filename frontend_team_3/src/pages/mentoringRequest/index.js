import React, { useState } from "react";
import "./style.css";
import { locationList, durationList, currencyList } from "../../components/data/data";
import { AiFillPlusSquare } from "react-icons/ai";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector} from 'react-redux';
import axios from "axios";
import { Localhost } from "../../config/api";
import { Error, Success } from "../../components/Toast";
import { FaPlusSquare } from "react-icons/fa";

const MentorReqForm = () => {
    const navigate = useNavigate()
    const user = useSelector(state=> state.currentUser)
    const [id, setId] = useState(null)
    const [requirements, setRequirements] = useState([])
    const [paidChecked, setPaidChecked] = useState(false);
    const [helpWithCount, setHelpWithCount] = useState(0);
    const [requirementsCount, setRequirementsCount] = useState(0);
    const [haveBgWith, setHaveBgWith] = useState([]);
    const [backgroundCount, setBackgroundCount] = useState(0);
    const [title, setTitle] = useState('');
    const [experience, setExperince] = useState([]);
    const [duration, setDuration] = useState('');
    const [values, setValues] = useState(['none', 'with'])
    const [helpWith, setHelp] = useState([]);
    const [amount, setAmount] = useState('');
    const [location, setLocation] = useState(locationList[0].value);
    const [currency, setCurrency] = useState(currencyList[0].value)
    const [description, setDescreption] = useState('');
    const body = { title: title, description: description, location: location, helpWith: helpWith, haveBgWith: [...haveBgWith], requirements: [...requirements], 
        paid: { isPaid: paidChecked, amount, currency }, experience: [...experience], duration }


    const handleSubmit = (e) => {
        console.log(body)
        console.log({ title: title, description: description, location: location, helpWith: [...helpWith], haveBgWith: [...haveBgWith], requirements: [...requirements], 
            paid: { isPaid: paidChecked, amount, currency }, experience: experience, duration })
        e.preventDefault();
        if(user?.role === "mentee"){
            const addReq = async () => {
                await axios.post(`${Localhost}/api/req/request`, body, {
                    withCredentials: true,
                }).then(res=>{
                    setId(res.data._id)
                    Success('added successfully')
                    navigate(`/ShowReq/${res.data._id}`);
                }).catch(e=>Error('Unable to create request '+ e.message))
            }
            addReq()
        }else{
            Error('YOU NEED TO BE A MENTEE!!')
        }
    }
    return ( 
        <>
            <div className="mentoring-section">
                <div className="left-col">
                    <div
                        className="left-content d-flex flex-column"
                        style={{ gap: "5px" }}
                    >
                        <h5>
                            <Link to='/reqs'>View Mentoring Request</Link>
                        </h5>
                        <h5><Link to='/mentorreqapp'>Settings</Link></h5>
                        <h5>Terms and Privacy</h5>
                        <div>
                            <Link className="btn" style={{ color: "#007580" }} to="#" >
                                <h5 className="d-inline-block mt-4">Post a new request</h5>
                                <FaPlusSquare className="add-opp" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="right-col">
                    <div className="right-content-side">
                        <div className="form-title23">
                            <h5>Mentoring request</h5>
                        </div>
                    </div>
                    <div className="main-content">
                        <form >
                            <div className="main-data">
                                <label htmlFor="request-title" className="label-title ">
                                    Mentoring Request Title
                                </label>
                                <input
                                    onChange={(e) => setTitle(e.target.value)}
                                    name="title"
                                    value={title}
                                    id="request-title"
                                    type="text"
                                    className="input-data first-input"
                                    placeholder="example"
                                />
                            </div>
                            <div className="main-data">
                                <label htmlFor="request-description" className="label-title">
                                    Request Description
                                </label>
                                <input
                                    onChange={(e) => setDescreption(e.target.value)}
                                    name="description"
                                    value={description}
                                    id="description"
                                    type="text"
                                    className="input-data"
                                    placeholder="example"
                                />
                            </div>
                            <div className="select-diagram">
                                <div className="main-data-select">
                                    <label htmlFor="select-data1" className="label-title name-input" > Location </label>
                                    <select onChange={(e) => setLocation(e.target.value)}
                                    name="location" id="select-data" className="input-data">
                                        {locationList?.map(list =>
                                            <option value={list.value}>{list.label}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="main-data-select">
                                    <label htmlFor="select-data2" className="label-title">
                                        Duration
                                    </label>
                                    <select onChange={(e) => setDuration(e.target.value)}
                                    name="duration" id="select-data" className="input-data">
                                        {durationList?.map(list =>
                                            <option value={list.value}>{list.label}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="main-data-select">
                                    <label
                                        htmlFor="select-data3"
                                        className="label-title name-input"
                                    >
                                        Experince
                                    </label>
                                    <select
                                        onChange={(e) => setExperince(e.target.value)}
                                        name="experience"
                                        value={experience}
                                        id="select-data" className="input-data">
                                        {
                                            values.map((item) => (
                                                <option value={item}>{item}</option>
                                            ))
                                        }
                                    </select>
                                    {/* <option value="with">with</option> */}
                                </div>
                            </div>
                            <div className="select-check">
                                <div className="checked-list">
                                    <div className="check1">
                                        <label
                                            htmlFor="input-radio"
                                            className="label-title checked-input name-input check"
                                        >
                                            <span
                                                className="me-2"
                                                onClick={() => setPaidChecked((prev) => !prev)}
                                            >
                                                Paid
                                            </span>
                                            <button
                                                type="button"
                                                className="btn"
                                                style={{ padding: 0, color: "#fed049" }}
                                                onClick={() => setPaidChecked((prev) => !prev)}
                                            >
                                                {paidChecked ? (
                                                    <MdRadioButtonUnchecked />
                                                ) : (
                                                    <MdRadioButtonChecked />
                                                )}
                                            </button>
                                        </label>
                                    </div>
                                </div>

                                <div className="main-data">
                                    <label htmlFor="amount" className="label-title sec-input">
                                        Amount
                                    </label>
                                    <input
                                        onChange={(e) => setAmount(e.target.value)}
                                        name="amount"
                                        value={amount}
                                        id="amount"
                                        // type="text"
                                        className="input-data"
                                        placeholder="example"
                                    />
                                </div>
                                <div className="main-data align-items-center">
                                    <label
                                        htmlFor="select-data4"
                                        className="label-title sec-input"
                                    >
                                        Currency
                                    </label>
                                    <select onChange={(e) => setCurrency(e.target.value)}
                                    name="currency" id="select-data" className="input-data">
                                        {currencyList?.map(list =>
                                            <option value={list.value}>{list.label}</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="main-data">
                                <label htmlFor="help-with" className="label-title">
                                    Looking for help with
                                </label>
                                <div
                                    className="d-flex"
                                    style={{ gap: "6px", alignItems: "flex-start" }}
                                >
                                    <input
                                        onChange={(e) => setHelp(prev=> { prev[0] = e.target.value; return [...prev] })}
                                        name="helpWith"
                                        value={helpWith}
                                        id="help-with"
                                        type="text"
                                        className="input-data third-input"
                                        placeholder="example"
                                    />
                                    <button
                                        className="btn"
                                        style={{ color: "#007580", padding: 0 }}
                                        type="button"
                                        onClick={() => setHelpWithCount((prev) => prev + 1)}
                                    >
                                        <AiFillPlusSquare />
                                    </button>
                                </div>
                                <div>
                                    {Array.from({ length: helpWithCount }, (_, i) => (
                                        <div div key={i} className="d-flex flex-column">
                                            <label htmlFor="help-with" className="label-title">
                                                Looking for help with
                                            </label>
                                            <input
                                                onChange={(e) => setHelp(e.target.value)}
                                                name="helpWith"
                                                id="help-with"
                                                type="text"
                                                className="input-data third-input"
                                                placeholder="example"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="main-data">
                                <label htmlFor="requirements" className="label-title">
                                    Requirements
                                </label>
                                <div
                                    className="d-flex"
                                    style={{ gap: "6px", alignItems: "flex-start" }}
                                >
                                    <input
                                        onChange={(e) => setRequirements(prev=> { prev[0] = e.target.value; return [...prev] })}
                                        name="requirements"
                                        id="requirements"
                                        value={requirements}
                                        type="text"
                                        className="input-data third-input"
                                        placeholder="example"
                                    />
                                    <button
                                        className="btn"
                                        style={{ color: "#007580", padding: 0 }}
                                        type="button"
                                        onClick={() => setRequirementsCount((prev) => prev + 1)}
                                    >
                                        <AiFillPlusSquare />
                                    </button>
                                </div>
                                <div>
                                    {Array.from({ length: requirementsCount }, (_, i) => (
                                        <div div key={i} className="d-flex flex-column">
                                            <label htmlFor="requirements" className="label-title">
                                                Requirements
                                            </label>
                                            <input
                                                onChange={(e) => setRequirements(e.target.value)}
                                                name="requirements"
                                                id="requirements"
                                                type="text"
                                                className="input-data third-input"
                                                placeholder="example"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="main-data">
                                <label htmlFor="background" className="label-title">
                                    I have background
                                </label>
                                <div
                                    className="d-flex"
                                    style={{ gap: "6px", alignItems: "flex-start" }}
                                >
                                    <input
                                        onChange={(e) => setHaveBgWith(e.target.value)}
                                        name="haveBgWith"
                                        id="background"
                                        value={haveBgWith}
                                        type="text"
                                        className="input-data third-input"
                                        placeholder="example"
                                    />
                                    <button
                                        className="btn"
                                        style={{ color: "#007580", padding: 0 }}
                                        type="button"
                                        onClick={() => setBackgroundCount((prev) => prev + 1)}
                                    >
                                        <AiFillPlusSquare />
                                    </button>
                                </div>
                                <div>
                                    {Array.from({ length: backgroundCount }, (_, i) => (
                                        <div div key={i} className="d-flex flex-column">
                                            <label htmlFor="background" className="label-title">
                                                I have background
                                            </label>
                                            <input
                                                onChange={(e) => setHaveBgWith(e.target.value)}
                                                name="haveBgWith"
                                                id="background"
                                                type="text"
                                                className="input-data third-input"
                                                placeholder="example"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="finish-button">
                                <input className="publish-btn" 
                                type="submit" value="Publish"
                                onClick={handleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MentorReqForm;