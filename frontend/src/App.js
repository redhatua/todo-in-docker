import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import React, { useState } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import './App.css';

export default function App() {
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [isAddTodo, setIsAddTodo] = useState(false);

  const onClickTodo = () => {
    setIsEditTodo(!isEditTodo);
  };

  const addTodo = () => {
    setIsAddTodo(!isAddTodo);
  };

  return (
      <Container>
          <Row>
              <Col>
                  <Card>
                      <Card.Header>TODO list</Card.Header>
                      <Card.Body>
                          <Container className={"mb-1"}>
                              <Row>
                                  <Card.Text>
                                      Add new todo by pressing the button
                                  </Card.Text>
                                  <Button variant="success" onClick={addTodo}>Add new todo</Button>
                              </Row>
                          </Container>
                          {isAddTodo && <AddTodo />}
                          <TodoList onClickTodo={onClickTodo} />
                      </Card.Body>
                      <Card.Footer>Some info in footer</Card.Footer>
                  </Card>
              </Col>
          </Row>
      </Container>
  );
}
