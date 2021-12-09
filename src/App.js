import { useState, useEffect } from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Chart from "./Components/Chart";
import Overview from "./Components/Overview";

function App() {
    const [weekData, setWeekData] = useState([]);
    const [chartPress, setChartPress] = useState(false);

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: "https://graphql-weather-api.herokuapp.com/",
    });

    useEffect(() => {
        const fetchWeekData = async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=47.5&lon=7.5&&appid=fafb0d04dede10f19c8c9a06ad2427e0`
            );
            const myData = await response.json();
            setWeekData(myData);
        };

        fetchWeekData();
    }, []);

    return (
        weekData && (
            <ApolloProvider client={client}>
                <Overview />
                {/* button could be a component, no time to set up the Context API */}
                <div className='text-center' style={{ width: "100%" }}>
                    <button
                        className='btn text-light mt-2 mb-2'
                        onClick={() => {
                            setChartPress((chartPress) => !chartPress);
                        }}
                    >
                        {chartPress ? "Close" : "Open"} Weekly Information
                    </button>
                </div>
                <Chart weekData={weekData} chartPress={chartPress} />
            </ApolloProvider>
        )
    );
}

export default App;
