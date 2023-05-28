import React, {FC} from 'react';
import {Form} from 'react-bootstrap';
import "./css/SelectInput.css"

interface IInput {
    default_: string,
    options: string[] | { profession: string, post: string, id: number }[],
    setValue: (s: any) => void
}

const SelectInput: FC<IInput> = ({default_, options, setValue}) => {
    return (
        <div className="select-wrap">
            <Form.Select className="select-input" onChange={(e) => {
                setValue(e.target.value)
            }}>
                <option value={typeof options[0] == 'string' ? "all" : 0}>{default_}</option>
                {typeof options[0] === 'string'
                    ? options.map((opt, i) =>
                        <option key={i} value={opt as string}>{opt as string}</option>)
                    : options.map((opt, i) =>
                        <option key={i} value={`${typeof opt !== "string" ? opt?.id : ""}`}>
                            {typeof opt !== "string" ? opt?.profession : ""} - {typeof opt !== "string" ? opt?.post : ""}
                        </option>)
                }
            </Form.Select>
        </div>
    );
};

export default SelectInput;