import React from "react";

import { add } from "date-fns";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";



export default function Chart({weekData, chartPress}) {
    
    const data = [];
    if(chartPress) {
        for (let i = 0; i < 7; i++) {
            data.push({
                date: add(new Date(), { days: i }).toString().substr(0, 3),
                high: Math.round(weekData.daily[i].temp.max - 273.15),
                low: Math.round(weekData.daily[i].temp.min - 273.15),
                
            });
        }
    }

    return (
           chartPress && ( <div  className='col-11 col-sm-8 col-lg-6 mx-auto pr-6 mb-4'>
            <ResponsiveContainer  width="100%" aspect={1.4}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 40,
                            right: 30,
                            left: -15,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis stroke="#f7f7f7" dataKey='date' />
                        <YAxis stroke="#f7f7f7"/>
                        <Tooltip />
                        <Legend />
                        <Line type='monotone' dataKey='high' stroke='#82ca9d' />
                        <Line type='monotone' dataKey='low' stroke='#8884d8' />
                    </LineChart>
                </ResponsiveContainer>
                
                </div>
                )
    );
}
// 