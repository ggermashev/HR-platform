import React from 'react';
import {Form} from "react-bootstrap";

const TextInput = (props: {value: string, setValue: (s: string) => void, label: string}) => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{props.label}</Form.Label>
                    <Form.Control as="textarea" rows={3} value={props.value} onChange={e => {props.setValue(e.target.value)}}/>
                </Form.Group>
            </Form>
        </div>
    );
};

export default TextInput;