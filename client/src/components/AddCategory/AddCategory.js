import { useState } from 'react';

const AddCategory = ({ onAdd }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleAddClick = () => {
        onAdd(categoryName);
        setCategoryName('');
    };

    return (
        <div className="add-category">
            <input
                type="text"
                placeholder="Category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <button onClick={handleAddClick}>Add</button>
        </div>
    );
};

export default AddCategory;