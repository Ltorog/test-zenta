import { useEffect, useState } from "react";
import { Table, Modal, Button, Row } from 'react-bootstrap'; 
import { FaTrash } from "react-icons/fa";


import "bootstrap/dist/js/bootstrap.bundle.min.js";


import axios from "axios";
import { Dog } from "../interfaces/dog";
import { Breed } from "../interfaces/breed";
import { SubBreed } from "../interfaces/sub_breed";
import { PageLink } from './page_link';
import { getPaginationItems } from "../lib/pagination";
import { Select } from './select';
import { IPagination } from '../interfaces/pagination';


export const TableData = () => {
	const columns: Array<object> = getColumns();
	const [dogs, setDogs ] = useState<[] | Dog[]>([]);
	const [pagination, setPagination] = useState<{page: 1, total_pages: 1} | IPagination>({page: 1, total_pages: 1});
	const [breeds, setBreeds] = useState<[] | Breed[]>([]);
	const [subBreeds, setSubBreeds] = useState<[] | SubBreed[]>([]);
	const [subBreedsToSelect, setSubBreedsToSelect] = useState<[] | SubBreed[]>([]);

	const [dogName, setDogName] = useState<'' | string>('');
	
	let selectedBreed = 0;

	const [formData, setFormData] = useState({
		description: '',
		url_src: '',
		id_sub_breed: 0,
	});

	useEffect(() => {
		(async () => {
			await getAllDogs();
		
			const allBreeds = await getAllBreeds()
			setBreeds(allBreeds.data)
			
			const allSubBreeds = await getAllSubBreeds(allBreeds.data[0].id);
			console.log("allSubBreeds", allSubBreeds.data);
			setSubBreeds(allSubBreeds.data);
		})();
	  }, []);

	const getAllDogs = async () => {
		const allDataDogsAndPagination = await getAllDogsWithPagination();
		setDogs(allDataDogsAndPagination.data);
		setPagination(allDataDogsAndPagination.pagination);
	}

	const alertDeleteDog = async (dog: Dog) => {
		if (window.confirm('Are you sure you wish to delete this item?')) {
			await deleteDog(dog.id);
		}
	}


	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const pageNums = getPaginationItems(pagination.page, pagination.total_pages, 5);
	return (
		<>
			<div className="container d-flex justify-content-left my-5">
				<Button onClick={handleShow} type="button" className="btn btn-primary">+ Create Dog</Button>
			</div>
			<Modal show={show} onHide={handleClose}>
				<form>
					<Modal.Header closeButton>
						<Modal.Title>Create Dog</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form onSubmit={(e) => { 
							e.preventDefault();
							setDogName('')
						}}>

						</form>
						<Row>
							<div className="form-outline" data-mdb-input-init>
								<span>Inserte nombre de perro</span><input placeholder= "Insert dog name" type="searchDog" id="nameDog" className="form-control" />
							</div>
						</Row>
						<Row>
							<div className="form-outline" data-mdb-input-init>
								<span>Inserte url de imagen de perro</span><input placeholder= "Insert url link dog" type="searchDog" id="dogImgSrc" className="form-control" />
							</div>
						</Row>
						<Row>
							<div className="form-outline" data-mdb-input-init>
								<span>Seleccione raza</span><Select options={breeds} />
							</div>
						</Row>
						<Row>
							<div className="form-outline" data-mdb-input-init>
								<span>Seleccione sub raza</span><Select onChange={selectedBreed} options={subBreeds} />
							</div>
						</Row>
					</Modal.Body>
					<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={async () => {
											await createDog();
											await getAllDogs();
										}}>
						Create Dog
					</Button>
					</Modal.Footer>
				</form>
			</Modal>
			<div className="container d-flex justify-content-center my-5">
				<Table striped bordered hover>
					<thead>
						<tr>
							{columns.map(column => {
								return (
									<th>{column.name}</th>
								)
							})}
						</tr>
					</thead>
					<tbody>
						{dogs.map((dog: Dog) => {
							return (
								<tr>
									<td>{dog.id}</td>
									<td>{dog.description}</td>
									<td>{dog.url_src}</td>
									<td>{dog.sub_breed.breed.description}</td>
									<td>{dog.sub_breed.description}</td>
									<td>
										<Button type="button" className="btn btn-danger" onClick={async () => {
											await alertDeleteDog(dog);
											await getAllDogs();
										}}><FaTrash /> Eliminar</Button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>		
			</div>
		</>
    );
}


const getColumns = () => {
	return [
		{
			name: 'ID',
			selector: (row: { id: any; }) => row.id,
			sortable: true,
		},
		{
			name: 'Description',
			selector: (row: { fullName: any; }) => row.fullName,
			sortable: true,
		},
		{
			name: 'image',
			selector: (row: { url_src: any; }) => row.url_src,
			sortable: true,
		},
		{
			name: 'Breed',
			selector: (row: { sub_breed: any; }) => row.sub_breed.breed.description,
			sortable: true,
		},
		{
			name: 'Sub Breed',
			selector: (row: { sub_breed: any; }) => row.sub_breed.description,
			sortable: true,
		},
		{
			name: '',
			selector: (row: { sub_breed: any; }) => row.sub_breed.description,
			sortable: true,
		}
	];
}

async function getAllDogsWithPagination(): Promise<any> {
	const url = "http://localhost:3000/api/dogs?page=1&limit=10";
	const response = await axios.get<Dog[]>(url);
	return response.data;
}

async function createDog(): Promise<any> {
	const url = "http://localhost:3000/api/dogs";
	const response = axios.post<Dog>(url);
	return response;
}


function deleteDog(id: number): any {
	const url = `http://localhost:3000/api/dogs/${id}`;
	const response = axios.delete<Dog[]>(url);
	return response;
}


async function getAllBreeds(): Promise<any> {
	const url = "http://localhost:3000/api/breeds";
	const response = await axios.get<Breed[]>(url);
	return response;
}


async function getAllSubBreeds(id_breed: number): Promise<any> {
	const url = `http://localhost:3000/api/sub-breeds?id_breed=${id_breed}`;
	const response = await axios.get<SubBreed[]>(url);
	return response;
}

