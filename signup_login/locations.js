// Philippines location data with postal codes
const philippinesData = {
    "Philippines": {
        "Metro Manila": {
            "Manila": "1000",
            "Quezon City": "1100",
            "Makati": "1200",
            "Taguig": "1630",
            "Pasig": "1600",
            "Parañaque": "1700",
            "Pasay": "1300",
            "Caloocan": "1400"
        },
        "Cebu": {
            "Cebu City": "6000",
            "Mandaue": "6014",
            "Lapu-Lapu": "6015",
            "Talisay": "6045",
            "Carcar": "6019"
        },
        "Cavite": {
            "Bacoor": "4102",
            "Imus": "4103",
            "Dasmariñas": "4114",
            "General Trias": "4107",
            "Trece Martires": "4109"
        },
        "Laguna": {
            "Santa Rosa": "4026",
            "Calamba": "4027",
            "San Pedro": "4023",
            "Biñan": "4024",
            "Los Baños": "4030"
        },
        "Rizal": {
            "Antipolo": "1870",
            "Cainta": "1900",
            "Taytay": "1920",
            "Angono": "1930",
            "Binangonan": "1940"
        },
        "Batangas": {
            "Batangas City": "4200",
            "Lipa": "4217",
            "Tanauan": "4232",
            "Santo Tomas": "4234"
        },
        "Pampanga": {
            "San Fernando": "2000",
            "Angeles": "2009",
            "Mabalacat": "2010",
            "Mexico": "2021"
        },
        "Bulacan": {
            "Malolos": "3000",
            "Meycauayan": "3020",
            "San Jose del Monte": "3023",
            "Marilao": "3019"
        }
    }
};

// Get DOM elements
const countrySelect = document.getElementById('country');
const provinceSelect = document.getElementById('province');
const citySelect = document.getElementById('city');
const postalInput = document.getElementById('postal');

// Event listener for country selection
countrySelect.addEventListener('change', function() {
    const selectedCountry = this.value;
    provinceSelect.innerHTML = '<option value="">Select Province</option>';
    citySelect.innerHTML = '<option value="">Select City</option>';
    postalInput.value = '';
    
    if (selectedCountry === 'Philippines') {
        provinceSelect.disabled = false;
        // Add provinces
        Object.keys(philippinesData[selectedCountry]).forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = province;
            provinceSelect.appendChild(option);
        });
    } else {
        provinceSelect.disabled = true;
        citySelect.disabled = true;
    }
});

// Event listener for province selection
provinceSelect.addEventListener('change', function() {
    const selectedCountry = countrySelect.value;
    const selectedProvince = this.value;
    citySelect.innerHTML = '<option value="">Select City</option>';
    postalInput.value = '';
    
    if (selectedProvince) {
        citySelect.disabled = false;
        // Add cities
        Object.keys(philippinesData[selectedCountry][selectedProvince]).forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } else {
        citySelect.disabled = true;
    }
});

// Event listener for city selection
citySelect.addEventListener('change', function() {
    const selectedCountry = countrySelect.value;
    const selectedProvince = provinceSelect.value;
    const selectedCity = this.value;
    
    if (selectedCity) {
        // Get and set postal code
        const postalCode = philippinesData[selectedCountry][selectedProvince][selectedCity];
        postalInput.value = postalCode;
        postalInput.readOnly = true; // Make postal code read-only since it's auto-filled
    } else {
        postalInput.value = '';
        postalInput.readOnly = false;
    }
});
