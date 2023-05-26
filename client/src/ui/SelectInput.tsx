import React, {FC} from 'react';
import { Form } from 'react-bootstrap';
import "./css/SelectInput.css"

interface IInput {
    default_: string,
    options: string[],
    setValue: (s: any) => void
}

const SelectInput: FC<IInput> = ( {default_, options, setValue}) => {
    return (
        <Form.Select className="select-input" onChange={(e) => {setValue(e.target.value)}}>
            <option value="all">{default_}</option>
            {options.map( (opt,i)  =>
                <option key={i} value={opt}>{opt}</option>
            )}
        </Form.Select>
    );
};

export default SelectInput;