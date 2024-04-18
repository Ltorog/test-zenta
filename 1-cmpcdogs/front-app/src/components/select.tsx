import React, { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { className } from 'react-bootstrap';
import { Breed } from "../interfaces/breed";
import { SubBreed } from "../interfaces/sub_breed";


interface SelectProps {
    options: Breed | SubBreed;
}

export const Select: React.FC<SelectProps> = ({options}): any=> {
    return (
        <select className="form-select" aria-label="Default select example">
            {
                options.map((objectOption: { id: number, description: string }) => {
                    return (
                        <option value={objectOption.id}>{objectOption.description}</option>
                    )
                })
            }
            
        </select>
    )
};