import axios from 'axios';

export default {
	signIn(data) {
		return axios.post('/api/auth/sign-in', data)
	},

	signUp(data) {
		return axios.post('/api/auth/sign-up', data)
	},

	forgotPassword(data) {
		return axios.post('/api/auth/password/email', data)
	},

	resetPassword(data) {
		return axios.post('/api/auth/password/reset', data)
	},

}