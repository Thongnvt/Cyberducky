// cartService.js
import axios from 'axios';

const API_URL = 'https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/orders/customer';

export const fetchCartItems = async (customerId) => {
    try {
        const response = await axios.get(`${API_URL}/${customerId}`);
        if (response.status === 200) {
            return response.data; // Adjust based on your API response structure
        }
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw error; // Rethrow error for further handling
    }
};
