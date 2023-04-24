import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./searchbox.css";

export default function Search() {
    const [city, setcity] = useState(" ");
    const [loaded, setLoaded] = useState(false);
    const [message, setmessage] = useState("");
    const [weather, setWeather] = useState({});

    function displayWeather(response) {
        setLoaded(true);
        setWeather({
            temperature: response.data.main.temp,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            description: response.data.weather[0].description,
        });
    }
    function showvalue(event) {
        event.preventDefault();
        setmessage(city);
        let apiKey = "094780c710fa4efd669f0df8c3991927";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeather);
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
    if (loaded) {
        return (
            <div>
                {form}
                <div className="nameinput">{message}</div>
                <ul className="detail-input">
                    <li>
                        <img
                            src={weather.icon}
                            alt={weather.description}
                            className="icon-input"
                        />
                    </li>
                    <li>Temperature: {Math.round(weather.temperature)}°C</li>
                    <li>Description: {weather.description}</li>
                    <li>Humidity: {weather.humidity}%</li>
                    <li>Wind: {weather.wind}km/h</li>
                </ul>
            </div>
        );
    } else {
        return form;
    }
}
