import React from "react";
import "./forcast.css";
export default function ForcastDay(props) {
    console.log();
    function max() {
        let maxtemp = Math.round(props.data.temp.max);
        return `${maxtemp}°`;
    }
    function min() {
        let mintemp = Math.round(props.data.temp.min);
        return `${mintemp}°`;
    }
    function day() {
        let date = new Date(props.data.dt * 1000);
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let dayofmonth = date.getDate();
        if (dayofmonth < 10) {
            dayofmonth = `0${dayofmonth}`;
        }
        let dayofweek = date.getDay();
        return `${days[dayofweek]} ${dayofmonth}`;
    }
    let icon = props.data.weather[0].icon;
    let description = props.data.weather[0].description;
    return (
        <div>
            <div className="forcastDay">{day()}</div>
            <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="scattered clouds"
                class="icons-input"
            />
            <div className="descriptions">{description}</div>
            <div className="forcastTemprature">
                <span className="maxTemprature"> {max()}</span>
                <span className="minTemprature"> /{min()}</span>
            </div>
        </div>
    );
}
