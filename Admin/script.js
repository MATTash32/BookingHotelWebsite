const dropAreas = document.querySelectorAll(".drag-area, .drag-area1, .drag-area2, .drag-area3");
dropAreas.forEach((dropArea) => {
  
  const button = dropArea.querySelector("button");
  const input = dropArea.querySelector("input");
  let file; // This is a global variable and we'll use it inside multiple functions

  // Click event for the drop area
  dropArea.onclick = () => {
    input.click(); // If user clicks on the button then the input also clicked
  }

  // Change event for the input
  input.addEventListener("change", function() {
    // Getting user selected file and [0] means if user selects multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(dropArea); // Calling the function
  });

  // Function to show the file
  function showFile(dropArea) {
    let fileType = file.type; // Getting the selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; // Adding some valid image extensions in an array
    if (validExtensions.includes(fileType)) { // If the user selected file is an image file
      let fileReader = new FileReader(); // Creating a new FileReader object
      fileReader.onload = () => {
        let fileURL = fileReader.result; // Passing the user file source in the fileURL variable
        let imgTag = document.createElement('img'); // Creating an img tag
        imgTag.src = fileURL; // Setting the src attribute to the user selected file source
        imgTag.alt = "image"; // Setting the alt attribute
        // Check if there is already an image displayed, if yes, replace it with the new one
        if (dropArea.querySelector('img')) {
          dropArea.replaceChild(imgTag, dropArea.querySelector('img'));
        } else {
          dropArea.appendChild(imgTag); // Adding the created img tag inside the dropArea container
        }
        // Hide the button when an image is displayed
        button.style.display = 'none';
      }
      fileReader.readAsDataURL(file);
    } else {
      alert("This is not an Image File!");
      
    }
  }
});

// Reset function to reset the drop area state
function resetDropArea(dropArea) {
  dropArea.classList.remove("active");
  dropArea.querySelector("button").style.display = 'block';
  if (dropArea.querySelector('img')) {
    dropArea.removeChild(dropArea.querySelector('img'));
  }
}


// Initialize galleryImage array
let galleryImage = [];

// Load existing gallery data from localStorage
function loadGalleryData() {
    let storedGallery = localStorage.getItem('galleryData');
    if (storedGallery) {
        galleryImage = JSON.parse(storedGallery);
    }
}

// Load gallery data when the script starts
loadGalleryData();

function loadGallery() {
    let galleryContainer = document.getElementById('product-list');
    
    if (galleryContainer && galleryImage.length > 0) {
        
        // galleryContainer.innerHTML = '';
        
        for (let gallery of galleryImage) {
            let displayProduct = document.createElement('div');
            displayProduct.classList.add('product');
            let ImgContainer = document.createElement('div');
            ImgContainer.classList.add('product-img');
            let displayImg = document.createElement('img');
            displayImg.src = gallery['src'];
            ImgContainer.appendChild(displayImg);

            let descripContainer = document.createElement('div');
            descripContainer.classList.add('product-descrip');
            let roomDetail = document.createElement('div');
            roomDetail.classList.add('room-detail');
            let ul = document.createElement('ul');
            let h2 = document.createElement('h2');
            h2.innerHTML = `${gallery.roomType} Room`;
            descripContainer.appendChild(h2);

            // Adding room details
            let bedroomLi = document.createElement('li');
            let bathroomLi = document.createElement('li');
            let sqftLi = document.createElement('li');
            let facilitiesDiv = document.createElement('div');
            let facilitiesUl = document.createElement('ul');

            // Bedroom
            let bedroomSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            bedroomSvg.setAttribute('width', '20');
            bedroomSvg.setAttribute('height', '14');
            bedroomSvg.setAttribute('viewBox', '0 0 20 14');
            let bedroomPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            bedroomPath.setAttribute('d', 'M20 10.334V8.02565C20.0023 7.76025 19.9008 7.50447 19.717 7.31295C19.5333 7.12142 19.2819 7.00934 19.0167 7.00065H7.5V5.33398C7.5 5.11297 7.4122 4.90101 7.25592 4.74473C7.09964 4.58845 6.88768 4.50065 6.66667 4.50065H2.5C2.27899 4.50065 2.06702 4.58845 1.91074 4.74473C1.75446 4.90101 1.66667 5.11297 1.66667 5.33398V7.00065H0.833333V0.333984H0V13.6673H0.833333V12.0007H19.1667V13.6673H20V11.1673H0.833333V7.87565H19.0167C19.0564 7.87565 19.0946 7.89145 19.1227 7.91959C19.1509 7.94772 19.1667 7.98587 19.1667 8.02565V10.334H20ZM2.5 5.33398H6.66667V7.00065H2.5V5.33398Z');
            bedroomPath.setAttribute('fill', 'white');
            bedroomSvg.appendChild(bedroomPath);
            let bedroomH3 = document.createElement('h3');
            bedroomH3.innerHTML = ` <span>${gallery['bedType']}</span> Bedroom`;
            bedroomLi.appendChild(bedroomSvg);
            bedroomLi.appendChild(bedroomH3);
            ul.appendChild(bedroomLi);

            // Bathroom
            let bathroomSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            bathroomSvg.setAttribute('width', '20');
            bathroomSvg.setAttribute('height', '14');
            bathroomSvg.setAttribute('viewBox', '0 0 20 14');
            let bathroomPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            bathroomPath.setAttribute('d', 'M1.66667 4.50065V2.00065C1.66667 1.77964 1.75446 1.56768 1.91074 1.4114C2.06702 1.25512 2.27899 1.16732 2.5 1.16732C2.72101 1.16732 2.93298 1.25512 3.08926 1.4114C3.24554 1.56768 3.33333 1.77964 3.33333 2.00065V2.83398H4.16667V2.00065C4.16667 1.55862 3.99107 1.1347 3.67851 0.82214C3.36595 0.509579 2.94203 0.333984 2.5 0.333984C2.05797 0.333984 1.63405 0.509579 1.32149 0.82214C1.00893 1.1347 0.833333 1.55862 0.833333 2.00065V4.50065H0V5.33398H20V4.50065H1.66667ZM17.9417 8.95065C17.8588 9.5655 17.5554 10.1293 17.0878 10.5371C16.6202 10.9449 16.0204 11.1688 15.4 11.1673H4.56667C3.95445 11.1554 3.36651 10.9258 2.90834 10.5195C2.45017 10.1133 2.15176 9.55704 2.06667 8.95065L1.66667 6.16732H0.833333L1.2 9.05898C1.28631 9.65603 1.52916 10.2196 1.90387 10.6924C2.27857 11.1651 2.77177 11.5303 3.33333 11.7507V13.6673H4.16667V12.0007C4.30962 12.0271 4.45462 12.0411 4.6 12.0423H15.4333C15.5676 12.0398 15.7014 12.0259 15.8333 12.0007V13.6673H16.6667V11.7507C17.2255 11.5296 17.7153 11.1638 18.0859 10.6907C18.4564 10.2177 18.6943 9.65445 18.775 9.05898L19.1667 6.16732H18.3333L17.9417 8.95065Z');
            bathroomPath.setAttribute('fill', 'white');
            bathroomSvg.appendChild(bathroomPath);
            let bathroomH3 = document.createElement('h3');
            bathroomH3.innerHTML = `<span>${gallery['bedType']}</span> bathroom`;
            bathroomLi.appendChild(bathroomSvg);
            bathroomLi.appendChild(bathroomH3);
            ul.appendChild(bathroomLi);

            // Sq ft
            let sqftSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            sqftSvg.setAttribute('width', '20');
            sqftSvg.setAttribute('height', '20');
            sqftSvg.setAttribute('viewBox', '0 0 20 20');
            let sqftPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            sqftPath.setAttribute('d', 'M20.0083 9.16667H19.175V0.833333H10.8417V0H20.0083V9.16667ZM9.175 20H0.0083313V10.8333H0.841665V19.1667H9.175V20Z');
            sqftPath.setAttribute('fill', 'white'); 
            sqftSvg.appendChild(sqftPath);
            let sqftH3 = document.createElement('h3');
            sqftH3.innerHTML = `<span>${gallery['roomSize']}</span> Sq ft`;
            sqftLi.appendChild(sqftSvg);
            sqftLi.appendChild(sqftH3);
            ul.appendChild(sqftLi);

            // Facilities
            let facilitiesH2 = document.createElement('h2');
            facilitiesH2.textContent = 'Facilities Available:';
            facilitiesDiv.appendChild(facilitiesH2);

            // TV
            let tvLi = document.createElement('li');
            tvLi.textContent = 'TV';
            facilitiesUl.appendChild(tvLi);

            // WiFi
            let wifiLi = document.createElement('li');
            wifiLi.textContent = 'WiFi';
            facilitiesUl.appendChild(wifiLi);

            facilitiesDiv.appendChild(facilitiesUl);

            roomDetail.appendChild(ul);
            roomDetail.appendChild(facilitiesDiv);
            descripContainer.appendChild(roomDetail);

            // Price
            let priceH1 = document.createElement('h1');
            priceH1.classList.add('price');
            priceH1.innerHTML = `<span>$${gallery['roomPrice']}</span>/Day`;
            descripContainer.appendChild(priceH1);

            displayProduct.appendChild(ImgContainer);
            displayProduct.appendChild(descripContainer);
            galleryContainer.appendChild(displayProduct);
        }
        } else {
            console.log("No gallery container found or no images to display");
        }
    }
function formLoad() {
    let form = document.getElementById("array-form");
    if (form) {
        let submitBtn = document.getElementById('submit');
        submitBtn.addEventListener('click', function(event) {
            event.preventDefault();

            let fileImage = form.image.files[0];
            let reader = new FileReader();

            reader.onload = function(e) {
                // Create an object to hold the form data and image source
                let formObjectData = {
                    id: galleryImage.length + 1,
                    src: e.target.result,
                    roomNumber: form.roomNumber.value,
                    roomFloor: form.roomFloor.value,
                    roomType: form.roomType.value,
                    roomPrice: form.roomPrice.value,
                    bedType: form.bedType.value,
                    roomSize: form.roomSize.value,
                    roomDescription: form.roomDescription.value,
                    
                };
                
                // Push the new gallery item into the array
                galleryImage.push(formObjectData);

                
                // Attempt to save the updated gallery array to localStorage
                try {
                    localStorage.setItem('galleryData', JSON.stringify(galleryImage, null, 2));
                } catch (e) {
                    // Log an error message if the local storage quota is exceeded
                    console.log("Local storage quota exceeded. Unable to save data.");
                }

                console.log(galleryImage);

                // Reload the gallery to display the new item
                loadGallery();

                form.reset();
            };

            dropAreas.forEach(dropArea => {
              resetDropArea(dropArea);
            });

            // Read the image as a DataURL
            reader.readAsDataURL(fileImage);
        });
    }
}

// Load the gallery and set up the form when the script runs
loadGallery();
formLoad();



let backArrow = document.getElementById('backArrowsvg');

backArrow.addEventListener('click', function(event){
  window.location.href = '../Admin/adminFacility.html';
}
);


