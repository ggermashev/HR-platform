import React, {FC} from 'react';
import "./css/TagsContainer.css"
import Btn from "./Btn";
import {Image} from "react-bootstrap";

interface ITags {
    tags: string[],
    del?: boolean,
    onDelete?: (val: number) => void,
}

const TagsContainer: FC<ITags> = ({tags, onDelete=undefined}) => {
    return (
        <div className="tags">
            {tags && tags.map((t,i) =>
                <div className="tag">
                    <>
                        {t}
                        {onDelete !== undefined &&
                            <Image className="delete-img" src={require("../images/delete.png")}
                                   onClick={() => {
                                       onDelete(i)
                                   }}
                                   onMouseOver={(e) => {
                                       //@ts-ignore
                                       e.target.src = require("../images/delete_red.png")
                                   }}
                                   onMouseOut={(e) => {
                                       //@ts-ignore
                                       e.target.src = require("../images/delete.png")
                                   }}
                            />
                        //     && <Btn style={{padding: 0}} text={"X"} onClick={() => {
                        //         onDelete(i)
                        // }}/>
                        }
                    </>
                </div>
            )}
        </div>
    );
};

export default TagsContainer;