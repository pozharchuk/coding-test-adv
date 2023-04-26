const API_URL = 'http://localhost:3000/api'

export const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/categories/`);
    return await res.json();
}

export const fetchPhotos = async (categories = []) => {
    const res = await fetch(`${API_URL}/photos/?id=${categories.join(',')}`);
    return await res.json();
}