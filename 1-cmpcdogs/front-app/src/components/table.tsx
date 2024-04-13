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


export const TableData = () => {
	const columns: Array<object> = getColumns();
	const [dogs, setDogs ] = useState<[] | Dog[]>([]);
	const [pagination, setPagination] = useState<[] | any>([]);
	const [breeds, setBreeds] = useState<[] | Breed[]>([]);

	useEffect(() => {
		(async () => {
			const allDataDogsAndPagination = await getAllDogsWithPagination();
			setDogs(allDataDogsAndPagination.data);
			setPagination(allDataDogsAndPagination.pagination)
		
			const allBreeds = await getAllBreeds()
			setBreeds(allBreeds.data)
		})();
	  }, []);

	console.log(dogs);
	console.log(pagination);
	console.log("breeds", {breeds})

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	

	const pageNums = getPaginationItems(pagination.page, pagination.total_pages, 5);
	return (
		<>
			<div className="container d-flex justify-content-left my-5">
				<Button onClick={handleShow} type="button" className="btn btn-primary">Create Dog</Button>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
				<	Modal.Title>Create Dog</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<div className="form-outline" data-mdb-input-init>
							<input placeholder= "Insert dog name" type="searchDog" id="createDogForm" className="form-control" />
						</div>
					</Row>
					<Row></Row>
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
					Save Changes
				</Button>
				</Modal.Footer>
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
						{dogs.map((dog: { id: any; description: any; url_src: any; sub_breed: { breed: { description: any; }; description: any; }; }) => {
							return (
								<tr>
									<td>{dog.id}</td>
									<td>{dog.description}</td>
									<td>{dog.url_src}</td>
									<td>{dog.sub_breed.breed.description}</td>
									<td>{dog.sub_breed.description}</td>
									<td>
										<Button type="button" className="btn btn-danger" onClick={() => {
											if (window.confirm('Are you sure you wish to delete this item?')) {
												deleteDog(dog.id)
											}
										}}><FaTrash /> Eliminar</Button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
				
			</div>
			<div className="container d-flex justify-content-center my-5">
				{pageNums.map((pageNum, idx) => (
					<PageLink
						className={idx} 
						currentPage={pagination.page} 
						lastPage={pagination.total_pages} 
						setCurrentPage={pageNum} 
						active={pagination.page == pageNum} 
						children={pageNum}
					/>
				))}
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


function deleteDog(id: number): any {
	const url = `http://localhost:3000/api/dogs/${id}`;
	const response = axios.delete<Dog[]>(url);
	return response;
}


async function getAllBreeds(): Promise<any> {
	const url = "http://localhost:3000/api/breeds";
	const response = await axios.get<Dog[]>(url);
	return response;
}


async function getAllSubBreeds(id_breed: number): Promise<any> {
	const url = `http://localhost:3000/api/sub_breeds?id_breed=${id_breed}`;
	const response = await axios.get<Dog[]>(url);
	return response;
}

