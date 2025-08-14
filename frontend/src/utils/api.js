const API_BASE_URL = 'http://127.0.0.1:8000/api';
/**
 * Generic fetch client to handle API requests.
 * @param {string} endpoint - The API endpoint to call (e.g. '/terminals/').
 * @param {object} [options] - Optional fetch options (method, body, etc.).
 * @returns {Promise<any>} - The JSON response from the API.
 * @throws {Error} - Throws an error if the response is not ok.
 */
async function apiClient(endpoint, options = {}) {
    const { body, ...customOptions } = options;

    const headers = {
        'Content-Type': 'application/json',
    };

    const config = {
        method: options.method || 'GET', // Default to GET
        headers: {
        ...headers,
        ...customOptions.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
        }

        // If the response is successful but has no content
        if (response.status === 204) {
        return null;
        }

        return response.json();
    } catch (error) {
        console.error(`API call failed: ${error.message}`);
        throw error;
    }
}

/* API Calls */
// Fetches the list of terminals from the API.
export const getTerminals = () => {
    return apiClient('/terminals/');
};

/**
 * Posts the captured train data to the API.
 * @param {object} options - The data to be sent.
 */
export const captureCarData = async (options) => {
    const result = await apiClient('/combined/', {
        method: 'POST',
        body: options,
    });

    return result;
};
