import React, {useState} from 'react';
import Btn from "../ui/Btn";


const Calendar = () => {
    const days = Array.from(Array(31).keys()).map(x => x + 1)
    const months = ["jan", "feb", "mar", 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    const times = ["12-13", '13-14', '14-15']
    const [monthChosen, setMonthChosen] = useState("")
    const [dayChosen, setDayChosen] = useState(0)
    const [timeChosen, setTimeChosen] = useState("")
    return (
        <div className="calendar">
            <h3>Календарь</h3>
            <p> {monthChosen !== "" && monthChosen} {dayChosen !== 0 && dayChosen} {timeChosen !== "" && timeChosen}</p>
            <Btn text={"Назад"} onClick={() => {
                if (monthChosen === "") {
                    return;
                }
                if (dayChosen === 0) {
                    setMonthChosen("")
                    return;
                }
                if (timeChosen === "") {
                    setDayChosen(0)
                    return;
                }
                setTimeChosen("")
                
            }}/>
            {monthChosen === "" &&
                <>
                    <h4>Choose month</h4>
                    {months.map(m => <Btn text={m} onClick={() => {
                        setMonthChosen(m)
                    }}/>)}
                </>}
            {monthChosen !== "" && dayChosen == 0 &&
                <>
                    <h4>Choose day</h4>
                    {days.map(d => <Btn text={`${d}`} onClick={() => {
                        setDayChosen(d)
                    }}/>)}
                </>}
            {monthChosen !== "" && dayChosen !== 0 && timeChosen == "" &&
                <>
                    <h4>choose time</h4>
                    {times.map(t => <Btn text={t} onClick={() => {
                        setTimeChosen(t)
                    }}/>)}
                </>}
            {timeChosen !== "" &&
                <Btn text={"Подтвердить"} onClick={() => {}}/>
            }

        </div>
    );
};

export default Calendar;