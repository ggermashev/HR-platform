import React, {FC, useEffect, useReducer, useState} from 'react';
import Btn from "../ui/Btn";
import "./css/Chat.css"
import Input from "../ui/Input";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../redux";
import {setChatId} from "../redux/activeChatSlice";
import Calendar from "./Calendar";
import {IMessage, IResume, IUser, IVacancy} from "../types/types";
import {getContact} from "../http/contactApi";
import {getMessages, sendMessage} from "../http/messageApi";
import {getVacancy} from "../http/vacancyApi";
import {getResume} from "../http/resumeApi";
import {useAppSelector} from "../hooks/reduxHooks";
import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from '@socket.io/component-emitter';
import {socket} from "../App";
import SelectInput from "../ui/SelectInput";
import Search from "./Search";
import DropDowns from "../ui/DropDowns";
import {Dropdown} from "react-bootstrap";
import DropDownBtns from "../ui/DropDownBtns";
import Test from "./Test";

interface IChat {
    onBack?: () => void,
    vacancyId?: number,
}


const Chat: FC<IChat> = ({onBack, vacancyId}) => {
    const [msg, setMsg] = useState("")
    const dispatch = useDispatch()
    const chatId = useAppSelector(state => state.activeChat.id)
    const [chooseTime, setChooseTime] = useState(false)
    const [messages, setMessages] = useState<IMessage[]>()
    const user = useAppSelector(state => state.user)
    const [receiverId, setReceiverId] = useState<number>(-1)
    const [testWatching, setTestWatching] = useState(false)
    const [vacancyID, setVacancyId] = useState(-1)

    // const socket = new WebSocket('ws://localhost:5000/')
    // socket.onmessage = (event) => {
    //     const [chatId, userIdFrom, userIdTo] = event.data.split(' ')
    //     console.log("socket")
    //     if (userIdFrom == user.id || userIdTo == user.id) {
    //         console.log(user.id)
    //         getMessages(chatId).then(vals => {
    //             setMessages(vals)
    //         })
    //     }
    // }

    useEffect(() => {
        function onMessage(msg: string) {
            const [chatId, userIdFrom, userIdTo] = msg.split(' ')
            console.log(msg)
            if (parseInt(userIdFrom) == user.id || parseInt(userIdTo) == user.id) {
                getMessages(parseInt(chatId)).then(vals => {
                    setMessages(vals)
                })
            }
        }

        socket.on('chat message', onMessage)

        return () => {
            socket.off('chat message', onMessage)
        }
    }, [])

    useEffect(() => {
        if (chatId !== -1) {
            getContact(chatId).then(val => {
                getMessages(chatId).then(vals => {
                    setMessages(vals)
                })
                if (user.role === 'USER') {
                    getVacancy(val.vacancyId).then(vac => {
                        setVacancyId(vac.id)
                        setReceiverId(vac.userId)
                    })
                } else {
                    getResume(val.resumeId).then(res => {
                        setReceiverId(res.userId)
                    })
                }
            })
        }

    }, [chatId])

    return (
        <>
            {!testWatching
                ? <div className="chat">
                    {chatId !== -1
                        ? <>
                            <div className="head">
                                <div className="back">
                                    <Btn text={"Назад"} onClick={() => {
                                        dispatch(setChatId(-1))
                                        if (onBack) {
                                            onBack()
                                        }
                                    }}/>
                                </div>
                                <div className="chat-info"><p>Название</p></div>
                                {user.role === 'USER' &&
                                    <DropDownBtns className="delete-btn" title={"Меню"} items={[
                                        <Btn text={"Пройти тест"} onClick={() => {
                                            setTestWatching(true)
                                        }}/>,
                                        <Btn text={"Отказать"} onClick={() => {
                                        }}/>,
                                        <Btn text={"Профиль"} onClick={() => {
                                        }}/>,
                                    ]}/>}
                                {user.role === 'HR'
                                    && <DropDownBtns className="delete-btn" title={"Меню"}
                                                     items={[
                                                         <Btn text={"Результаты теста"} onClick={() => {
                                                         }}/>,
                                                         <Btn text={"Отказать"} onClick={() => {
                                                         }}/>,
                                                         <Btn text={"Профиль"} onClick={() => {
                                                         }}/>,
                                                     ]}/>}
                                {/*<Btn className="delete-btn" text={"Удалить"} onClick={() => {*/}
                                {/*}}/>*/}
                            </div>
                            <div className="messages">
                                {messages && messages.map(m =>
                                    <div key={m.id}
                                         className={m.userIdFrom == user.id ? "my" : "other"}>{m.message}</div>
                                )}
                                {/*<div className="choose-time">*/}
                                {/*    <Btn text={"Выбрать время собеседования"} onClick={() => {*/}
                                {/*    }}/>*/}
                                {/*    <Calendar/>*/}
                                {/*</div>*/}
                            </div>
                            <div className="input-field">
                                <Input text={"Сообщение"} value={msg} setValue={setMsg}/>
                                <Btn style={{marginBottom: "20px"}} text={"отправить"} onClick={() => {
                                    sendMessage(msg, user.id, receiverId as number, chatId).then(val => {
                                        socket.emit('chat message', val.id)
                                        setMsg("")
                                    })
                                }}/>
                            </div>

                        </>
                        : <></>
                    }
                </div>
                : user.role == 'USER' && <Test onBack={() => {setTestWatching(false)}} vacancyId={vacancyID}/>
            }
        </>


    );
};

export default Chat;