import React from 'react'
import './random-example-btn.css'
const RandomExampleBtn = (props) => {
    return (
        <div>
            <button className="random-example-btn" value="Run" onClick={props.onClick}>Открыть случайный пример</button>
        </div>
    )
}

export default RandomExampleBtn