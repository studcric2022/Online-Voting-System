import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Collapse } from 'react-bootstrap';
import FloatingButton from '../components/FloatingButton';

// Assuming you have some faqData array with title and content properties
const faqData = [
  {
    title: "How do I create a poll?",
    content: "To create a poll, you need to sign in with your email and password. Then click on the Create Poll button on the homepage and fill out the form with your poll question and options."
  },
  {
    title: "How do I vote on a poll?",
    content: "To vote on a poll, you need to sign in with your Voter ID and Election ID. Then go to the specific poll you want to vote on. Click on the poll and select one of the options. You can only vote once per poll."
  },
  {
    title: "How do I see the results of a poll?",
    content: "To see the results of a poll, you need to sign in with your email and password. Then browse the polls on the Dashboard. Click on the poll you want to see the results of and you will see the result."
  }
];

// A function that renders a single FAQ item
const renderFAQItem = ({title, content}, index) => {
  // A state variable that indicates whether the answer is expanded or collapsed
  const [open, setOpen] = useState(false);
  
  

  return (
    <Card>
      <Card.Header>
        <Button variant="link" onClick={() => setOpen(!open)}>
          <h1 style={{color: '#333', fontSize: 18, fontWeight: 'bold'}}>{title}</h1>
        </Button>
      </Card.Header>
      <Collapse in={open}>
        <Card.Body>
          <h1 style={{color: '#333', fontSize: 16}}>{content}</h1>
        </Card.Body>
      </Collapse>
    </Card>
    
  );
};



// A function that renders the whole component
const Help = () => {
  return (
    <div>
    {<Container>
      <Row>
        <Col>
          <h1>Help</h1>
          <p>Welcome to the voting app! Here you can find some useful information on how to use the app and get answers to some common questions.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
            <h1 style={{color: '#333', fontSize: 24, fontWeight: 'bold', marginVertical: 10}}>Frequently Asked Questions</h1>
            {faqData.map(renderFAQItem)}
          </div>
        </Col>
        </Row>
        <Row>
        <Col>
          <Card>
            <Card.Header>How to Use the App</Card.Header>
            <Card.Body>
              <Card.Text>
                <ol>
                  <li>Sign up with your email and password or sign in if you already have an account.</li>
                  <li>Create a new poll by clicking on the "Create Poll" button on the homepage and filling out the form.</li>
                  <li>Vote on existing polls by going through your Dashboard</li>
                  <li>See the results of polls by clicking on them and viewing the chart.</li>
                </ol>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
        <Card>
            <Card.Header>Contact Us</Card.Header>
            <Card.Body>
              <Card.Text>
                <ul>
                <li><a href="mailto:elect.me5160@gmail.com" >Email: elect.me5160@gmail.com</a></li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>     
    </Container>}
    
    </div>
  );
}

export default Help;