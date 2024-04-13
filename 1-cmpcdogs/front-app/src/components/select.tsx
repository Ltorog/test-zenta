import React, { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { className } from 'react-bootstrap';


interface SelectProps {
    options: Object;

}

export const Select: React.FC<SelectProps> = ({options}) => {
    console.log("OPTIONS IN SELECT", options);
    return (
        <select className="form-select" aria-label="Default select example">
            {
                options.map((objectOption: { id: string | number | readonly string[] | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
                    {console.log("objectOption", objectOption.id)}
                    <option value={objectOption.id}>{objectOption.description}</option>
                })
            }
            
        </select>
    )

};