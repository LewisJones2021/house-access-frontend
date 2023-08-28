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
    mode: 'no-cors',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({ houseName, accessCode, houseNotes }), // Convert data to JSON format
   });
   console.log(response);

   if (response.ok) {
    console.log('House data saved successfully.');
    // Clear the form fields after successful save
    houseForm.reset();
    // Update the house list after saving data
    updateHouseList();
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
   if (response.ok) {
    houseList.innerHTML = '';
    const houseData = await response.json(); // Convert the response data to JSON

    // Show the house item if it matches the search query
    const listItem = document.createElement('div');
    listItem.className = 'house-item';
    listItem.innerHTML = `
              <strong>House Name:</strong> ${houseData.houseName}<br>
              <strong>Access Code:</strong> ${houseData.accessCode}<br>
              <strong>Notes:</strong> ${houseData.houseNotes}<br>`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    // Pass the house ID to editHouse function.
    editButton.addEventListener('click', () => editHouse(houseData._id));
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => deleteHouse(houseData._id));
    listItem.appendChild(deleteButton);

    const clearButton = document.createElement('button');
    clearButton.className = 'clear-button';
    clearButton.textContent = 'Clear Results';
    clearButton.addEventListener('click', () => {
     houseList.innerHTML = '';
     searchInput.value = '';
    });
    houseList.appendChild(clearButton);

    houseList.appendChild(listItem);
   } else {
    console.error('Error fetching house data.', response.status);
    houseList.innerHTML = '';
   }
  } catch (error) {
   console.error('Error fetching house data:', error);
   houseList.innerHTML = '';
  }
 }
 //  track if the edit form is already open.
 let isEditing = false;

 //  function to edit and update the house information.
 async function editHouse(houseId) {
  isEditing = true;
  if (!isEditing) {
   const newHouseName = prompt('Enter a new house name: ');
   const newAccessCode = prompt('Enter the new access code: ');
   const newHouseNotes = prompt('Enter a new note: ');

   if (newHouseName && newAccessCode && newHouseNotes !== null && newHouseNotes.trim() !== '') {
    try {
     const editResponse = await fetch(`/api/houses/${houseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/JSON' },

      body: JSON.stringify({ houseName: newHouseName, accessCode: newAccessCode, houseNotes: newHouseNotes }),
     });
     console.log('fetched');

     if (editResponse.ok) {
      console.log('House data updated successfully.');

      // update the houselist.
      updateHouseList(searchInput.value.trim());
     } else {
      console.log('There was an error updating the house data.');
     }
    } catch (error) {
     console.error('Error updating the house data', error);
    }
   }
  }
  isEditing = false;
 }
 //  function to delete a house from the data system.
 async function deleteHouse(houseId) {
  try {
   console.log('Deleting house:', houseId);
   const deleteResponse = await fetch(`/api/houses/${houseId}`, {
    method: 'DELETE',
   });

   if (deleteResponse.ok) {
    console.log('Successfully deleted.');
    updateHouseList(searchInput.value.trim());
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

 // add an event listener for the "Edit" button. and triggers editing of the corresponding house data.
 houseList.addEventListener('click', (event) => {
  if (event.target && event.target.nodeName === 'BUTTON' && event.target.textContent === 'Edit') {
   const houseId = event.target.dataset.houseId;
   editHouse(houseId);
  }
 });
});
