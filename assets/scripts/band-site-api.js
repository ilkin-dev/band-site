//import axios from 'axios';

export class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com';
    }

    async register() {
        try {
            const response = await axios.get(`${this.baseUrl}/register`);
            return response.data.api_key;
        } catch (error) {
            console.error('Error registering with the API:', error);
            throw error;
        }
    }

    async getComments() {
        try {
            const response = await axios.get(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
            return response.data;
        } catch (error) {
            console.error('Error getting comments:', error);
            throw error;
        }
    }

    async getShows() {
        try {
            const response = await axios.get(`${this.baseUrl}/showdates?api_key=${this.apiKey}`);
            return response.data;
        } catch (error) {
            console.error('Error getting shows:', error);
            throw error;
        }
    }

    async postComment(comment, name) {
        try {
            const response = await axios.post(`${this.baseUrl}/comments?api_key=${this.apiKey}`, { comment, name }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error posting comment:', error);
            throw error;
        }
    }
}