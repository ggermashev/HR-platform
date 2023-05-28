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
import {deleteNewMessage, getNewMessages} from "../http/newMessageApi";

const Matches = () => {
    const chat = useRef(null)
    const contactsRef = useRef(null)
    const [menu, setMenu] = useState("chats")
    const dispatch = useDispatch()
    // @ts-ignore
    const user = useSelector(state => state.user)
    const [contacts, setContacts] = useState<IContact[]>([])
    const [newMessages, setNewMessages] = useState<{ chatId: number, status: boolean }[]>([])

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
                    getNewMessages(user.id).then(msgs => {
                        let messageStatuses = msgs.map((ms: { contactId: any; }) => { return {chatId: ms.contactId, status: true}})
                        console.log(messageStatuses)
                        for (let c of new_contacts) {
                            if (messageStatuses.findIndex((ms: { chatId: number; }) => ms.chatId === c.id as number) == -1) {
                                messageStatuses.push({chatId: c.id as number, status: false})
                            }
                        }
                        setNewMessages(messageStatuses)
                    })

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
                    getNewMessages(user.id).then(msgs => {
                        let messageStatuses = msgs.map((ms: { contactId: any; }) => { return {chatId: ms.contactId, status: true}})
                        for (let c of new_contacts) {
                            if (messageStatuses.findIndex((ms: { chatId: number; }) => ms.chatId === c.id as number) == -1) {
                                messageStatuses.push({chatId: c.id as number, status: false})
                            }
                        }
                        setNewMessages(messageStatuses)
                    })
                })
            })
    }, [])

    return (
        <div className="matches">
            <Container fluid>
                <Row>
                    <Col className="col contacts" xs={12} sm={12} md={4} ref={contactsRef}>
                        {contacts.map((c, i) =>
                            <Contact key={c.id} id={c.id as number}
                                     contactId={user.role === 'USER' ? c.vacancyId as number : c.resumeId as number}
                                     lastMsg={newMessages && newMessages.find(msg => msg.chatId === c.id)?.status ? "Новое сообщение" : "Новых сообщений нет"}
                                     click={(e) => {
                                         //@ts-ignore
                                         chat.current.style.display = "block"
                                         //@ts-ignore
                                         contactsRef.current.style.display = "none"
                                         deleteNewMessage(c.id as number, user.id).then (val => {
                                             let copy_newMessages = [...newMessages]
                                             const j = copy_newMessages.findIndex(msg =>  msg.chatId === c.id as number)
                                             copy_newMessages[j].status = false
                                             setNewMessages(copy_newMessages)
                                         })
                                     }}/>
                        )}
                    </Col>
                    <Col className="col col-chat" xs={12} sm={12} md={8} ref={chat}>
                        <Chat
                            newMessages={newMessages}
                            setNewMessages={setNewMessages}
                            setContacts={setContacts}
                            onBack={() => {
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