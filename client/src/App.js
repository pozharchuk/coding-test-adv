import {useState, useEffect, useCallback} from 'react';
import './App.css';
import { Loader } from "./components/Loader/Loader";
import { useCategories } from "./hooks/useCategories";
import { Filters } from "./components/Filters/Filters";
import { usePhotos } from "./hooks/usePhotos";
import { Carousel } from "./components/Сarousel/Сarousel";

function App() {
    const [loading, setLoading] = useState(false);

    const [ categories, loadingCategories,  errorCategories ] = useCategories();
    const [ photos, fetchPhotos, loadingPhotos, errorPhotos ] = usePhotos(categories)

    useEffect(() => {
        setLoading(loadingCategories || loadingPhotos);
    }, [loadingCategories, loadingPhotos])

    const handleFilterSelect = useCallback((filters) => fetchPhotos(filters), [fetchPhotos]);


    return (
        <div className="App">
            {loading && <Loader /> }
            <Filters onFilterSelect={handleFilterSelect} filters={categories} />
            <Carousel photos={photos} />
        </div>
    );
}

export default App;