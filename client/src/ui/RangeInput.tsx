import React from 'react';
import "./css/RangeInput.css"

const RangeInput = (props: { label: string, minVal: number, maxVal: number, value: string, setValue: (n: string) => void }) => {

    return (
        <div className="range-input">
            <p style={{margin: 0}}>{props.value}р</p>
            <div style={{flexDirection: "row", margin: 0}}>
                <label htmlFor="range-input" className="label">{props.label}</label>
                <input
                    type="range"
                    onChange={e => {
                        props.setValue(e.target.value)
                    }}
                    min={props.minVal}
                    max={props.maxVal}
                    step={(props.maxVal - props.minVal) / 100}
                    value={props.value}
                    name="range-input"
                    className="input"
                />
            </div>
        </div>
    );
};

export default RangeInput;