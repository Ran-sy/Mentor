import React, { useState } from "react";
import "./style.css";
import { FaPlusSquare } from "react-icons/fa";
import { useSelector } from 'react-redux'
import axios from "axios";
import { Localhost } from "../../config/api";
import { Link, useNavigate } from "react-router-dom";
import { Error, Success } from "../../components/Toast";

const MentoringOpportunityForm = () => {
  const navigate = useNavigate()
  const user = useSelector(state=> state.currentUser)
  const [OppId, setOppId] = useState(null)
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
  const [responsibilitiesCount, setResponsibilitiesCount] = useState([])
  const [requirementsCount, setRequirementsCount] = useState([])
  const [expOutcomeCount, setExpOutcomeCount] = useState([])
  const [requirements, setRequirements] = useState('')
  const [expOutcome, setExpOutcome] = useState('')
  // const user = useSelector(state => state.currentUser)

  const body = { title, description, duration, location, certificate, getHired, 
    paid: { isPaid: paid, amount, currency }, responsibilities:[...responsibilities], requirements, expOutcome }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(user?.role === "mentor"){
      const addNewOPP = async () => {
        await axios.post(`${Localhost}/api/opp/opp`, body, { withCredentials: true })
        .then((res) => {
          setOppId(res.data._id);
          Success("ADD OPPERTUNITY SUCCESSFULLY");
          navigate(`/showOpp/${res.data._id}`)
        }).catch((error) => {
          Error("FAILED TO ADD OPPERTUNITY" + error.message);
        });
      }
      addNewOPP()
    }else{
      Error("YOU NEED TO BE A MENTOR!!")
    }
  };
  return (
    <div className="parent">
      <div className="container">
        <div className="row">
          <div className="div1 d-none d-lg-block col-lg-2">
            <span>
              <Link to={`/ShowOpp/${OppId}`}>View Mentoring Opportunity</Link>
            </span>
            <span>Settings</span>
            <span>Terms and Privacy</span>
            <br />
            <br />
            <span>Post a new opportunity &nbsp;
              <a href="#">
                <FaPlusSquare className="add-opp" />
              </a>
            </span>
          </div>
          <div className="div2 col-lg-10">
            <section className="mentoring-opportunity">
              <div className="mentoring-opportunity-container">
                <div className="mentoring-opportunity-div1">
                  <p style={{ fontSize: '19px', padding: '5px', color: '#fff' }}>Mentoring opportunity</p>
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
                  />
                  <label className="mentor-oppor-label d-none d-lg-block">
                    Opportunity Description
                  </label>
                  <textarea
                    className="mentor-oppor-input border-bottom border-warning-subtle border-2 d-none d-lg-block"
                    cols="88"
                    rows="1"
                    placeholder="example"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div className="certi">
                    <label className="mentor-oppor-label1">Certificate</label>
                    <select className="mentor-oppor-input1 mentor-select1 border-bottom border-warning-subtle border-2" onChange={(e) => setCertificate(e.target.value)}>
                      <option value={true}>Awarded</option>
                      <option value={false}>NOT Awarded</option>
                    </select>
                    <label className="mentor-oppor-label1">Duration</label>
                    <select className="mentor-oppor-input1 mentor-select2 border-bottom border-warning-subtle border-2" onChange={(e) => setDuration(e.target.value)}>
                      <option value={3}>3 months</option>
                      <option value={2}>2 months</option>
                      <option value={1}>1 months</option>
                    </select>
                  </div>
                  <br />
                  <label className="mentor-oppor-label1">Location &nbsp;</label>
                  <select className="mentor-oppor-input1 mentor-select3 border-bottom border-warning-subtle border-2" onChange={(e) => setLocation(e.target.value)}>
                    <option value='Remote'>Remote</option>
                    <option value='onsite'>onsite</option>
                  </select>
                  <span className="mentor-span0">Might get hired</span>
                  <input
                    className="form-check-input mgh-inp mgh-inp1"
                    type="checkbox"
                    onChange={(e) => setGetHired(e.target.checked)}
                  ></input>
                  <span className="checkboxtexr"></span>
                  <br />
                  <br />
                  <div className="paidDiv">

                    <label className="mentor-oppor-label1 paid">Paid</label>
                    <input
                      className="form-check-input mgh-inp mgh-inp2"
                      type="checkbox"
                      onChange={(e) => setPaid(e.target.checked)}
                    ></input>
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    <div className="d-inline-block par-opp">
                      <label className="mentor-oppor-span lab-1">Amount</label>
                      <input
                        className="mentor-oppor-input1 mentor-input2 border-bottom border-warning-subtle border-2"
                        type="number"
                        placeholder="example"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="d-inline-block par-opp">
                      <label className="mentor-oppor-span">Currency</label>
                      <select className="mentor-oppor-input1 mentor-select4 border-bottom border-warning-subtle border-2" onChange={(e) => setCurrency(e.target.value)}>
                        <option value='usd'>USD</option>
                        <option value='pound'>POUND</option>
                        <option value='kwd'>KWD</option>
                      </select>
                    </div>
                  </div>
                  <div>
                  <label className="mentor-oppor-label">Responsibilities</label>
                  <input className="mentor-oppor-input1 mentor-input4 border-bottom border-warning-subtle border-2" type="text" id="responsibilities"
                    placeholder="example" name="responsibilities"
                    onChange={(e) => setResponsibilities(prev => {
                      // Split the current string responsibilities into an array of strings
                      const prevArray = prev.split(',');
                      // Update the value at index 0
                      prevArray[0] = e.target.value;
                      // Join the updated array back into a comma-separated string
                      return prevArray.join(',');
                    })}
                     />
                  <button  className="btn" style={{ color: "#007580", padding: 0 }}
                  onClick={() => setResponsibilitiesCount((prev) => prev + 1)}>
                    {/* <i className="fas fa-plus-square"></i> */}
                    <FaPlusSquare className="add-opp" />
                  </button>
                  <div>
                    {Array.from({ length: responsibilitiesCount }, (_, i) => (
                        <div key={i} className="d-flex flex-column">
                            <input
                                onChange={(e) => 
                                  setResponsibilities(e.target.value)}
                                name="responsibilities"
                                id="responsibilities"
                                type="text"
                                className="mentor-oppor-input1 mentor-input4 border-bottom border-warning-subtle border-2"
                                placeholder="example"
                            />
                        </div>
                    ))}
                  </div>
                  </div>

                  <div>
                  <label className="mentor-oppor-label">Requirements</label>
                  <input className="mentor-oppor-input1 mentor-input5 border-bottom border-warning-subtle border-2" type="text" placeholder="example"
                  id="requirements" name="requirements"
                  onChange={(e) => setResponsibilities(prev => {
                    // Split the current string responsibilities into an array of strings
                    const prevArray = prev.split(',');
                    // Update the value at index 0
                    prevArray[0] = e.target.value;
                    // Join the updated array back into a comma-separated string
                    return prevArray.join(',');
                  })} />
                  <button  className="btn" style={{ color: "#007580", padding: 0 }}
                  onClick={() => setRequirementsCount((prev) => prev + 1)}>
                    <FaPlusSquare className="add-opp" />
                  </button>
                  <div>
                    {Array.from({ length: requirementsCount }, (_, i) => (
                        <div key={i} className="d-flex flex-column">
                            <input
                                onChange={(e) => 
                                  setRequirements(e.target.value)}
                                name="responsibilities"
                                id="responsibilities"
                                type="text"
                                className="mentor-oppor-input1 mentor-input4 border-bottom border-warning-subtle border-2"
                                placeholder="example"
                            />
                        </div>
                    ))}
                  </div>
                  </div>
                  <div>
                  <label className="mentor-oppor-label">Expected Outcome</label>
                  <input className="mentor-oppor-input1 mentor-input6 border-bottom border-warning-subtle border-2" type="text" placeholder="example"
                  id="expOutcome" name="expOutcome"
                  onChange={(e) => setResponsibilities(prev => {
                    // Split the current string responsibilities into an array of strings
                    const prevArray = prev.split(',');
                    // Update the value at index 0
                    prevArray[0] = e.target.value;
                    // Join the updated array back into a comma-separated string
                    return prevArray.join(',');
                  })} />
                  <button  className="btn" style={{ color: "#007580", padding: 0 }}
                  onClick={() => setExpOutcomeCount((prev) => prev + 1)}>
                    <FaPlusSquare className="add-opp" />
                  </button>
                  <div>
                    {Array.from({ length: expOutcomeCount }, (_, i) => (
                        <div key={i} className="d-flex flex-column">
                            <input
                                onChange={(e) => 
                                  setExpOutcome(e.target.value)}
                                name="expOutcome"
                                id="expOutcome"
                                type="text"
                                className="mentor-oppor-input1 mentor-input4 border-bottom border-warning-subtle border-2"
                                placeholder="example"
                            />
                        </div>
                    ))}
                  </div>
                  </div>
                  <div className="sub-btn">
                      <input
                        className="mentor-submit"
                        type="submit"
                        value="Publish"
                        onClick={handleSubmit}
                      />
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

export default MentoringOpportunityForm;
