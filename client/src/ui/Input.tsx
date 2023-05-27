import React, {FC} from 'react';
import {Form, InputGroup} from "react-bootstrap";
import "./css/Input.css"

interface IInput {
    text: string,
    value: string,
    setValue: (s: string) => void,
    type?: "text" | "password"
}

const Input: FC<IInput> = ({text, value, setValue, type="text"}) => {

    return (
        <InputGroup className="mb-3">
            <InputGroup.Text className="input-text" id="basic-addon">{text}</InputGroup.Text>
            <Form.Control
                aria-describedby="basic-addon"
                value={value}
                onChange={e => {setValue(e.target.value)}}
                type={type}
            />
        </InputGroup>
    );
};

export default Input;