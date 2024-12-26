
// // Get the modal
// var modal = document.getElementById("editTaskModal");

// // Get the button that opens the modal
// var btn = document.getElementById("openModalBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// ----------------------------------------------------------------------------------------


// document.getElementById("editTaskForm").addEventListener("submit", function(event) {
// event.preventDefault(); 

// const formData = new FormData(event.target);
// console.log(formData);

// const taskId = "<%= task._id %>";  // Task ID from the server
// const url = `/tasks/${taskId}`;
// console.log(url);


// // Send the PUT request using Fetch API
// fetch(url, {
//   method: "PUT",  // Use PUT for updating the task
//   body: formData,
// })
// .then(response => {
//   if (response.ok) {
//     // If the update is successful, redirect to the dashboard
//     window.location.href = "/dashboard";
//   } else {
//     alert("Failed to update task.");
//   }
// })
// .catch(error => {
//   console.error("Error updating task:", error);
// });
// });
