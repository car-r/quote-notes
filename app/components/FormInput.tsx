import React from "react";

export type FormInputType = {
    defaultValue: string
    name: string
    type: string
    placeholder?: string
}

export default function FormInput({type, name, defaultValue, placeholder}: FormInputType) {
    return (
        <input type={type} name={name} defaultValue={defaultValue} placeholder={placeholder}
            className="px-2 py-1 border border-stone-700 bg-stone-700 rounded" 
        />
    )
}