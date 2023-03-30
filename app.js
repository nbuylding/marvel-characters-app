'use strict';

const submit = document.querySelector('#submit');
const input = document.querySelector('input');
const characterContainer = document.querySelector('#display-character');
const clearField = document.getElementById('clear');

const API_KEY = '864b66d60f1dfd10360c730f62f98f74';

const fetchData = function () {
	const characterInput = input.value;
	const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?name=${characterInput}&apikey=${API_KEY}`;

	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			const html = `
			<h2>${data.data.results[0].name}</h2>
			<img width=300px src='${data.data.results[0].thumbnail.path}.jpg' alt='${data.data.results[0].name}' />
			<p>${data.data.results[0].description}</p>`;

			characterContainer.insertAdjacentHTML('beforeend', html);
		})
		.catch((error) => {
			characterContainer.innerHTML = `<p>Input field cannot be blank OR character not found!</p>`;
		});
};

submit.addEventListener('click', function () {
	fetchData();

	clearField.value = '';
	characterContainer.innerHTML = '';
});
