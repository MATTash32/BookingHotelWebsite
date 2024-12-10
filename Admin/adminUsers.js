let users = JSON.parse(localStorage.getItem('adminUsers')) || [];
let editingUserId = null;
let activePopup = null;

// Load users when the page loads
document.addEventListener('DOMContentLoaded', loadUsers);

function loadUsers() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            
            <td>
                <div class="menu-container">
                    <button class="menu-btn" onclick="togglePopupMenu(event, ${index})">
                        <i class='bx bx-dots-vertical-rounded'></i>
                    </button>
                    <div class="popup-menu" id="popupMenu${index}">
                        <div class="menu-item" onclick="editUserFromMenu(this)">
                            <i class='bx bx-edit-alt'></i>Edit
                        </div>
                        <div class="menu-item" onclick="deleteUserFromMenu(this)">
                            <i class='bx bx-trash'></i>Delete
                        </div>
                    </div>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function togglePopupMenu(event, index) {
    event.stopPropagation(); // Prevent event from bubbling up

    // Close any open popup
    if (activePopup && activePopup !== event.target) {
        activePopup.style.display = 'none';
        activePopup = null;
    }

    // Toggle the current popup
    const popup = document.getElementById(`popupMenu${index}`);
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
        activePopup = null;
    } else {
        popup.style.display = 'block';
        activePopup = popup;
    }

    // Close popup when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target !== popup && event.target !== document.querySelector('.menu-btn')) {
            popup.style.display = 'none';
            activePopup = null;
        }
    });
}

function editUserFromMenu(menuItem) {
    const index = menuItem.closest('.popup-menu').getAttribute('id').replace('popupMenu', '');
    editUser(index);
    if (activePopup) {
        activePopup.style.display = 'none';
        activePopup = null;
    }
}

function deleteUserFromMenu(menuItem) {
    const index = menuItem.closest('.popup-menu').getAttribute('id').replace('popupMenu', '');
    deleteUser(index);
    if (activePopup) {
        activePopup.style.display = 'none';
        activePopup = null;
    }
}

function openAddUserModal() {
    editingUserId = null;
    document.getElementById('modalTitle').textContent = 'Add New User';
    document.getElementById('userForm').reset();
    document.getElementById('userModal').style.display = 'block';
}

// Close button functionality
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('userModal').style.display = 'none';
});

function editUser(index) {
    editingUserId = index;
    const user = users[index];
    
    document.getElementById('modalTitle').textContent = 'Edit User';
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    // Assuming there's an input field for password in the modal
    document.getElementById('password').value = user.password; // This line is added to include password in the modal
    
    document.getElementById('userModal').style.display = 'block';
}

function deleteUser(index) {
    if (confirm('Are you sure you want to delete this user?')) {
        users.splice(index, 1);
        localStorage.setItem('adminUsers', JSON.stringify(users));
        loadUsers();
    }
}

// Form submission handler
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value, // This line is added to include password in the form data
    };

    if (editingUserId !== null) {
        // Editing existing user
        users[editingUserId] = userData;
    } else {
        // Adding new user
        users.push(userData);
    }

    localStorage.setItem('adminUsers', JSON.stringify(users));
    document.getElementById('userModal').style.display = 'none';
    loadUsers();
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('userModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
