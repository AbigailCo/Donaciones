import React from 'react';
import { Form } from 'react-bootstrap';

const CategoryFilter = ({ categories, selectedCategories, setSelectedCategories }) => {
    const handleCheckboxChange = (categoryId) => {
        const updatedCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter((id) => id !== categoryId)
            : [...selectedCategories, categoryId];

        console.log("Categorías seleccionadas después del cambio:", updatedCategories); // Para depurar

        setSelectedCategories(updatedCategories);
    };

    return (
        <Form.Group className="mb-4">
            <h5>Filtrar por Categoría</h5>
            {categories.map((category) => (
                <Form.Check
                    key={category.id}
                    type="checkbox"
                    label={category.name}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCheckboxChange(category.id)}
                    className="my-2" // Espaciado entre checkboxes
                    style={{ cursor: 'pointer' }} // Cambia el cursor al pasar sobre el checkbox
                />
            ))}
        </Form.Group>
    );
};

export default CategoryFilter;
