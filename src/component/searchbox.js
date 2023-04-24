import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./searchbox.css";

export default function Search(props) {
    const [city, setcity] = useState(" ");
    const [weatherDate, setWeatherData] = useState({ loaded: false });

    function displayWeather(response) {
        setWeatherData({
            temperature: response.data.main.temp,

            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            description: response.data.weather[0].description,
            loaded: true,
        });
    }
    function showvalue(event) {
        event.preventDefault();
    }
    function changecity(event) {
        setcity(event.target.value);
    }

    let form = (
        <form className="box" onSubmit={showvalue}>
            <button>
                <FontAwesomeIcon icon={faSearch} size="xl" />
            </button>
            <input
                type="search"
                placeholder="type a city"
                onChange={changecity}
                autoComplete="city"
            />
        </form>
    );
    if (weatherDate.loaded) {
        return (
            <div>
                {form}
                <div className="nameinput">{props.defaultcity}</div>
                <ul className="detail-input">
                    <li>
                        <img
                            src={weatherDate.icon}
                            alt={weatherDate.description}
                            className="icon-input"
                        />
                    </li>
                    <li>
                        Temperature: {Math.round(weatherDate.temperature)}°C
                    </li>
                    <li>Description: {weatherDate.description}</li>
                    <li>Humidity: {weatherDate.humidity}%</li>
                    <li>Wind: {weatherDate.wind}km/h</li>
                </ul>
            </div>
        );
    } else {
        let apiKey = "094780c710fa4efd669f0df8c3991927";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultcity}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeather);

        return form;
    }
}
