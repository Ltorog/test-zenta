import { Col } from "react-bootstrap";
import { Select } from "./select";


export const SelectBreed = () => {
    const BREEDS = [{id: 1, description: "Pastor"}, {id: 2, description: "Pitbull"}];

    return (
    <Col s={2}>
        <Select placeholder="Select a Breed" options={BREEDS} />
    </Col>
    );
};

export const SelectSubBreed = () => {
    const SUBBREEDS = [{id: 1, description: "Alemán", id_breed: 1}, {id: 2, description: "Francés", id_breed: 2}];
    
    return (
    <Col s={2}>
        <Select placeholder="Select a Sub breed" options={SUBBREEDS} />
    </Col>
  );
};


export const SearchDog = () => {
	return (
        <>
            <Col xs={4}>
                <div className="form-outline" data-mdb-input-init>
                    <input placeholder= "Search for dog" type="searchDog" id="form1" className="form-control" />
                </div>
            </Col>
            <Col xs={2}></Col>
        </>
    );
}
