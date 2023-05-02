import React, { useState } from "react";
import "./forcast.css";
import axios from "axios";
import ForcastDay from "./forcastday";

export default function Forcast(props) {
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(null);

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);
    }
    if (loaded) {
        console.log(forecast);

        return (
            <div className="weatherForcast">
                <div className="col">
                    <ForcastDay data={forecast[0]} />
                </div>
            </div>
        );
    } else {
        let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
        let longitude = props.coordinate.lon;
        let latitude = props.coordinate.lat;
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
        return null;
    }
}
