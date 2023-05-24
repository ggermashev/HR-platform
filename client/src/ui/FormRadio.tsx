import React, {FC, ReactEventHandler, ReactNode} from 'react';
import {Form} from "react-bootstrap";
import "./css/FormRadio.css"

interface IFormRadio {
    name: string,
    variants: string[] | ReactNode[],
    values?: string[],
    onChange: (e:  React.ChangeEvent<HTMLInputElement>) => void,
}

const FormRadio:FC<IFormRadio> = ({name, variants, values,onChange}) => {
    return (
        <Form name={name}>
            {variants.map((v, i) => (
                <div key={i} className="mb-3">
                    <Form.Check
                        label={v}
                        name={name}
                        type={'radio'}
                        id={`${i}`}
                        onChange={onChange}
                        //@ts-ignore
                        value={values ? values[i] : v}
                    />
                </div>
            ))}
        </Form>
    );
};

export default FormRadio;