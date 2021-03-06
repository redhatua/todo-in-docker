import {Container, ListGroup, Row, Col, Spinner, Button} from 'react-bootstrap';
import React, {useEffect} from "react";
import { connect } from "react-redux";
import {deleteTodo, getTodos} from "../actions";

// props.todoList.todos
function ToDoList(props) {
    useEffect(
        () => props.getTodos(),
        // eslint-disable-next-line
        []);
    return (
        <Container>
            <Row>
                <ListGroup>
                    {props.todos.loading && (<Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>)}
                    {!props.todos.loading && (
                        props.todos.todos.map((todo, index) => {
                            return (
                                <ListGroup.Item key={index} onClick={() => props.onClickTodo(todo)}>
                                    <Container>
                                        <Row>
                                            <Col>{todo.name}</Col>
                                            <Col>{todo.content}</Col>
                                            <Col>
                                                <Button variant="danger" size="sm" onClick={() => props.deleteTodo(todo.id)}>
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </ListGroup.Item>
                            );
                        })
                    )}
                </ListGroup>
            </Row>
        </Container>
    );
}

const mapStateToProps = state => {
    return { ...state };
};

export default connect(mapStateToProps, { deleteTodo, getTodos })(ToDoList);
