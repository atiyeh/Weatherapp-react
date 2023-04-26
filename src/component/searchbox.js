import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Oval } from "react-loader-spinner";

import "./searchbox.css";

export default function Search(props) {
    const [city, setcity] = useState(props.defaultcity);
    const [weatherDate, setWeatherData] = useState({ loaded: false });

    function displayWeather(response) {
        setWeatherData({
            loaded: true,
            temperature: response.data.main.temp,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            description: response.data.weather[0].description,
            city: response.data.name,
        });
    }

    function showvalue(event) {
        event.preventDefault();
        search();
    }

    function changecity(event) {
        setcity(event.target.value);
    }
    function search() {
        const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeather);
    }
    if (weatherDate.loaded) {
        return (
            <div>
                <form className="box" onSubmit={showvalue}>
                    <button>
                        <FontAwesomeIcon icon={faSearch} size="xl" />
                    </button>
                    <input
                        type="search"
                        placeholder="type a city"
                        className="placeholderinput"
                        onChange={changecity}
                        autoComplete={city}
                    />
                </form>
                <ul className="detail-input">
                    <li className="nameinput">{weatherDate.city}</li>
                    <li>
                        <img
                            src={weatherDate.icon}
                            alt={weatherDate.description}
                            className="icon-input"
                        />
                    </li>
                    <li className="description">{weatherDate.description}</li>
                    <li>
                        Temperature: {Math.round(weatherDate.temperature)}°C
                    </li>
                    <li>Humidity: {weatherDate.humidity}%</li>
                    <li>Wind: {weatherDate.wind}km/h</li>
                </ul>
            </div>
        );
    } else {
        search();
        return (
            <div>
                <form className="box">
                    <Oval
                        height={20}
                        width={20}
                        color="#4fa94d"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                    />{" "}
                    <input
                        type="search"
                        placeholder="  Fetching to the API..."
                        autoComplete={city}
                    />
                </form>
                <div className="loader">
                    <Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                    />
                </div>
            </div>
        );
    }
}
