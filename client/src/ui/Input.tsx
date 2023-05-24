import React from 'react';
import {Form, InputGroup} from "react-bootstrap";
import "./css/Input.css"

const Input = (
    props: {
        text: string,
        value: string,
        setValue: (s: string) => void
    }) => {

    return (
        <InputGroup className="mb-3">
            <InputGroup.Text className="input-text" id="basic-addon">{props.text}</InputGroup.Text>
            <Form.Control
                aria-describedby="basic-addon"
                value={props.value}
                onChange={e => {props.setValue(e.target.value)}}
            />
        </InputGroup>
    );
};

export default Input;