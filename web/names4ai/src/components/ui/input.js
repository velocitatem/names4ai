// react component for input
import React from 'react';

const Input = (props) => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            class="border border-gray-400 p-2 w-full my-4"
        />
    );
};

export {
    Input
};
