import React, {FC} from 'react';
import {Button} from "react-bootstrap";
import "./css/Btn.css"

interface IButton {
    text: string,
    onClick: () => void,
    className?: string,
    style?: {},
}

const Btn: FC<IButton> = ({className, text, onClick, style}) => {
    return (
        <Button style={style} className={"btn " + className} onClick={onClick}>
            {text}
        </Button>
    );
};

export default Btn;