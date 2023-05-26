import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import "./css/Search.css"
import SelectInput from "../ui/SelectInput";
import RangeInput from "../ui/RangeInput";
import Card from "./Card";
import Btn from "../ui/Btn";
import Resume from "./Resume";

import {setExperiences} from "../redux/experiencesSlice";
import {ICity, IPost, IProfession, IResume, IVacancy, IWorkExperience} from "../types/types";
import Vacancy from "./Vacancy";
import {useAppSelector} from "../hooks/reduxHooks";
import gsap from "gsap";
import {getVacanciesByUser} from "../http/vacancyApi";
import {getResumesByUser} from "../http/resumeApi";
import {getPostsByProfession} from "../http/postApi";
import {getProfessions} from "../http/professionApi";
import {getWorkExperiences} from "../http/workExperienceApi";
import {getCities} from "../http/cityApi";
import {setLike} from "../http/likeApi";

const Search = () => {
    const [professions, setProfessions] = useState([] as IProfession[])
    const [posts, setPosts] = useState([] as IPost[])
    const [cities, setCities] = useState([] as ICity[])
    const [workExperiences, setWorkExperiences] = useState([] as IWorkExperience[])
    const [cards, setCards] = useState<IResume[] | IVacancy[]>([])

    const user = useAppSelector(state => state.user)

    const [likeHover, setLikeHover] = useState(false)
    const [dislikeHover, setDislikeHover] = useState(false)

    const [profession, setProfession] = useState<IProfession>()
    const [post, setPost] = useState<IPost | null>(null)
    const [city, setCity] = useState("")
    const [experience, setExperience] = useState("")
    const [salaryFrom, setSalaryFrom] = useState("0")
    const [salaryTo, setSalaryTo] = useState("400000")
    const [left, setLeft] = useState(0)
    const [bottom, setBottom] = useState(0)
    const [rotation, setRotation] = useState("0deg")
    const [isDown, setIsDown] = useState(false)
    const [startX, setStartX] = useState(0)
    const like = useRef(null)
    const dislike = useRef(null)
    const moreInfo = useRef(null)
    const moreInfoPanel = useRef(null)
    const [decision, setDecision] = useState<"" | "like" | "dislike">("")
    const [reloadNumber, setReloadNumber] = useState(0)
    const [selfFormId, setSelfFormId] = useState(0)

    const tl = gsap.timeline()

    const cardLeftAnimation = useCallback((color: string, delta: number) => {
        tl.set(".card", {
            borderColor: color
        }).to(".card", {
            left: -delta,
            opacity: 0,
            rotation: -180,
            duration: 0.3,
        }).set(".card", {
            top: 0,
            left: 0,
            borderColor: "#5680E9",
            rotation: 0,
            width: "0%",
        }).to(".card", {
            width: "100%",
            opacity: 1,
            duration: 1,
        })
    }, [])

    const cardRightAnimation = useCallback((color: string, delta: number) => {
        tl.set(".card", {
            borderColor: color
        }).to(".card", {
            left: delta,
            opacity: 0,
            rotation: 180,
            duration: 0.3,
        }).set(".card", {
            top: 0,
            left: 0,
            borderColor: "#5680E9",
            rotation: 0,
            width: "0%",
        }).to(".card", {
            width: "100%",
            opacity: 1,
            duration: 1,
        })
    }, [])

    useEffect(() => {
        Promise.all([getProfessions(), getCities(), getWorkExperiences()]).then(
            ([professions, cities, experiences]: [IProfession[], ICity[], IWorkExperience[]]) => {
                setProfessions(professions)
                setCities(cities)
                setExperiences(experiences)
            }
        )
    }, [])

    useEffect(() => {
        console.log(user)
        user?.role == "USER"
            ? getVacanciesByUser(user.id).then(vals => {
                setCards(vals)
            })
            : getResumesByUser(user.id).then(vals => {
                setCards(vals)
            })
    }, [reloadNumber])

    useEffect(() => {
        if (profession) {
            getPostsByProfession(profession.id).then(
                vals => {
                    setPosts(vals)
                }
            )
        } else {
            setPost(null)
        }
    }, [profession])

    return (
        <div className="search">
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={4} xl={3} style={{padding: 0}}>
                        <Container fluid>
                            <Row className="filters">
                                <Col xs={6} sm={6} md={12} xl={12} className="filter">
                                    <h3 className="gold">Профессия</h3>
                                    <SelectInput default_={"Все"}
                                                 options={professions.map(p => p.profession)}
                                                 setValue={setProfession}/>
                                </Col>
                                <Col xs={6} sm={6} md={12} xl={12} className="filter">
                                    <h3>Должность</h3>
                                    <SelectInput default_={"Все"}
                                                 options={posts.map(p => p.post)}
                                                 setValue={setPost}/>
                                </Col>
                                <Col xs={6} sm={6} md={12} xl={12} className="filter">
                                    <h3>Город</h3>
                                    <SelectInput default_={"Все"}
                                                 options={cities.map(c => c.city)}
                                                 setValue={setCity}/>
                                </Col>
                                <Col xs={6} sm={6} md={12} xl={12} className="filter">
                                    <h3>Опыт работы</h3>
                                    <SelectInput default_={"Опыт не важен"}
                                                 options={workExperiences.map(w => w.workExperience)}
                                                 setValue={setExperience}/>
                                </Col>
                                <Col xs={6} sm={6} md={12} xl={12} className="filter">
                                    <h3>Зарплата</h3>
                                    <RangeInput label={"От"} minVal={0} maxVal={400000} value={salaryFrom}
                                                setValue={setSalaryFrom}/>
                                    <RangeInput label={"До"} minVal={0} maxVal={400000} value={salaryTo}
                                                setValue={setSalaryTo}/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col xs={12} sm={12} md={8} xl={9} className="cards"
                         onMouseMove={e => {
                             if (isDown) {
                                 if (e.clientX > startX + 100) {
                                     setRotation("15deg")
                                     setLeft(100)
                                     //@ts-ignore
                                     like.current.style.opacity = 0.5
                                     //@ts-ignore
                                     dislike.current.style.opacity = 0
                                     setDecision("like")

                                 } else if (e.clientX < startX - 100) {
                                     setRotation("-15deg")
                                     setLeft(-100)
                                     //@ts-ignore
                                     like.current.style.opacity = 0
                                     //@ts-ignore
                                     dislike.current.style.opacity = 0.5
                                     setDecision("dislike")
                                 } else {
                                     setRotation("0deg")
                                     setLeft(0)
                                     setDecision("")
                                     //@ts-ignore
                                     like.current.style.opacity = 0
                                     //@ts-ignore
                                     dislike.current.style.opacity = 0
                                 }
                             }
                         }}
                         onMouseUp={e => {
                             e.preventDefault()
                             setIsDown(false)
                             setLeft(0)
                             setRotation("0deg")
                             setBottom(0)
                             //@ts-ignore
                             like.current.style.opacity = 0
                             //@ts-ignore
                             dislike.current.style.opacity = 0
                             if (decision !== "") {
                                 setLike(selfFormId, cards[0]?.id as number, decision).then()
                                 cards.shift()
                                 decision == "dislike"
                                     ? cardLeftAnimation("red", 300)
                                     : cardRightAnimation("green", 300)
                                 if (cards.length == 0) {
                                     setReloadNumber(reloadNumber + 1)
                                 }
                             }
                             setDecision("")
                         }}
                         onMouseLeave={e => {
                             e.preventDefault()
                             setIsDown(false)
                             setLeft(0)
                             setRotation("0deg")
                             setBottom(0)
                             //@ts-ignore
                             like.current.style.opacity = 0
                             //@ts-ignore
                             dislike.current.style.opacity = 0
                             setDecision("")
                         }}
                         onTouchMove={e => {
                             if (e.touches[0].clientX > startX + 80) {
                                 setRotation("10deg")
                                 setLeft(20)
                                 //@ts-ignore
                                 like.current.style.opacity = 0.5
                                 //@ts-ignore
                                 dislike.current.style.opacity = 0
                                 setDecision("like")

                             } else if (e.touches[0].clientX < startX - 80) {
                                 setRotation("-10deg")
                                 setLeft(-20)
                                 //@ts-ignore
                                 like.current.style.opacity = 0
                                 //@ts-ignore
                                 dislike.current.style.opacity = 0.5
                                 setDecision("dislike")
                             } else {
                                 setRotation("0deg")
                                 setLeft(0)
                                 setDecision("")
                                 //@ts-ignore
                                 like.current.style.opacity = 0
                                 //@ts-ignore
                                 dislike.current.style.opacity = 0
                             }
                         }}
                         onTouchEnd={e => {
                             setRotation("0deg")
                             setLeft(0)
                             setBottom(0)
                             //@ts-ignore
                             like.current.style.opacity = 0
                             //@ts-ignore
                             dislike.current.style.opacity = 0
                             if (decision !== "") {
                                 setLike(selfFormId, cards[0]?.id as number, decision).then()
                                 cards.shift()
                                 decision == "dislike"
                                     ? cardLeftAnimation("red", 20)
                                     : cardRightAnimation("green", 20)
                                 if (cards.length == 0) {
                                     setReloadNumber(reloadNumber + 1)
                                 }
                             }

                             setDecision("")
                         }}
                    >
                        <Container fluid>
                            <Row>
                                <div className="card-more-info" ref={moreInfo}>
                                    {user?.role == "user"
                                        ? <Vacancy data={cards[0] as IVacancy}/>
                                        : <Resume data={cards[0] as IResume}/>
                                    }
                                </div>
                                <div className="more-info-panel" ref={moreInfoPanel}>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <div>
                                            <Image className="dislike-img"
                                                   src={dislikeHover
                                                       ? require("../images/refuse_red.png")
                                                       : require("../images/refuse.png")}
                                                   onMouseOver={() => {
                                                       setDislikeHover(true)
                                                   }}
                                                   onMouseOut={() => {
                                                       setDislikeHover(false)
                                                   }}
                                                   onClick={() => {
                                                       //@ts-ignore
                                                       moreInfo.current.style.display = "none"
                                                       //@ts-ignore
                                                       moreInfoPanel.current.style.display = "none"
                                                       setLike(selfFormId, cards[0]?.id as number, "dislike").then()
                                                       cards.shift()
                                                       window.innerWidth > 767
                                                           ? cardLeftAnimation("red", 300)
                                                           : cardLeftAnimation("red", 20)
                                                       if (cards.length == 0) {
                                                           setReloadNumber(reloadNumber + 1)
                                                       }
                                                   }}
                                            />
                                            <Btn text={"Скрыть"} onClick={() => {
                                                //@ts-ignore
                                                moreInfo.current.style.display = "none"
                                                //@ts-ignore
                                                moreInfoPanel.current.style.display = "none"
                                            }}/>
                                            <Image className="like-img"
                                                   src={likeHover
                                                       ? require("../images/handshake_green.png")
                                                       : require("../images/handshake.png")}
                                                   onMouseOver={() => {
                                                       setLikeHover(true)
                                                   }}
                                                   onMouseOut={() => {
                                                       setLikeHover(false)
                                                   }}
                                                   onClick={() => {
                                                       //@ts-ignore
                                                       moreInfo.current.style.display = "none"
                                                       //@ts-ignore
                                                       moreInfoPanel.current.style.display = "none"
                                                       setLike(selfFormId, cards[0]?.id as number, "like").then()
                                                       cards.shift()
                                                       window.innerWidth > 767
                                                           ? cardRightAnimation("green", 300)
                                                           : cardRightAnimation("green", 20)

                                                       if (cards.length == 0) {
                                                           setReloadNumber(reloadNumber + 1)
                                                       }
                                                   }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Col className="col" xs={2} sm={2} md={3}>
                                    <div className="dislike" ref={dislike}>
                                        <h2>О</h2>
                                        <h2>Т</h2>
                                        <h2>К</h2>
                                        <h2>А</h2>
                                        <h2>З</h2>
                                    </div>
                                </Col>
                                <Col className="col" xs={8} sm={8} md={6}
                                     style={{display: "flex", flexDirection: "column"}}>
                                    <Card left={left}
                                          bottom={bottom}
                                          setBottom={setBottom}
                                          rotation={rotation}
                                          setIsDown={setIsDown}
                                          setStartX={setStartX}
                                          data={cards[0]}
                                    />
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Image className="dislike-img"
                                               src={dislikeHover
                                                   ? require("../images/refuse_red.png")
                                                   : require("../images/refuse.png")}
                                               onMouseOver={() => {
                                                   setDislikeHover(true)
                                               }}
                                               onMouseOut={() => {
                                                   setDislikeHover(false)
                                               }}
                                               onClick={() => {
                                                   setLike(selfFormId, cards[0]?.id as number, "dislike").then()
                                                   cards.shift()
                                                   window.innerWidth > 767
                                                       ? cardLeftAnimation("red", 300)
                                                       : cardLeftAnimation("red", 20)
                                                   if (cards.length == 0) {
                                                       setReloadNumber(reloadNumber + 1)
                                                   }
                                               }}
                                        />
                                        <Btn text={"Подробнее"} onClick={() => {
                                            //@ts-ignore
                                            moreInfo.current.style.display = "block"
                                            //@ts-ignore
                                            moreInfoPanel.current.style.display = "flex"
                                        }}/>
                                        <Image className="like-img"
                                               src={likeHover
                                                   ? require("../images/handshake_green.png")
                                                   : require("../images/handshake.png")}
                                               onMouseOver={() => {
                                                   setLikeHover(true)
                                               }}
                                               onMouseOut={() => {
                                                   setLikeHover(false)
                                               }}
                                               onClick={() => {
                                                   setLike(selfFormId, cards[0]?.id as number, "like").then()
                                                   cards.shift()
                                                   window.innerWidth > 767
                                                       ? cardRightAnimation("green", 300)
                                                       : cardRightAnimation("green", 20)
                                                   if (cards.length == 0) {
                                                       setReloadNumber(reloadNumber + 1)
                                                   }
                                               }}
                                        />
                                    </div>
                                </Col>
                                <Col className="col" xs={2} sm={2} md={3}>
                                    <div className="like" ref={like}>
                                        <h2>О</h2>
                                        <h2>Т</h2>
                                        <h2>К</h2>
                                        <h2>Л</h2>
                                        <h2>И</h2>
                                        <h2>К</h2>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Search;