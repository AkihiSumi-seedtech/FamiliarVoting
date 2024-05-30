import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const ResultChart = ({ chartData }) => {
    return (
        <div>
            <PieChart width={1000} height={500}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={200}
                    fill="#8884d8"
                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    
                </Pie>
                <Tooltip /> 
            </PieChart>
        </div>
    );
};

const COLORS = ['#EF1047','#FFBB38', '#0175FE', '#0C7F','#AF51FF'];

export default ResultChart;
