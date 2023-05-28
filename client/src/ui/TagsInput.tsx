import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import "./css/TagsInput.css"
import {Form, InputGroup} from "react-bootstrap";
import Btn from "./Btn";
import TagsContainer from "./TagsContainer";
import {getAllSkills, getSimilarSkills} from "../http/skillApi";
import {ISkill} from "../types/types";

interface ITagsInput {
    text: string,
    value: string,
    setValue: (s: string) => void,
    display: string,
    setDisplay: (s: string) => void,
    tags: string[],
    setTags: (s: string[]) => void,
}

const TagsInput: FC<ITagsInput> = ({text, value, setValue, display, setDisplay, tags, setTags}) => {
    const [choice, setChoice] = useState<ISkill[]>([])

    useEffect(() => {
        if (value === "") {
            getAllSkills().then(skills => {
                setChoice(skills)
            })
        } else {
            getSimilarSkills(value).then(
                skills => {
                    setChoice(skills)
                })
        }
    }, [value])

    return (
        <div className="choice-input">
            <TagsContainer tags={tags} onDelete={(val) => setTags(tags.filter((t, i) => i !== val))}/>
            <InputGroup className="mb-3">
                <InputGroup.Text className="input-text" id="basic-addon">{text}</InputGroup.Text>
                <Form.Control
                    aria-describedby="basic-addon"
                    value={value}
                    onChange={e => {
                        setValue(e.target.value)
                    }}
                    onFocus={e => {
                        setDisplay("block")
                    }}
                    onClick={e => {
                        e.stopPropagation()
                    }}
                />
            </InputGroup>
            <div className="choice-field" style={{display: display}} onClick={e => {
                e.stopPropagation()
            }}>
                {choice.map(ch =>
                    <Btn text={ch.skill} onClick={() => {
                        setTags([...tags, ch.skill])
                    }}/>
                )}
            </div>
        </div>
    );
};

export default TagsInput;