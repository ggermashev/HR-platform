import React, {FC, useEffect, useMemo, useState} from 'react';
import {Container, Image} from "react-bootstrap";
import "./css/Contact.css"
import {useDispatch, useSelector} from "react-redux";
import {setChatId} from "../redux/activeChatSlice";
import {setTestId} from "../redux/activeTestSlice";
import {IResume, IUser, IVacancy} from "../types/types";
import {getContact} from "../http/contactApi";
import {getResume} from "../http/resumeApi";
import {getVacancy} from "../http/vacancyApi";

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
    const [opponent, setOpponent] = useState<IUser>()


    useEffect(() => {
        user.role == 'USER'
            ? getVacancy(contactId).then(val => setContact(val))
            : getResume(contactId).then(val => setContact(val))
    }, [])

    return (
        <div className={activeChatId == id ? "contact contact-active" : "contact"} onClick={e => {
            click(e)
            dispatch(setChatId(id))
        }}>
            <div className="content">
                {user.role === 'USER'
                    ?// @ts-ignore
                    <div className="title"><h3>{contact.companyName}: {contact?.profession} - {contact?.post}</h3></div>
                    :// @ts-ignore
                    <div className="title"><h3>{contact.userName}: {contact?.profession} - {contact?.post}</h3></div>
                }
                <div className="msg"><p>{lastMsg}</p></div>
            </div>
        </div>
    );
};

export default Contact;