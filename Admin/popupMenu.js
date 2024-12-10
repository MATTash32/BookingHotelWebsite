// Keep track of the currently open menu
let currentOpenMenu = null;

function toggleMenu(event, menuId) {
    event.stopPropagation(); // Prevent event from bubbling up
    const menu = document.getElementById(menuId);
    
    // If there's a menu already open and it's not the current one, close it
    if (currentOpenMenu && currentOpenMenu !== menu) {
        currentOpenMenu.style.display = 'none';
    }

    // Toggle the current menu
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        currentOpenMenu = null;
    } else {
        menu.style.display = 'block';
        menu.classList.add('show');
        currentOpenMenu = menu;
    }
}

// Function to edit facility
function editFacility(index) {
    const facility = galleryImage[index];
    const modal = document.getElementById('editModal');
    const closeBtn = modal.querySelector('.close');
    const form = document.getElementById('editForm');

    // Fill the form with facility data
    document.getElementById('editRoomNumber').value = facility.roomNumber;
    document.getElementById('editRoomType').value = facility.roomType;
    document.getElementById('editRoomFloor').value = facility.roomFloor;

    // Show the modal
    modal.style.display = 'block';

    // Handle form submission
    form.onsubmit = function(e) {
        e.preventDefault();
        
        // Update facility data
        galleryImage[index] = {
            roomNumber: document.getElementById('editRoomNumber').value,
            roomType: document.getElementById('editRoomType').value,
            roomFloor: document.getElementById('editRoomFloor').value
        };

        // Save to localStorage
        localStorage.setItem('galleryData', JSON.stringify(galleryImage));

        // Close modal
        modal.style.display = 'none';

        // Refresh the display
        loadGallery();
    };

    // Close modal when clicking the close button
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Function to delete facility
function deleteFacility(index) {
    if (confirm('Are you sure you want to delete this facility?')) {
        galleryImage.splice(index, 1);
        localStorage.setItem('galleryData', JSON.stringify(galleryImage));
        loadGallery(); // Reload the display
    }
}

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (currentOpenMenu && !event.target.closest('.menu-container')) {
        currentOpenMenu.style.display = 'none';
        currentOpenMenu = null;
    }
});

// Prevent menu from closing when clicking inside it
document.addEventListener('click', (event) => {
    if (event.target.closest('.popup-menu')) {
        event.stopPropagation();
    }
});
