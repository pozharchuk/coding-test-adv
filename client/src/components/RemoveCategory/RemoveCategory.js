import { useState } from 'react';

const RemoveCategory = ({ categories, onRemove }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleRemoveClick = () => {
        onRemove(selectedCategory);
        setSelectedCategory('');
    };

    return (
        <div className="remove-category">
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.category}
                    </option>
                ))}
            </select>
            <button onClick={handleRemoveClick}>Remove</button>
        </div>
    );
};

export default RemoveCategory;