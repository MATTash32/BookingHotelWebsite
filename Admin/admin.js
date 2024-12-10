document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in edit mode
    const editMode = localStorage.getItem('editMode') === 'true';
    const form = document.querySelector('form');
    
    if (editMode) {
        // Load the facility data into the form
        const facility = JSON.parse(localStorage.getItem('editingFacility'));
        if (facility) {
            document.getElementById('roomNumber').value = facility.roomNumber;
            document.getElementById('roomType').value = facility.roomType;
            document.getElementById('roomFloor').value = facility.roomFloor;
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const roomData = {
            roomNumber: document.getElementById('roomNumber').value,
            roomType: document.getElementById('roomType').value,
            roomFloor: document.getElementById('roomFloor').value
        };

        // Load existing gallery data
        let galleryImage = [];
        const storedGallery = localStorage.getItem('galleryData');
        if (storedGallery) {
            galleryImage = JSON.parse(storedGallery);
        }

        if (editMode) {
            // Update existing facility
            const index = parseInt(localStorage.getItem('editingFacilityIndex'));
            galleryImage[index] = roomData;
        } else {
            // Add new facility
            galleryImage.push(roomData);
        }

        // Save updated gallery data
        localStorage.setItem('galleryData', JSON.stringify(galleryImage));
        
        // Clear edit mode
        localStorage.removeItem('editMode');
        localStorage.removeItem('editingFacility');
        localStorage.removeItem('editingFacilityIndex');

        // Redirect back to facility page
        window.location.href = 'adminFacility.html';
    });
});
