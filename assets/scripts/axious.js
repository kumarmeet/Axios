// parse json to javascript object
// xhr.responseType = "json";
// const listOfPosts = JSON.parse(xhr.response);

const listElement = document.querySelector(".posts");
const template = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchBtn = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

//GET REQUEST
//using async await
async function fetchPosts() {
	listElement.textContent = ""; //clear the previous fetched data when click the fetchBtn
	const responseData = await axios.get(
		"https://jsonplaceholder.typicode.com/posts"
	);

	for (const post of responseData.data) {
		const postEl = document.importNode(template.content, true);
		postEl.querySelector("h2").textContent = post.title.toUpperCase();
		postEl.querySelector("p").textContent = post.body;
		postEl.querySelector("li").id = post.id; //map for delete request
		listElement.append(postEl);
	}
}

//POST REQUEST
async function createPost(title, content) {
	const userID = Math.random();

	const postData = {
		title: title,
		body: content,
		userID: userID,
	};

	const fd = new FormData(form);
	fd.append("id", userID);

	const userData = await axios.post(
		"https://jsonplaceholder.typicode.com/posts",
		postData
	);
}

fetchBtn.addEventListener("click", fetchPosts);

//FOR POST REQUEST
form.addEventListener("click", (event) => {
	event.preventDefault();
	const enteredTitle = event.currentTarget.querySelector("#title").value;
	const enteredcontent = event.currentTarget.querySelector("#content").value;
	createPost(enteredTitle, enteredcontent);
});

//DELETE REQUEST
postList.addEventListener("click", (event) => {
	if (event.target.tagName === "BUTTON") {
		const postId = event.target.closest("li").id;
		axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
		event.target.closest("li").remove();
	}
});
