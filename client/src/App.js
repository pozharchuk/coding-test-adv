import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Loader from "./components/Loader/Loader";
import useCategories from "./hooks/useCategories";
import Filters from "./components/Filters/Filters";
import usePhotos from "./hooks/usePhotos";
import Carousel from "./components/Сarousel/Carousel";
import useToken from "./hooks/useToken";
import AddCategory from "./components/AddCategory/AddCategory";
import {addCategory, deleteCategory} from "./api/actions";
import RemoveCategory from "./components/RemoveCategory/RemoveCategory";

function App() {
    const [loading, setLoading] = useState(false);

    const [ categories, fetchCategories, loadingCategories,  errorCategories ] = useCategories();
    const [ photos, fetchPhotos, loadingPhotos, errorPhotos ] = usePhotos(categories)
    const [ token, errorToken ] = useToken();

    useEffect(() => {
        setLoading(loadingCategories || loadingPhotos);
    }, [loadingCategories, loadingPhotos])

    const handleFilterSelect = useCallback((filters) => fetchPhotos(filters), [fetchPhotos]);

    const handleAddCategory = useCallback((categoryName) => {
        addCategory(categoryName, token).then(() => {
            fetchCategories();
        })
    }, [token, fetchCategories])

    const handleDeleteCategory = useCallback((categoryId) => {
        deleteCategory(categoryId, token).then(() => {
            fetchCategories();
        })
    }, [fetchCategories, token])


    return (
        <div className="App">
            {loading && <Loader /> }
            <Filters onFilterSelect={handleFilterSelect} filters={categories} />
            <Carousel photos={photos} />
            <div>
                <h1>Base Administrative UI</h1>
                <AddCategory onAdd={handleAddCategory} />
                <RemoveCategory onRemove={handleDeleteCategory} categories={categories} />
            </div>
        </div>
    );
}

export default App;