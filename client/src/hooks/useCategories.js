import { useEffect, useState } from "react";
import { fetchCategories } from "../actions";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetch = async () => {
        setLoading(true);
        try {
           const res = await fetchCategories(categories);
           setCategories(res);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    }, [])

    return [
        categories,
        loading,
        error,
    ]
}