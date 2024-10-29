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
        <InputGroup className="mb-4">
            <InputGroup.Text>
                <FaSearch />
            </InputGroup.Text>
            <Form.Control
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Buscar campañas"
                className="rounded-pill border-0 shadow-sm"
            />
        </InputGroup>
    );
};

export default SearchBar;
