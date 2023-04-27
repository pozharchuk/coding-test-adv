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

export const addCategory = async (category, token) => {
    try {
        const response = await fetch(`${API_URL}/categories/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ category }),
        });

        if (response.status === 409) {
            return { error: 'Category already exists' };
        }

        if (!response.ok) {
            return { error: 'Error creating category' };
        }

        return await response.json();
    } catch (error) {
        return { error: error.message };
    }
};

export const deleteCategory = async (categoryId, token) => {
    try {
        const response = await fetch(`${API_URL}/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return { error: 'Error deleting category' };
        }

        return await response.json();
    } catch (error) {
        return { error: 'Error deleting category' };
    }
};