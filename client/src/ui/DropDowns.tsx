import React, {FC, ReactNode} from 'react';
import {Accordion} from "react-bootstrap";
import Resume from "../components/Resume";
import "./css/DropDowns.css"

interface IDropDowns {
    titles: string[],
    bodies: ReactNode[],
}

const DropDowns: FC<IDropDowns> = ({titles, bodies}) => {
    return (
        <div>
            <Accordion>
                {titles.map((t, i) =>
                    <Accordion.Item eventKey={`${i}`}>
                        <Accordion.Header><h3>{t}</h3></Accordion.Header>
                        <Accordion.Body>
                            {bodies[i]}
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>
        </div>
    );
};

export default DropDowns;