const form = document.getElementById('createTaskForm');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  errorMessage.textContent = '';

  const formData = new FormData(e.target);

  // Convert FormData to JSON
  const taskData = {};
  formData.forEach((value, key) => {
    taskData[key] = value;
  });


  try {
    const response = await fetch('/createtask', {
      method: 'POST',
      body: JSON.stringify(taskData),
      headers: { 'Content-Type': 'application/json' },
    });

    const responseData = await response.json();

    if (response.ok) {
      window.location.href = '/dashboard';
    } else {
      const error = await response.json();
      errorMessage.textContent = error.message || 'Failed to create task.';
    }
  } catch (err) {
    console.error('Error submitting task:', err);
    errorMessage.textContent = 'An unexpected error occurred.';
  }
});
