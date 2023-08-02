import React, { useState } from "react";
import "./style.css";
import { FaPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { loginFailure, loginStart } from "../../features/user";
import { Localhost } from "../../config/api";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditOpp = () => {
  const [opp , setOpp] = useState({})
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [certificate, setCertificate] = useState(true)
  const [duration, setDuration] = useState(0)
  const [location, setLocation] = useState('cairo')
  const [getHired, setGetHired] = useState(true)
  const [paid, setPaid] = useState(true)
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState('')
  const [responsibilities, setResponsibilities] = useState('')
  const [requirements, setRequirements] = useState('')
  const [expOutcome, setExpOutcome] = useState('')
  const [progress, setProgress] = useState('')
  const [acceptedBy, setAcceptedBy] = useState('')
  const dispatch = useDispatch()
  const {id} = useParams()
  const user = useSelector(state => state.currentUser)
  console.log(user);

  const body =  { title, description, duration, location, certificate, getHired, paid: { isPaid: paid, amount, currency },responsibilities,requirements,expOutcome }
  const handleSubmit = (e) => {
    const editOPP = async () =>{
        try{
            await axios.patch(`${Localhost}/api/opp/opp/${id}`, body, { withCredentials: true });
        }catch(e){
            dispatch(loginFailure());
            console.log('unable create prfile: ' + e)
        }
      }
    editOPP()
    };
    const getOPP = async () =>{
        // if(!user.tokens[0]) {
        //     console.log('please login first')
        //     dispatch(loginFailure());
        // }
        // const config ={headers: {'Authorization': `Bearer ${user.tokens[0]}`}}
        try{

            await axios.get(`${Localhost}/api/opp/opp/${id}`, { withCredentials: true })
            .then((res)=>{
              console.log(res);
                setTitle(res.data[0].title) 
                setDescription(res.data[0].description)
                setDuration(res.data[0].duration)
                setLocation(res.data[0].location)
                setCertificate(res.data[0].certificate)
                setGetHired(res.data[0].getHired)
                setPaid(res.data[0].paid.isPaid)
                setAmount(res.data[0].paid.amount)
                setCurrency(res.data[0].paid.currency)
                setResponsibilities(res.data[0].responsibilities)
                setRequirements(res.data[0].requirements)
                setExpOutcome(res.data[0].expOutcome)
            })
        }catch(e){
            dispatch(loginFailure());
            console.log('unable create prfile: ' + e)
        }
      }
useEffect(()=>{
  getOPP()
},[])
  return (
    <div className="parent"> 
      <div className="container">
        <div className="row">
          <div className="div1 d-none d-lg-block col-lg-2">
            <span>View Mentoring Opportunity</span>
            <span>Settings</span>
            <span>Terms and Privacy</span>
            <br />
            <br />
            <span>
              Post a new opportunity &nbsp;
              <a href="#">
                <FaPlusSquare className="add-opp" />
              </a>
            </span>
          </div>
          <div className="div2 col-lg-10">
            <section className="mentoring-opportunity">
              <div className="mentoring-opportunity-container">
                <div className="mentoring-opportunity-div1">
                  <p style={{ fontSize: '19px', padding: '5px' }}>Mentoring opportunity</p>
                </div>
                <form className="mentoring-opportunity-form w-md-100">
                  <label className="mentor-oppor-label">
                    Mentoring opportunity title
                  </label>
                  <input
                    className="mentor-oppor-input mentor-input1 border-bottom border-warning-subtle border-2"
                    type="text"
                    placeholder="example"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                  <label className="mentor-oppor-label d-none d-lg-block">
                    Opportunity Description
                  </label>
                  <textarea
                    className="mentor-oppor-input border-bottom border-warning-subtle border-2 d-none d-lg-block"
                    cols="88"
                    rows="1"
                    placeholder="example"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <label className="mentor-oppor-label1">Certificate</label>
                  <select className="mentor-oppor-input1 mentor-select1 border-bottom border-warning-subtle border-2" onChange={(e) => setCertificate(e.target.value)} value={certificate}>
                    <option value='Awarded'>Awarded</option>
                    <option value='NOT Awarded'>NOT Awarded</option>
                    <option value='Awarded'>Awarded</option>
                  </select>
                  <label className="mentor-oppor-label1">Duration</label>
                  <select className="mentor-oppor-input1 mentor-select2 border-bottom border-warning-subtle border-2" onChange={(e) => setDuration(e.target.value)} value={duration}>
                    <option value={3}>3 months</option>
                    <option value={2}>2 months</option>
                    <option value={1}>1 months</option>
                  </select>
                  <br />
                  <label className="mentor-oppor-label1">Location &nbsp;</label>
                  <select className="mentor-oppor-input1 mentor-select3 border-bottom border-warning-subtle border-2" onChange={(e) => setLocation(e.target.value)} value={location}>
                    <option value='cairo'>Cairo</option>
                    <option value='giza'>Giza</option>
                    <option value='alex'>Alex</option>
                  </select>
                  <span className="mentor-span0">Might get hired</span>
                  <input
                    className="form-check-input mgh-inp mgh-inp1"
                    type="checkbox"
                    onChange={(e) => setGetHired(e.target.checked)}
                    value={getHired}
                    checked={getHired ? true : false}
                  />
                  <span className="checkboxtexr"></span>
                  <br />
                  <br />
                  <label className="mentor-oppor-label1">Paid</label>
                  <input
                    className="form-check-input mgh-inp mgh-inp2"
                    type="checkbox"
                    onChange={(e) => setPaid(e.target.checked)}
                    value={paid}
                    checked={paid ? true : false}
                  ></input>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="d-inline-block par-opp">
                    <label className="mentor-oppor-span lab-1">Amount</label>
                    <input
                      className="mentor-oppor-input1 mentor-input2 border-bottom border-warning-subtle border-2"
                      type="number"
                      placeholder="example"
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </div>
                  <div className="d-inline-block par-opp">
                    <label className="mentor-oppor-span">Currency</label>
                    <select className="mentor-oppor-input1 mentor-select4 border-bottom border-warning-subtle border-2" onChange={(e) => setCurrency(e.target.value)} value={currency}>
                      <option value='usd'>USD</option>
                      <option value='pound'>POUND</option>
                      <option value='kwd'>KWD</option>
                    </select>
                  </div>
                  <label className="mentor-oppor-label">Responsibilities</label>
                  <input
                    className="mentor-oppor-input1 mentor-input4 border-bottom border-warning-subtle border-2"
                    type="text"
                    placeholder="example"
                    onChange={(e) => setResponsibilities(e.target.value)}
                    value={responsibilities}
                  />
                  <a href="#">
                    {/* <i className="fas fa-plus-square"></i> */}
                    <FaPlusSquare className="add-opp" />
                  </a>
                  <label className="mentor-oppor-label">Requirements</label>
                  <input
                    className="mentor-oppor-input1 mentor-input5 border-bottom border-warning-subtle border-2"
                    type="text"
                    placeholder="example"
                    onChange={(e) => setRequirements(e.target.value)}
                    value={requirements}

                  />
                  <a href="#">
                    {/* <i className="fas fa-plus-square"></i> */}
                    <FaPlusSquare className="add-opp" />
                  </a>
                  <label className="mentor-oppor-label">Expected Outcome</label>
                  <input
                    className="mentor-oppor-input1 mentor-input6 border-bottom border-warning-subtle border-2"
                    type="text"
                    placeholder="example"
                    onChange={(e) => setExpOutcome(e.target.value)}
                    value={expOutcome}
                  />
                  <a href="#">
                    {/* <i className="fas fa-plus-square"></i> */}
                    <FaPlusSquare className="add-opp" />
                  </a>
                  <div className="sub-btn">
                    <Link to={`/ShowOpp/${id}`} >
                      
                    <input
                      className="mentor-submit"
                      type="submit"
                      value="Publish"
                      onClick={handleSubmit}
                      />
                      </Link>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOpp;
