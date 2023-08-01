import React from 'react';
import Slider from "react-slick";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Top from './component/tobComponents';
import { mentor1 } from '../../../assets/index'
import './style.css'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function TopMentor() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="top-mentors">
        <Container>
          <h2>Discover Egypt's top mentors</h2>
          <Row>
            <Slider {...settings} className="slider">
              <Top rating={'20'} reviews={'23'} name={'dkd'} destinagiton={'fullstack'} img={mentor1} />
              <Top rating={'20'} reviews={'23'} name={'dkd'} destinagiton={'fullstack'} img={mentor1} />
              <Top rating={'20'} reviews={'23'} name={'dkd'} destinagiton={'fullstack'} img={mentor1} />
              <Top rating={'20'} reviews={'23'} name={'dkd'} destinagiton={'fullstack'} img={mentor1} />
            </Slider>
          </Row>
        </Container>
      </div>
    </>

  )
}

export default TopMentor; 