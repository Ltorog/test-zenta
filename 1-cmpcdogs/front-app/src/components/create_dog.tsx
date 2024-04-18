
import React, { useState, ReactNode } from "react";

import { Button, Row, Modal } from 'react-bootstrap'; 

import axios from "axios";

import { ITypeModal } from '../interfaces/modal_type';



export default function Modal(props: ITypeModal) {

    const {dogName, setDogName} = useState<any>('');
	const {subBreed, setSubBreed} = useState<any>('');

    const breeds = getAllBreeds();


    return (
        <>
            {props.isOpen && (<Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Dog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { 
                        e.preventDefault();
                        setDogName('');
                        setSubBreed(0);
                        props.newDog()
                    }}>

                    </form>
                    <Row>
                        <div className="form-outline" data-mdb-input-init>
                            <input placeholder= "Insert dog name" type="searchDog" id="nameDog" className="form-control" />
                        </div>
                    </Row>
                    <Row>
                        <div className="form-outline" data-mdb-input-init>
                            <input placeholder= "Insert url link dog" type="searchDog" id="dogImgSrc" className="form-control" />
                        </div>
                    </Row>
                    <Row>
                        <div className="form-outline" data-mdb-input-init>
                            <Select options={breeds} />
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Create Dog
                </Button>
                </Modal.Footer>
            </Modal>)}
        </>
    )
}


async function getAllSubBreeds(id_breed: number): any {
	const url = `http://localhost:3000/api/sub_breeds?id_breed=${id_breed}`;
	const response = axios.get<Dog[]>(url);
	return response;
}


async function getAllBreeds(): any {
	const url = "http://localhost:3000/api/breeds";
	const response = axios.get<Dog[]>(url);
	return response;
}