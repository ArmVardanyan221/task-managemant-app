//Delete Task
document.querySelectorAll('.close').forEach(link => {
link.addEventListener('click', async function (event) {
  event.preventDefault(); 

  const taskId = this.getAttribute('data-id');

  // Confirm the delete action
  const confirmed = confirm('Are you sure you want to delete this task?');
  if (!confirmed) {
    return; 
  }

  try {
    const response = await fetch(`/tasks/${taskId}`, {
      method: 'DELETE', // HTTP DELETE method
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Task deleted successfully!');
      window.location.href = '/dashboard'; 
    } else {
      alert('Failed to delete task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('There was an error deleting the task');
  }
});
});


const userRole = document.body.getAttribute('data-user-role');
let isAdmin = (userRole === "Admin");

let stop;
const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');



function enableCardDragging(card) {
  card.addEventListener('dragstart', () => {
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });
}


cards.forEach(enableCardDragging);

dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', event => {
    event.preventDefault();
    const draggingCard = document.querySelector('.dragging');
    const sourceColumn = draggingCard.parentElement.parentElement.getAttribute('data-column');
    const targetColumn = dropzone.parentElement.getAttribute('data-column');
    if (isAdmin || (sourceColumn === 'to do' && targetColumn === 'in progress') || (sourceColumn === 'in progress' && targetColumn === 'done')) {
      dropzone.appendChild(draggingCard);
    }
    else if (!isAdmin && (sourceColumn === 'in progress' && targetColumn === 'to do') || (sourceColumn === 'done' && targetColumn === 'in progress') || (sourceColumn === 'done' && targetColumn === 'to do')) {
      stop = false;
      console.log('Users cannot move tasks backward.');
}
});

// Handle the drop event
dropzone.addEventListener('drop', async (event) => {
event.preventDefault();

const draggingCard = document.querySelector('.dragging');
const taskId = draggingCard.getAttribute('data-task-id'); // Assuming task ID is set as data attribute
const targetColumn = dropzone.parentElement.getAttribute('data-column');

// If task is dropped in a new column, update status in the database
if (!draggingCard) return;

const updatedTask = {
  taskId,
  status: targetColumn,
  user: userRole
};

try {
  const response = await fetch('/updateTaskStatus', {
    method: 'POST',
    body: JSON.stringify(updatedTask),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  if (response.ok) {
    console.log('Task status updated successfully:', result);
  } else {
    console.error('Failed to update task status:', result.error);
  }
} catch (error) {
  console.error('Error updating task status:', error);
}

});
});
