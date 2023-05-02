import React from "react";
export default function ForcastDay(props) {
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
        let day = date.getDay();
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return days[day];
    }
    return (
        <div>
            <div className="forcastDay">{day()}</div>
            <img
                src="http://openweathermap.org/img/wn/03n@2x.png"
                alt="scattered clouds"
                class="icons-input"
            />
            <div className="forcastTemprature">
                <span className="maxTemprature"> {max()}</span>
                <span className="minTemprature">{min()}</span>
            </div>
        </div>
    );
}
