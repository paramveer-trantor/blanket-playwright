// api.js
require('dotenv').config();
const axios = require('axios');
async function callAPI(endpoint, data) {
  try {
    const apiUrl = process.env.API_URL || 'https://us-central1-blanket-development.cloudfunctions.net';
    const url = apiUrl + endpoint;
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status !== 200) {
      throw new Error(`Expected status code 200 but received ${response.status}`);
    }
    return await response;
  } catch (error) {
    console.error('An error occurred while calling the API:', error);
    throw new Error('Failed to call the API');
  }
}

module.exports = { callAPI };
