import {useEffect, useState} from "react";
import { fetchToken } from "../actions";

const useToken = () => {
    const [token, setToken] = useState(null);
    const [error, setError] = useState('');

    const call = async () => {
        try {
            const res = await fetchToken();
            setToken(res);
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        call();
    }, [])

    return [token, error];
}

export default useToken;