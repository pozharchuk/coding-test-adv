const API_URL = 'http://localhost:3000/api'
const AUTH_URL = 'http://localhost:3000/auth'

export const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/categories/`);
    return await res.json();
}

export const fetchPhotos = async (categories = []) => {
    const res = await fetch(`${API_URL}/photos/?id=${categories.join(',')}`);
    return await res.json();
}

export const fetchToken = async () => {
    const res = await fetch(`${AUTH_URL}`);
    return await res.text();
}