import {Container, Form, Button, Spinner, Row} from 'react-bootstrap';
import React, { useRef } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

function AddTodo(props) {
    const id = useRef(null);
    const title = useRef(null);
    return (
        <Container className={"mb-1"}>
            <Row>
                {props.loading && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                {!props.loading && (
                    <Form onSubmit={e => {
                        e.preventDefault();
                        props.addTodo({
                            id:    id.current.value,
                            title: title.current.value
                        });
                    }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Todo number</Form.Label>
                            <Form.Control type="number" placeholder="Enter todo number" ref={id}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter what need todo" ref={title} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Row>
        </Container>
    );
}

const mapStateToProps = state => {
    return { loading: state.todos.loading };
};

export default connect(mapStateToProps, { addTodo })(AddTodo);
