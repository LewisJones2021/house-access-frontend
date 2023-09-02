/** @format */

// When the DOM is fully loaded, set up event listeners and fetch initial data
document.addEventListener('DOMContentLoaded', () => {
 // Get references to the form and list elements
 const houseForm = document.getElementById('houseForm');
 const houseList = document.getElementById('houseList');
 const searchInput = document.getElementById('searchInput');

 // Add an event listener to the form to handle form submission
 houseForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  // Get the input values from the form
  const houseName = document.getElementById('houseName').value;
  const accessCode = document.getElementById('accessCode').value;
  const houseNotes = document.getElementById('notes').value;

  try {
   // Save data to the server using a POST request
   const response = await fetch('http://localhost:8080/api/houses', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({ houseName, accessCode, houseNotes }), // Convert data to JSON format
   });
   console.log(response);

   if (response.ok) {
    console.log('House data saved successfully.');
    // Update the house list after saving data
    updateHouseList();
    houseForm.reset();
   } else {
    console.error('Error saving house data.');
   }
  } catch (error) {
   console.error('Error saving house data:', error);
  }
 });

 // Function to fetch and update the house list
 async function updateHouseList() {
  const searchQuery = searchInput.value.toLowerCase().trim();
  if (searchQuery === '') {
   houseList.innerHTML = '';
  }
  console.log('about to search the API with -> ', searchQuery);
  try {
   // Fetch data from the server using a GET request
   const response = await fetch(`http://localhost:8080/api/houses?houseName=${searchQuery}`, {
    method: 'GET',
   });
   console.log(response);
   if (response.status >= 200 && response.status < 300) {
    houseList.innerHTML = '';
    const houseData = await response.json(); // Convert the response data to JSON
    console.log(houseData);

    if (houseData == null || houseData.length == 0) {
     const noResults = document.createElement('h1');
     noResults.textContent = 'No Results';
     noResults.className = 'no-data-h1';
     houseList.appendChild(noResults);
     return;
    }

    // Show the house item if it matches the search query
    houseData.forEach((h) => {
     const listItem = document.createElement('div');
     console.log(listItem);
     listItem.className = 'house-item';
     listItem.innerHTML = `
              <strong>House Name:</strong> ${h.houseName}<br>
              <strong>Access Code:</strong> ${h.accessCode}<br>
              <strong>Notes:</strong> ${h.houseNotes}<br>`;
     console.log(h.houseNotes);
     houseList.appendChild(listItem);

     const editButton = document.createElement('button');
     editButton.textContent = 'Edit';
     editButton.className = 'edit-button';
     editButton.setAttribute('data-house-id', h.id);
     // Pass the house ID to editHouse function.
     editButton.addEventListener('click', () => editHouse(h.id));
     listItem.appendChild(editButton);

     const deleteButton = document.createElement('button');
     deleteButton.textContent = 'Delete';
     deleteButton.className = 'delete-button';
     deleteButton.setAttribute('data-house-id', h.id);
     console.log('House ID:', h);
     deleteButton.addEventListener('click', () => deleteHouse(h.id));
     listItem.appendChild(deleteButton);

     const clearButton = document.createElement('button');
     clearButton.className = 'clear-button';
     clearButton.textContent = 'Clear Results';
     clearButton.addEventListener('click', () => {
      houseList.innerHTML = '';
      searchInput.value = '';
     });
     houseList.appendChild(clearButton);
    });
   } else {
    console.error('Error fetching house data.', response.status);
    houseList.innerHTML = '';
   }
  } catch (error) {
   console.error('Error fetching house data:', error);
   houseList.innerHTML = '';
  }
 }

 //  function to edit and update the house information.
 async function editHouse(houseId) {
  const newHouseName = prompt('Enter a new house name: ');
  const newAccessCode = prompt('Enter the new access code: ');
  const newHouseNotes = prompt('Enter a new note: ');

  if (newHouseName && newAccessCode && newHouseNotes) {
   try {
    const updatedData = {
     houseName: newHouseName,
     accessCode: newAccessCode,
     houseNotes: newHouseNotes,
    };
console.log(updatedData)
    const editResponse = await fetch(`http://localhost:8080/api/houses/${houseId}`, {
     method: 'PUT',
     headers: { 'Content-Type': 'application/JSON' },
     body: JSON.stringify(updatedData),
    });
    console.log(updatedData);
    if (editResponse.ok) {
     console.log('House data updated successfully.');
     // update the houselist.
     updateHouseList(searchInput.value.trim());
    } else if (response.status === 404) {
     console.log('There was an error updating the house data.');
    } else {
     console.log('Error updating the house');
    }
   } catch (error) {
    console.error('Error updating the house data', error);
   }
  }

  // editHouse(h.id, updatedData);
 }

 //  function to delete a house from the data system.
 async function deleteHouse(houseId) {
  try {
   console.log('Deleting house:', houseId);
   const deleteResponse = await fetch(`http://localhost:8080/api/houses/${houseId}`, {
    method: 'DELETE',
   });

   if (deleteResponse.ok) {
    console.log('Successfully deleted.');
    updateHouseList(searchInput.value.trim());
    searchInput.value= '';
   } else if (deleteResponse.status === 404) {
    console.log('House not found');
   } else {
    console.log('Error deleting the house.');
   }
  } catch (error) {
   console.error('Error removing the house from the data system', error);
  }
 }

 // Add an event listener to the search input field to trigger search on input
 searchInput.addEventListener('input', () => {
  updateHouseList(); // Update the list whenever the user types in the search box
 });

 //  //  add an event listener for the "Edit" button. and triggers editing of the corresponding house data.
 //  houseList.addEventListener('click', (event) => {
 //   if (event.target && event.target.nodeName === 'BUTTON' && event.target.textContent === 'Edit') {
 //    const houseId = event.target.dataset.houseId;
 //    editHouse(houseId);
 //   }
 //  });
});
