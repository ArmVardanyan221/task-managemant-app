// Handle delete button click
document.querySelectorAll('.btn.delete').forEach(button => {
    button.addEventListener('click', async function (event) {
        const userId = event.target.getAttribute('data-id');
        const confirmed = confirm('Are you sure you want to delete this user?');

        if (confirmed) {
            try {
                const response = await fetch(`/users/${userId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('User deleted successfully');
                    window.location.reload(); // Reload the page to reflect the changes
                } else {
                    alert('Error deleting user');
                }
            } catch (error) {
                console.error(error);
                alert('Error deleting user');
            }
        }
    });
});

// Handle form submission for adding a new user
document.getElementById('addUserForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById('error');

    // Reset the error message
    errorDiv.textContent = '';

    try {
        const response = await fetch('/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, role, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert('User added successfully');
            window.location.reload(); // Reload the page to reflect the changes
        } else {
            errorDiv.textContent = result.message || 'Error adding user';
        }
    } catch (error) {
        console.error(error);
        errorDiv.textContent = 'There was an error adding the user';
    }
});
