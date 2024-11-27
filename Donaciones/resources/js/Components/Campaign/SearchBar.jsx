import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Importa el ícono de búsqueda

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSearch();
        }
    };

    return (
        <InputGroup className="mb-2" >
            <InputGroup className="mb-3">
                <InputGroup.Text className="bg-light border-black border-1 rounded-start-pill">
                    <FaSearch className="text-black text-lg" /> 
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Nombre de la campaña"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Buscar campañas"
                    className="rounded-end-pill border-1 shadow-md border-black text-lg p-3" 
                />
            </InputGroup>
        </InputGroup>
    );
};

export default SearchBar;
