import { useState } from "react";

import './Filters.css'

export const Filters = ({ filters = [], onFilterSelect}) => {
    const [selected, setSelected] = useState([]);
    const changeFilter = (newFilter) => {
        let newSelected;
        if (selected.includes(newFilter)) {
            newSelected = selected.filter( id => id !== newFilter);
        } else {
            newSelected = [...selected, newFilter];
        }
        setSelected(newSelected);
        onFilterSelect(newSelected);
    };
    return (
        <div className="filters-container">
            {filters.map(({ category, id }) => <button className={`filter${selected.includes(id) ? ' filter_selected' : ''}`}
                                                       key={id} onClick={() => changeFilter(id)}>{category}</button>)}
        </div>
    )
}