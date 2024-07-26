import react from 'react';

const Send = ({color}) => {
    return (
        <svg id="e9ncgxsrQIi1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shapeRendering="geometricPrecision" textRendering="geometricPrecision" width="300" height="300">
            <path 
                d="M199.07388,149.99999L97.64029,137.95633L65.97048,85.09059l203.42985,64.90939L65.9705,214.90939l31.6698-52.86573l101.43358-12.04367Z" 
                transform="matrix(1.238054 0 0 1.238054-57.603586-35.708088)" 
                fill={color ? color : "#088be2"}
                strokeWidth="0"/>
        </svg>
    )
};

export default Send;