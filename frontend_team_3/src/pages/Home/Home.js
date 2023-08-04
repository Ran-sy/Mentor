import React, { useEffect, useState } from "react";
import './style.css'
import Form from "react-bootstrap/Form";
import { Accordion, Badge, Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import invite from "../../assets/images/invite.jpg";
import initialDetails from "../../components/homepage/mentoringdata";
import Search from "./search/Search";
import MentorInLocation from "../../components/homepage/MentorLocation";
import Logo from "../../components/logo";
import { Link } from "react-router-dom";
import { Localhost } from "../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { Error, Success } from '../../components/Toast';
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../../features/user";


const Home = () => {
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch();
const [getOpp, setGetOpp] = useState([]);
const [getReq, setGetReq] = useState([]);  
const [isLoggedIn, setIsLoggedIn] = useState(false); 
const user = useSelector((state) => state.currentUser);
  // console.log(user.tokens);

  useEffect(() => {
    const getOpportunities = async () => {
      await axios
        .get(`${Localhost}/api/opp/opp`, { withCredentials: true })
        .then((res) => { setGetOpp(res.data.data); })
        .catch((error) => { Error('PLEASE LOGIN FIRST', error.message); });
    };
    const getRequests = async () => {
      await axios
        .get(`${Localhost}/api/req/request`, { withCredentials: true })
        .then((res) => { setGetReq(res.data[0]); })
        .catch((error) => { Error('PLEASE LOGIN FIRST', error.message); });
    };
    getOpportunities();
    getRequests();
  }, []);


  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${Localhost}/api/v1/subscribe`,
        { email: input },
        // {
        //   // withCredentials: true,
        // }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage('Failed to send email initaivion');
    }
  }

  const getUser = async () => {
    try {
      const url = `http://localhost:5000/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
      dispatch(loginSuccess(data));
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    getUser();
  });

  const applyForReq = async (id) => {
    await axios.patch(`${Localhost}/api/auth/applicant/request/${id}`)
      .then(() => {
        Success('Applied Successfully')
      })
      .catch((e) => { Error('PLEASE LOGIN FIRST', e.message); })
  }

  const applyForOpp = async (id) => {
    await axios.patch(`${Localhost}/api/auth/applicant/opp/${id}`)
      .then(() => {
        Success('Applied Successfully')
      })
      .catch((e) => { Error('PLEASE LOGIN FIRST', e.message); })
  }

  return (
    <>
      <nav className="navbar">
        <Logo />
        <ul>
          <li>
            <button>
              <Link to={'/register'}>Sign up</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to={'/login'}>Login</Link>
            </button>
          </li>
        </ul>
      </nav>
      <div id="home">
        <nav className="navbar">
        <Logo />
          <ul>
            {!isLoggedIn && (
              <>
                <li>
                  <button>
                    <Link to={'/register'}>Sign up</Link>
                  </button>
                </li>
                <li>
                  <button>
                    <Link to={'/login'}>Login</Link>
                  </button>
                </li>
              </>
            )}
            {/* Additional menu items for logged-in users can be added here */}
          </ul>
          </nav>
        <div className="main">
          <div className="mentor-search" style={{ marginTop: "6%" }}>
            <Container>
              <Row>
                <Col>
                  <div className="mentor-bg">
                    <div className="best-mentor">
                      <h2 className="my-3">
                        Get Connected to the best mentors
                      </h2>
                      <p className="mb-3">
                        Book and meet over 3,458+ mentors for 1:1 mentorship in
                        our global community
                      </p>
                      <Search details={initialDetails} />
                      <a href="#">
                        <p
                          className="my-3"
                          style={{ borderBottom: "1px dashed gainsboro" }}
                        >
                          Learn more about mentor and mentee
                        </p>
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="recent-oppurtunities">
            <Container>
              <h2>Recent mentoring oppurtunities</h2>
              <Row>
                {
                  getOpp.slice(0, 2).map((opp, i) => {
                    return (
                      <Col lg={6} key={i}>
                        <div className="mentor-opportunities">
                          <div className="ment-opp-head d-flex justify-content-between">
                            <div className="pb-3">
                              <h6>{opp.title}</h6>
                              <p>
                                get mentored By :<span>{opp.owner.name}</span>
                              </p>
                            </div>
                            <div className="ment-opp-req">
                              {(user && user._id && user.profile)
                                ? ((opp?.applicants?.indexOf(user?._id) === -1) && (opp?.owner !== user?._id)
                                  ? <Button className="d-block mb-2" onClick={() => applyForOpp(opp._id)}> Apply </Button>
                                  : <Button className="d-block mb-2" > Applied </Button>)
                                : <Button className="d-block mb-2" > Mentor </Button>
                              }

                              <Link to={'/ShowOpp/' + opp._id}>
                                <Button className="d-block mb-2">View</Button>{" "}</Link>
                            </div>
                          </div>
                          <div className="tags mb-4">
                            <Stack direction="horizontal" gap={2} className="mb-2">
                              <Badge>{opp.certificate}</Badge>
                              <Badge>{opp.location}</Badge>
                              <Badge>{opp.duration / 30} Month</Badge>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Badge>{opp.paid.isPaid ? 'Paid' : 'Not Paid'}</Badge>
                              <Badge>{opp.getHired ? 'Might get hired' : 'Not employable'}</Badge>
                            </Stack>
                          </div>
                          <p>
                            {opp.description}
                            <br />
                          </p>
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
              <Link to="opp" className="more">
                <h5 className=" pt-5">More opportunities</h5>
              </Link>
            </Container>
          </div>
          <div className="invite-mentor">
            <Container>
              <Row className="flex-md-row flex-column-reverse">
                <Col lg={5} className="ps-0 order-lg-1 ">
                  <Image src={invite} alt="Invite" />
                </Col>
                <Col lg={7} className=" order-lg-2">
                  <div className="invite-sec">
                    <h4>
                      Know someone who will <br />
                      make a good mentor?
                    </h4>
                    <p>Invite them to join!</p>
                    <div className="mail-invite">
                      <Form.Control
                        type="memaila"
                        placeholder="Email Address"
                      />
                      <button onClick={handleClick}>Invite</button>
                      {message && <p>{message}</p>}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="open-requests">
            <div className="open-requests">
              <Container>
                {getReq.slice(0, 2).map((req) => {
                  return (<div className='col-md-10 col-12 pt-4' key={req.id}>
                    <div className='rounded p-4' style={{ backgroundColor: "#e6f2f2" }}>
                      <div className='d-flex flex-column  flex-md-row justify justify-content-between '>
                        <div className='info ' style={{ flexBasis: "50%" }}>
                          <h3 className=' fw-bold h5 text-sec-color moblie-font-req'>{req.title}</h3>
                          <p className='small fw-bold  '>{req.owner.name} <span className='text-sec-color w-50'> is looking for a mentor</span></p>
                          <p className='small lh-sm  mt-4 mb-md-3 mb-1'>{req.description}</p>
                          <p className='fw-bold small'>...Read more</p>
                        </div>
                        <div className='req flex-column-reverse d-flex flex-md-column justify-content-between' style={{ flexBasis: "50%" }}>
                          <div className='text-end moblie-font-req'>
                            <Link to={'/ShowReq/' + req._id}>
                              <button className='me-2 custom-padding text-respon text-white bg-main-color d-inline-block border-0 small custom-padding rounded-pill'>View details</button>
                            </Link>
                            {(user && user._id && user.profile)
                              ? ((req?.applicants?.indexOf(user?._id) === -1) && (req?.owner !== user?._id)
                                ? <button className='bg-main-color text-white  text-respon custom-padding small d-inline-block border-0  mt-1  rounded-pill' onClick={() => applyForReq(req._id)}> Apply </button>
                                : <button className='bg-main-color text-white  text-respon custom-padding small d-inline-block border-0  mt-1  rounded-pill' > Applied </button>)
                              : <button className=' bg-main-color text-white  text-respon custom-padding small d-inline-block border-0  mt-1  rounded-pill'>Mentee</button>}
                          </div>
                          <div className='d-flex justify-content-around mb-4 moblie-font-req mt-4 mt-md-0'>
                            <div>
                              <p><span className='text-sec-color fw-bold'>Duration</span> : {req.duration / 30} Month</p>
                              <p><span className='text-sec-color fw-bold'>Looking for a job: </span> {req.lookingJob ? "yes" : "no"}</p>
                            </div>
                            <div className=''>
                              <p> <span className='text-sec-color fw-bold'>Paid</span>: {req.paid.isPaid ? "yes" : "no"}    </p>
                              <p><span className='text-sec-color fw-bold'>Experince</span> : {req.experience}    </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)
                })}
                <Link to="/reqs" className="more">
                  <h5 className=" pt-5">More requests</h5>
                </Link>
              </Container>
            </div>
          </div>
          <div className="faq">
            <Container>
              <Row>
                <Col lg={6}>
                  <h2>Having any questions ?</h2>
                  <p className="mb-lg-0 mb-5">Take a look at our FAQ</p>
                </Col>
                <Col lg={6}>
                  <Accordion defaultActiveKey={["0"]} alwaysOpen>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        How much does it cost to be a mentor?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        What is a no-show? What is a no-show policy?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        How long is the review process for a mentor application?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        Is the timezone in my booking reflected correctly?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        How do i change my email address?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            </Container>
          </div>
          <MentorInLocation />
        </div>
      </div>
    </>
  );
}

export default Home;
