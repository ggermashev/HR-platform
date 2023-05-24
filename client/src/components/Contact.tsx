import React, {FC, useEffect, useMemo, useState} from 'react';
import {Container, Image} from "react-bootstrap";
import "./css/Contact.css"
import {useDispatch, useSelector} from "react-redux";
import {setChatId} from "../redux/activeChatSlice";
import {setTestId} from "../redux/activeTestSlice";
import {getResume, getUser, getVacancy} from "../api/Api";
import {IResume, IUser, IVacancy} from "../types/types";

interface IContact {
    click: (e: any) => void,
    id: number,
    contactId: number,
    lastMsg: string,
}

const Contact: FC<IContact> = ({id, click, contactId, lastMsg}) => {
    // @ts-ignore
    const activeChatId = useSelector(state => state.activeChat.id)
    // @ts-ignore
    const dispatch = useDispatch()
    // @ts-ignore
    const user = useSelector(state => state.user)
    const [contact, setContact] = useState<IResume | IVacancy>()


    useEffect(() => {
        user.role == 'user'
            ?   getVacancy(contactId).then(val => setContact(val))
            :   getResume(contactId).then(val => setContact(val))

    })

    return (
        <div className={activeChatId == id ? "contact contact-active" : "contact"} onClick={e => {
            click(e)
            dispatch(setChatId(id))
        }}>
            <div className="photo">
                <Image src={require("../images/ava.jpg")}/>
            </div>
            <div className="content">
                <div className="title"><p>{contact?.profession} - {contact?.post}</p></div>
                <div className="msg"><p>{lastMsg}</p></div>
            </div>
        </div>
    );
};

export default Contact;