import React, { useEffect, useState } from "react";
import "./forcast.css";
import axios from "axios";
import ForcastDay from "./forcastday";
import { Oval } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

export default function Forcast(props) {
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(null);
    console.log(useLocation().search);
    let params = new URLSearchParams(useLocation().search);
    let lat = params.get("lat");
    let lon = params.get("lon");

    useEffect(() => {
        setLoaded(false);
    }, [props.coordinate]);

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);
    }

    function load() {
        let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
        console.log(props);
    }
    if (loaded) {
        return (
            <div className="weatherForcast">
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
