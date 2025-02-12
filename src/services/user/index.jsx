import axios from 'axios';

const BASE_URL = 'http://localhost:8080/user';


export const saveUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/save`, user);
        return response.data;

    } catch (err) {
         throw new Error(err.response?.data?.message || 'Error saving user');
    }
}


export const getUserByEmail = async (userEmail) => {
    try {
        const response = await axios.get(`${BASE_URL}/findByEmail/${userEmail}`);
        return response.data;

    } catch (err) {
         throw new Error(err.response?.data?.message || 'Error finding user');
    }
}

export const updateUserWithMovie = async (user) => {
    try {
        console.log(user)
        const response = await axios.put(`${BASE_URL}/update/${user.email}`, user);
        return response.data;

    } catch (err) {
         throw new Error(err.response?.data?.message || 'Error updating user');
    }
}