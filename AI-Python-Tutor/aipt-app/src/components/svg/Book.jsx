import react from 'react';

const Book = ({color}) => {
    return (
        <svg id="euIXNwBWZls1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" width="300" height="300"><g transform="matrix(1.246351 0 0 1.246351-38.25902-53.934553)">
            <rect 
                width="211.922503" 
                height="40.23845" 
                rx="0" 
                ry="0" 
                transform="matrix(.542357 0 0 4.259988 106.391135 68.76331)" 
                fill={color ? color : "#088be2"}
                stroke={color ? color : "#088be2"}/>
            <rect 
                width="211.922503" 
                height="40.23845" 
                rx="0" 
                y="0" 
                transform="matrix(.09914 0 0 4.259988 80.767533 68.76331)" 
                fill={color ? color : "#088be2"}
                stroke={color ? color : "#088be2"}/>
            <path 
                d="M114.84443,241.59848h12.33744v12.87511l-6.16872-4.48184-6.16872,4.48184v-12.87511Z" 
                transform="matrix(.769701 0 0 1.318248 2.876659-76.972037)" 
                fill={color ? color : "#088be2"}
                stroke={color ? color : "#088be2"}/></g>
        </svg>
    )
};

export default Book;