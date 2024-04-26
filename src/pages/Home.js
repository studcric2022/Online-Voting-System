import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';

//const Home = () => {
  //return (
    //<div>home</div>
  //)
//}

const cardData = [
  {
    title: "100+",
    text: "Polls created"
  },
  {
    title: "500+",
    text: "Votes casted"
  },
  {
    title: "50+",
    text: "Users registered"
  }
];

const renderCardItem = ({title, text}) => (
  <Carousel.Item>
    <Card className="border-0">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  </Carousel.Item>
);


function Home() {
  return (
    <Container className="container">
      <Row className="text-center mt-4">
        <Col>
          <h1>Welcome to Voting App</h1>
          <p>The easiest way to create and participate in polls</p>
        </Col>
      </Row>
      <div className="text-center mt-4">
          <Carousel interval={3000} indicators={false} controls={false}>
            {cardData.map(renderCardItem)}
          </Carousel>
      </div>
      <Row className="text-center mt-4">
        <Col md={6}>
          <h3>What our users say</h3>
          <p>"Voting App is awesome! I can create polls easily."</p>
          
          <p>"I love Voting App! It's fun and simple to use. I can vote on different topics and see the results."</p>
          
        </Col>
        <Col md={6}>
          <h3>Why choose Voting App</h3>
          <ul className="list-unstyled">
            <li> It's free and easy to use</li>
            <li> It's secure and reliable</li>
            <li> It's responsive and device-friendly</li>
            <li> It's customizable and flexible</li>
            <li> It's fun and engaging</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;