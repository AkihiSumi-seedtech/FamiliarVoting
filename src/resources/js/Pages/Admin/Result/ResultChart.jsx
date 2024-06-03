import React from 'react';

const ResultChart = ({ chartData }) => {
    // 総計を計算
    const total = chartData.reduce((acc, item) => acc + item.value, 0);

    // SVG の幅と高さ
    const svgWidth = 400;
    const svgHeight = 400;

    // 円グラフの中心座標
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    // 円グラフの半径
    const radius = Math.min(centerX, centerY) - 10; // マージンを取るために10を引く

    // 開始角度
    let startAngle = -90; // 上から開始するために-90度を設定

    // SVG の位置をページの中心に調整
    const svgStyle = {
        position: 'absolute',
        left: `calc(60% - ${svgWidth / 2}px)`,
        top: `calc(50% - ${svgHeight / 2}px)`,
    };

    return (
        <svg width={svgWidth} height={svgHeight} style={svgStyle}>
            {chartData.map((item, index) => {
                // 扇形の角度を計算
                const angle = (item.value / total) * 360;

                // 扇形のパスを作成
                const path = `
                    M ${centerX},${centerY}
                    L ${centerX + radius * Math.cos((startAngle * Math.PI) / 180)}, ${centerY + radius * Math.sin((startAngle * Math.PI) / 180)}
                    A ${radius},${radius} 0 ${angle > 180 ? 1 : 0},1 ${centerX + radius * Math.cos(((startAngle + angle) * Math.PI) / 180)}, ${centerY + radius * Math.sin(((startAngle + angle) * Math.PI) / 180)}
                    Z
                `;

                // テキストの角度を計算
                const textAngle = startAngle + angle / 2;

                // テキストの位置を計算
                const textX = centerX + (radius / 2) * Math.cos((textAngle * Math.PI) / 180);
                const textY = centerY + (radius / 2) * Math.sin((textAngle * Math.PI) / 180);

                // 次の開始角度を設定
                startAngle += angle;

                return (
                    <g key={index}>
                        {/* 扇形 */}
                        <path d={path} fill={`hsl(${index * (360 / chartData.length)}, 70%, 70%)`} />

                        {/* テキスト */}
                        <text x={textX} y={textY} textAnchor="middle" alignmentBaseline="middle" fill="black">
                        {item.name}   
                        </text>
                        <text x={textX} y={textY + 15} textAnchor="middle" alignmentBaseline="middle" fill="black" fontWeight="bold" >
                         {item.value}  票
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

export default ResultChart;
