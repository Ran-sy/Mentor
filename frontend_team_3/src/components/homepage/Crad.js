import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Card({ person }) {
    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <div className="img-result">
                        <img className="br-100 h3 w3 dib" alt={person.name} src={person.imgPath} />
                        <div className='info-result'>
                            <h4>{person.name}</h4>
                            <p>{person.specific}</p>
                        </div>
                    </div>
                </Col>

            </Row>
        </Container>

    );
}

export default Card;