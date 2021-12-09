import React, { useState } from "react";
import "../App.css";

import { useQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphql/Queries";

function Overview() {
    const [toggle, setToggle] = useState(true);

    const { loading, error, data } = useQuery(GET_WEATHER_QUERY, {
        variables: { name: "Basel" },
    });

    if (loading) {
        return <h3 className='text-light'>Loading...</h3>;
    }

    if (error) {
        return <h3>"There was an error"</h3>;
    }

    function toggleFunc() {
        setToggle((toggle) => !toggle);
    }

    return (
        data && (
            <div className='bigCard d-flex flex-column align-items-center mt-4'>
                <div
                    onClick={toggleFunc}
                    style={{ display: `${toggle ? "block" : "none"}` }}
                    className='card-body-1 col-xs-11 text-center p-3 text-light col-11 col-sm-8 col-lg-6 border-0 '
                >
                    <h5 className='mt-1 card-title'>
                        {data.getCityByName.name}
                    </h5>
                    <h1 className='card-subtitle mb-2'>
                        {Math.round(
                            data.getCityByName.weather.temperature.actual -
                                273.15
                        )}
                        °C
                    </h1>
                    <h6 className='card-title'>
                        {data.getCityByName.weather.summary.description}
                    </h6>
                    <div className='d-flex flex-row justify-content-center'>
                        <h6 className='font-italic m-2'>
                            H:{" "}
                            {Math.round(
                                data.getCityByName.weather.temperature.max -
                                    273.15
                            )}
                            °C
                        </h6>
                        <h6 className='m-2'>
                            L:{" "}
                            {Math.round(
                                data.getCityByName.weather.temperature.min -
                                    273.15
                            )}
                            °C
                        </h6>
                    </div>
                    <p>-click for more info-</p>
                </div>
                <div
                    className='col-11 col-sm-8 col-lg-6 border-0'
                    onClick={toggleFunc}
                    style={{ display: `${toggle ? "none" : "block"}` }}
                >
                    <div
                        className='card-body-2 col-xs-11 text-center p-3 text-light'
                        style={{ height: "178.72px" }}
                    >
                        <h3 className='m-3 card-title'>
                            Wind Speed:{" "}
                            {Math.round(
                                data.getCityByName.weather.wind.speed * 1.6
                            )}
                            km/h
                        </h3>
                        <h3 className='card-title'>
                            Humidity:{" "}
                            {data.getCityByName.weather.clouds.humidity} %
                        </h3>

                        <p>-click for less info-</p>
                    </div>
                </div>
            </div>
        )
    );
}

export default Overview;
