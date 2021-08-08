import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import React, {useEffect, useState} from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import './App.css';
import {connect} from "react-redux";
import {getVersion} from "./actions";

function App(props) {
    console.log(props);
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [isAddTodo, setIsAddTodo] = useState(false);

    useEffect(
        () => props.getVersion(),
        // eslint-disable-next-line
        []);

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
                      <Card.Footer>PHP {props.todos.php} SYMPHONY {props.todos.symphony}</Card.Footer>
                  </Card>
              </Col>
          </Row>
      </Container>
  );
}
const mapStateToProps = (state) => {
    return { ...state };
}
export default connect(mapStateToProps, { getVersion })(App);

