import React, { useEffect, useState } from "react";
import "./forcast.css";
import axios from "axios";
import ForcastDay from "./forcastday";
import { Oval } from "react-loader-spinner";

export default function Forcast(props) {
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(null);

    useEffect(() => {
        setLoaded(false);
    }, [props.coordinate]);

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);
    }

    function load() {
        let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
        let longitude = 12;
        let latitude = 23;
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
        console.log(props);
    }
    if (loaded) {
        return (
            <div className="weatherForcast">
                {forecast.map(function (dailyforcast, index) {
                    if (index < 5) {
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
