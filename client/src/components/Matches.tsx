import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import "./css/Matches.css"
import Contact from "./Contact";
import Btn from "../ui/Btn";
import Chat from "./Chat";
import {useDispatch, useSelector} from "react-redux";
import {setChatId} from "../redux/activeChatSlice";
import Test from "./Test";
import {setTestId} from "../redux/activeTestSlice";
import {IContact, IResume, IVacancy} from "../types/types";
import {getResume, getResumesByUser} from "../http/resumeApi";
import {getContactsByResume, getContactsByVacancy} from "../http/contactApi";
import {getVacancies, getVacanciesByUser, getVacancy} from "../http/vacancyApi";

const Matches = () => {
    const chat = useRef(null)
    const contactsRef = useRef(null)
    const [menu, setMenu] = useState("chats")
    const dispatch = useDispatch()
    // @ts-ignore
    const user = useSelector(state => state.user)
    const [contacts, setContacts] = useState<IContact[]>([])

    useEffect(() => {
        user.role === 'USER'
            ? getResumesByUser(user.id).then(resumes => {
                const new_contacts: IContact[] = []
                Promise.all(resumes.map((resume: { id: number; }) => getContactsByResume(resume.id))).then(contactss => {
                    for (let contacts of contactss) {
                        for (let contact of contacts) {
                            new_contacts.push(contact)
                        }
                    }
                    setContacts(new_contacts)
                })
            })
            :
            getVacanciesByUser(user.id).then(vacs => {
                const new_contacts: IContact[] = []
                Promise.all(vacs.map((vac: { id: number; }) => getContactsByVacancy(vac.id))).then(contactss => {
                    for (let contacts of contactss) {
                        for (let contact of contacts) {
                            new_contacts.push(contact)
                        }
                    }
                    setContacts(new_contacts)
                })
            })
    }, [])

    return (
        <div className="matches">
            <Container fluid>
                <Row>
                    <Col className="col contacts" xs={12} sm={12} md={4} ref={contactsRef}>
                        {contacts.map(c =>
                            <Contact key={c.id} id={c.id as number}
                                     contactId={user.role === 'USER' ? c.vacancyId as number : c.resumeId as number}
                                     lastMsg={"msg"} click={(e) => {
                                //@ts-ignore
                                chat.current.style.display = "block"
                                //@ts-ignore
                                contactsRef.current.style.display = "none"
                            }}/>
                        )}

                    </Col>
                    <Col className="col col-chat" xs={12} sm={12} md={8} ref={chat}>
                        <Chat onBack={() => {
                            //@ts-ignore
                            chat.current.style.display = "none"
                            //@ts-ignore
                            contactsRef.current.style.display = "block"
                        }}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Matches;