import React from 'react';

const ResultChart = ({ chartData }) => {
    const maxValue = Math.max(...chartData.map(item => item.value));
    
    const svgWidth = 200; // SVG の幅
    const svgHeight = 200; // SVG の高さ
    const barWidth = 50; // 棒グラフの幅
    const barSpacing = 30; // 棒グラフ間の間隔
  
    // グラフ全体の横幅を計算
    const totalWidth = (barWidth + barSpacing) * chartData.length;
  
    // SVG の位置をページの中心に調整
    const svgStyle = {
        position: 'absolute',
        left: `calc(50% - ${totalWidth / 2}px)`,
        top: `calc(80% - ${svgHeight / 2}px)`,
    };
      
    return (
        <svg width={totalWidth} height={svgHeight} style={svgStyle}>
            {chartData.map((item, index) => {
                const barHeight = (item.value / maxValue) * svgHeight;
                const x = index * (barWidth + barSpacing);
                const y = svgHeight - barHeight;
                const textY = y - 10; // テキストの位置を調整するための y 座標

                return (
                    <g key={index}>
                        <rect x={x} y={y} width={barWidth} height={barHeight} fill="#AF51FF" />
                        <text x={x + barWidth / 2} y={textY} textAnchor="middle" fill="black">{item.name} {item.value}票</text>
                    </g>
                );
            })}
        </svg>
    );
};

export default ResultChart;
