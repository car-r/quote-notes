import React from "react";

export default function FormInput({type, name, defaultValue}: any) {
    return (
        <input type={type} name={name} defaultValue={defaultValue} 
            className="px-2 py-1 border border-stone-700 bg-stone-700 rounded" 
        />
    )
}