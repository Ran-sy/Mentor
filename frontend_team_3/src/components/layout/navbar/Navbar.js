import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../../assets/images/logo.png"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { Localhost } from '../../../config/api';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Success } from '../../Toast';
import { loginFailure, logout } from '../../../features/user';
import woman from "../../../assets/images/women.jpg"
import Logo from '../../logo';


const MyNavbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutp = async () => {
    try {
      await axios.delete(`${Localhost}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(logout())
      navigate('/login')
      Success('logout Success')
    } catch (e) {
      Error("Logout failed:", e);
    }
  }

  const [isClick, setIsClick] = useState(false)
  const user1 = useSelector(state => state.currentUser);
  const [data, setProfileData] = useState(null);
  const userId = user1?._id;

  const user = {
    id: 1,
    username: "balqees saber",
    img: "https://image.lexica.art/md2/c7a4ec7a-e570-4ef8-8c0e-e87ec0ab8587",
    job_title: "software developer",
    isActive: true,
    userType: 'mentee'
  };

  useEffect(() => {
    const fetchProfileById = async () => {
      try {
        if (user1) {

          if (user1?.role === "mentee") {
            const response = await axios.get('http://localhost:5000/api/v1/mentorProfile/' + `${userId}`)
            setProfileData(response.data); // Update the state with the fetched profile data
          }
          else if (user1?.role === "mentor") {
            const response = await axios.get('http://localhost:5000/api/v1/menteeProfile/' + `${userId}`);
            setProfileData(response.data); // Update the state with the fetched profile data
          }
        }
      } catch (error) {
        console.error(error);
      }

    };

    if (user1) {
      fetchProfileById(); // Fetch profile data if the user1 object is available
    }
  }, [user1]);

  return (
    <Navbar expand="lg" bg='white'>
      <Container>
        <Logo />
        {user.isActive ? (
          <>
            <Navbar.Offcanvas id="basic-navbar-nav" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
              <Offcanvas.Header closeButton className='ms-auto'></Offcanvas.Header>
              <Offcanvas.Body className='pt-sm-5 pt-lg-0 align-items-center'>
                <Nav className="ms-auto">
                  <Form className="d-flex flex-column-reverse flex-sm-row me-2">
                  </Form>
                  <Nav.Link to="/" className='user-item ' onClick={() => setIsClick(!isClick)} style={{ paddingTop: '5px' }}>
                    <div className='color-gray rounded-pill text-capitalize fw-bold'>
                      <img src={woman} alt='user-img' className='rounded-circle me-4' width={40} height={40} />
                    </div>
                    {/* to click in pic user display links */}
                    {isClick && (<ul className="nav flex-column menu p-3 text-center">
                      <li className="nav-item px-3">
                        <div className='d-flex align-items-center '>
                          <img src={woman} alt='user-img' className="rounded-circle me-3" width={60} height={60} />
                          <p className='align-self-center fw-bold text-capitalize text-start'>
                            {/* <span className='d-block text-white'>{user.username}</span> */}
                            <span className='d-block text-white'>{user1.name}</span>
                            <span className='d-block text-white'>{user1.email}</span>
                            <span className='d-block text-white'>{user1.role}</span>
                          </p>
                        </div>
                        <Link to="/edituser" className="nav-link btn d-block py-2 px-4 rounded-pill  mt-3 mx-auto text-white fw-bold text-capitalize btnUser" > view profile</Link>
                      </li>
                      <li className="nav-item text-start d-lg-none">
                        <Link to="/edituser" className="nav-link text-light text-capitalize fw-bold" >edit profile</Link>
                      </li>
                      {/* if user type mentee show some links , is not show others links */}
                      {/* {user.userType === "mentee" ? ( */}
                      {user1?.role === "mentee" ? (
                        <>
                          <li className="nav-item text-start d-lg-none">
                            <Link to="/my-requests" className="nav-link text-light text-capitalize fw-bold" >my requests</Link>
                          </li>
                          <li className="nav-item text-start d-lg-none">
                            <Link to="/post-request" className="nav-link text-light text-capitalize fw-bold" >post a new request</Link>
                          </li>
                          <li className="nav-item text-start d-lg-none">
                            <Link to="/new-mentoring-request" className="nav-link text-light text-capitalize fw-bold">new mentoring request</Link>
                          </li>
                          <li className="nav-item text-start d-lg-none">
                            <Link to="/edit-request" className="nav-link text-light text-capitalize fw-bold" > edit request</Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="nav-item text-start d-lg-none">
                            <Link to="/my-opportunities" className="nav-link text-light text-capitalize fw-bold">my opportunities</Link>
                          </li>
                          <li className="nav-item text-start d-lg-none">
                            <Link to="/post-opportunity" className="nav-link text-light text-capitalize fw-bold" >post a new opportunity</Link>
                          </li>
                          <li className="nav-item text-start d-lg-none">
                            <Link to="/view-mentoring-opportuniy" className="nav-link text-light text-capitalize fw-bold">view mentoring opportunity</Link>
                          </li>
                          <li className="nav-item text-start d-lg-none">
                            <Link to="/edit-opportunity" className="nav-link text-light text-capitalize fw-bold" > edit opportunity</Link>
                          </li>
                        </>
                      )}
                      <li className="nav-item text-start">
                        <Link to="/" className="nav-link text-light text-capitalize fw-bold" >help</Link>
                      </li>
                      <li className="nav-item"><hr className="divider bg-white m-0" /></li>
                      <li className="nav-item">
                        <Link onClick={logoutp} className="nav-link text-light text-capitalize fw-bold" >log out</Link>
                      </li>
                    </ul>)}
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        ) : ""}

      </Container>
    </Navbar >
  )
}

export default MyNavbar