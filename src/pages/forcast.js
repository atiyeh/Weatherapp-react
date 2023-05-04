import React, { useEffect, useState } from "react";
import "./forcast.css";
import axios from "axios";
import ForcastDay from "./forcastday";
import { Oval } from "react-loader-spinner";
import Footer from "../component/footer";
import { useLocation } from "react-router-dom";

export default function Forcast(props) {
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(null);
    let params = new URLSearchParams(useLocation().search);
    let lat = params.get("lat");
    let lon = params.get("lon");
    let city = params.get("q");

    let hour = new Date().getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minutes = new Date().getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    useEffect(() => {
        setLoaded(false);
    }, [props.coordinate]);

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);
        console.log();
    }

    function load() {
        let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
    }
    if (loaded) {
        return (
            <div className="weatherForcast">
                <div className="header">
                    {" "}
                    <div>6-Day of weather Forcast</div>
                    <div>
                        Last Updated At {hour}:{minutes} - {city}
                    </div>
                </div>

                {forecast.map(function (dailyforcast, index) {
                    if (index < 6) {
                        return (
                            <div className="col" key={index}>
                                <ForcastDay data={dailyforcast} />
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
                <Footer />
            </div>
        );
    } else {
        load();
        return (
            <div className="loader">
                <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                />
                <div className="textloader">Fetching to API</div>
            </div>
        );
    }
}
