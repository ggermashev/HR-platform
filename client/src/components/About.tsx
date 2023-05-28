import React from 'react';
import "./css/About.css"

const About = () => {
    return (
        <div className="about">
            <h1>Встречайте новую платформу для подбора персонала "MatcHR"</h1>
            <div className="profile-info">
                <h3>Во вкладке "Профиль" можно создать собственные резюме или вакансии.</h3>
            </div>
            <div className="likes-info">
                <h3>Ищите подходящие резюме или вакансии в разделе "Поиск".</h3>
            </div>
            <div className="matches-info">
                <h3>После взаимного отклика обеих сторон создается контакт. Список контактов доступен во вкладке "Контакты".</h3>
            </div>
            <div className="chat-info">
                <h3>При выборе конкретного контакта откроется real-time чат.</h3>
            </div>
            <div className="tests-info">
                <h3>При создании вакансии можно добавить тестовые вопросы. После добавления в контакты пользователь будет иметь возможность ответить на них, перейдя в меню чата.</h3>
            </div>
        </div>
    );
};

export default About;