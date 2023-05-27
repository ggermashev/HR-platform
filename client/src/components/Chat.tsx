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

interface IChat {
    onBack?: () => void,
}

const Chat: FC<IChat> = ({onBack}) => {
    const [msg, setMsg] = useState("")
    const dispatch = useDispatch()
    const chatId = useAppSelector(state => state.activeChat.id)
    const [chooseTime, setChooseTime] = useState(false)
    const [messages, setMessages] = useState<IMessage[]>()
    const user = useAppSelector(state => state.user)
    const [receiverId, setReceiverId] = useState<number>(-1)

    const socket = new WebSocket('ws://localhost:5000/')

    socket.onmessage = (event) => {
        const [chatId, userIdFrom, userIdTo] = event.data.split(' ')
        if (userIdFrom == user.id || userIdTo == user.id) {
            console.log(user.id)
            getMessages(chatId).then(vals => {
                setMessages(vals)
            })
        }
    }

    useEffect(() => {
        if (chatId !== -1) {
            getContact(chatId).then(val => {
                getMessages(chatId).then(vals => {
                    setMessages(vals)
                })
                if (user.role === 'USER') {
                    getVacancy(val.vacancyId).then(vac => {
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
        <div className="chat">
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
                        <Btn className="profile-btn" text={"Профиль"} onClick={() => {
                        }}/>
                        <Btn className="delete-btn" text={"Удалить"} onClick={() => {
                        }}/>
                    </div>
                    <div className="messages">
                        {messages && messages.map(m =>
                            <div key={m.id} className={m.userIdFrom == user.id ? "my" : "other"}>{m.message}</div>
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
                                socket.send(val.id)
                                setMsg("")
                            })
                        }}/>
                    </div>

                </>
                : <></>
            }
        </div>
    );
};

export default Chat;