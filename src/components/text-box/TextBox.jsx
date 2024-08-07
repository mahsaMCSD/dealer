import React from 'react';


const TextBox = (props) => {
    return (
        <input className={props.className}
               maxLength={props.maxLength}
            style={props.style} placeholder={props.placeholder ? props.placeholder : null}
            type={props.type} value={props.value} onChange={(val) => props.onChange(val)} />
    )

}

export default TextBox
