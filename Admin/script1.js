let galleryImage = [];

function loadGalleryData() {
    let storedGallery = localStorage.getItem('galleryData');
    if (storedGallery) {
        galleryImage = JSON.parse(storedGallery);
    }
}

loadGalleryData();

function loadGallery() {
    let galleryContainer = document.getElementById('addItem');
    
    if (galleryContainer && galleryImage.length > 0) {
        galleryContainer.innerHTML = ''; // Clear existing content
        
        for (let i = 0; i < galleryImage.length; i++) {
            let gallery = galleryImage[i];
            let galleryRow = document.createElement('tr');
            galleryRow.innerHTML = `
                <td>#${gallery.roomNumber}</td>
                <td>${gallery.roomType} bed</td>
                <td>${gallery.roomFloor}</td>
                <td>none</td>
                <td class="menu-container">
                    <img src="img/Vector (1).png" onclick="toggleMenu(event, 'popupMenu${i}')" style="cursor: pointer;">
                    <div class="popup-menu" id="popupMenu${i}">
                        <div class="menu-item" onclick="editFacility(${i})">
                            <i class='bx bx-edit-alt'></i>Edit
                        </div>
                        <div class="menu-item" onclick="deleteFacility(${i})">
                            <i class='bx bx-trash'></i>Delete
                        </div>
                    </div>
                </td>
            `;
            galleryContainer.appendChild(galleryRow);
        }
    } else {
        console.log("No gallery container found or no images to display");
    }
}

loadGallery();

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function(event){
    window.location.href = '../Admin/admin.html';
});
