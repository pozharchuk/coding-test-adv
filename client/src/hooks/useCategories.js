import { useEffect, useState } from "react";
import { fetchCategories } from "../api/actions";

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const call = async () => {
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
        call();
    }, [])

    return [
        categories,
        call,
        loading,
        error,
    ]
}

export default useCategories;