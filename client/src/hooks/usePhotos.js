import { useEffect, useState } from "react";
import { fetchPhotos } from "../actions";


function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

export const usePhotos = (initCategoriesIds = []) => {
    const [categoriesIds, setCategoriesIds] = useState(initCategoriesIds);
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetch = async () => {
        setLoading(true);
        try {
           const res = await fetchPhotos(categoriesIds);
            setPhotos(shuffleArray(res));
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    }, [categoriesIds]);

    return [
        photos,
        setCategoriesIds,
        loading,
        error
    ]
}