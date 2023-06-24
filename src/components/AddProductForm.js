import React from 'react';

const AddProductForm = ({
    name,
    date,
    handleNameChange,
    handleDateChange,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="label">
                Nome:
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="text-input"
                    required
                />
            </label>
            <label htmlFor="date" className="label">
                Data (dd/mm/aaaa):
                <input
                    type="text"
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                    className="text-input"
                    required
                />
            </label>
            <button type="submit" className="button">
                Adicionar Produto
            </button>
        </form>
    );
};

export default AddProductForm;
