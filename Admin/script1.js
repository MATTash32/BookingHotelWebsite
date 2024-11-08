

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
        
        
        
        for (let gallery of galleryImage) {
        let galleryRow = document.createElement('tr');
        galleryRow.innerHTML = `
            <td>#${gallery.roomNumber}</td>
            <td>${gallery.roomType} bed</td>
            <td>${gallery.roomFloor}</td>
            <td>none</td>
            <td><img src="img/Vector (1).png" ></td>
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
    }
    );


