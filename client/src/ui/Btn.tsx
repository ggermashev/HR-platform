import React, {FC} from 'react';
import {Button} from "react-bootstrap";
import "./css/Btn.css"

interface IButton {
    text: string,
    onClick: (e: any) => void,
    className?: string,
    style?: {},
    ref?:  React.MutableRefObject<null>,
    onMouseOver?: (e: any) => void
    onMouseLeave?: (e: any) => void
}

const Btn: FC<IButton> = ({className, text, onClick, style, ref, onMouseOver, onMouseLeave}) => {
    return (
        <Button onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} ref={ref} style={style} className={"btn " + className} onClick={onClick}>
            {text}
        </Button>
    );
};

export default Btn;