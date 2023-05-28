import React, {FC} from 'react';
import {Dropdown} from "react-bootstrap";
import "./css/DropDownBtns.css"

interface IDropDownBtns {
    title: string,
    items: React.ReactNode[],
    className?: string
}

const DropDownBtns: FC<IDropDownBtns> = ({title, items, className}) => {
    return (
        <Dropdown className={className}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {title}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {items.map(i => <Dropdown.Item href="#" onClick={(e) => {e.stopPropagation()}}>{i}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropDownBtns;