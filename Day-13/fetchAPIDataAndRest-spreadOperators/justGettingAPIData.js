
// fetch("http://dummy.restapiexample.com/api/v1/employees", {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json"
//     }})
// .then( (response)=>{
//     console.log(response.json());
//     return response.json();
// } )
// .then( ( data )=>{
//     // var joke = data.value;
//     // console.log("Joke ::::>", joke);
// } )
// .catch();

// -------------------------------------------------
// this code you have to run in browser !!!
var post;

// Call the API
fetch('https://jsonplaceholder.typicode.com/posts/5').then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {

	// Store the post data to a variable
	post = data;

	// Fetch another API
	return fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);

}).then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (userData) {
	console.log(post, userData);
}).catch(function (error) {
	console.warn(error);
});
