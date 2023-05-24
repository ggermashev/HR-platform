import React, {useEffect, useRef, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import "./css/Matches.css"
import Contact from "./Contact";
import Btn from "../ui/Btn";
import Chat from "./Chat";
import {useDispatch, useSelector} from "react-redux";
import {setChatId} from "../redux/activeChatSlice";
import Test from "./Test";
import {setTestId} from "../redux/activeTestSlice";
import {IContact} from "../types/types";
import {getContacts} from "../api/Api";

const Matches = () => {
    const chat = useRef(null)
    const contactsRef = useRef(null)
    const [menu, setMenu] = useState("chats")
    const dispatch = useDispatch()
    // @ts-ignore
    const user = useSelector(state => state.user)
    const [contacts, setContacts] = useState<IContact[]>([])

    useEffect(() => {
        getContacts(user?.id).then(vals => {
                setContacts(vals)
            })
    }, [])

    return (
        <div className="matches">
            <Container fluid>
                <Row>
                    <Col className="col contacts" xs={12} sm={12} md={4} ref={contactsRef}>
                        {contacts.map(c =>
                            <Contact id={c.id as number} contactId={user.role == "user" ? c.idVacancy : c.idResume}
                                     lastMsg={c.messages.at(-1)?.message as string} click={(e) => {
                                //@ts-ignore
                                chat.current.style.display = "block"
                                //@ts-ignore
                                contacts.current.style.display = "none"
                            }}/>
                        )}

                    </Col>
                    <Col className="col col-chat" xs={12} sm={12} md={8} ref={chat}>
                        <Chat onBack={() => {
                            //@ts-ignore
                            chat.current.style.display = "none"
                            //@ts-ignore
                            contacts.current.style.display = "block"
                        }}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Matches;