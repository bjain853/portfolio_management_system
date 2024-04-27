import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8080/api',
	withCredentials: true,
});

export function get(url: string) {
	return api.get(url);
}

export function post(
	url: string,
	body: Object,
	withCredentials: boolean = true,
) {
	return api.post(url, body, {
		withCredentials,
	});
}

export function put(url: string, body: Object) {
	return api.put(url, body);
}
