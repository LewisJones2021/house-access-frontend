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
   const response = await fetch('/api/houses', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({ houseName, accessCode, houseNotes }), // Convert data to JSON format
   });

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
  console.log('fetched');

  try {
   // Fetch data from the server using a GET request
   const response = await fetch('/api/houses');
   if (response.ok) {
    const houses = await response.json(); // Convert the response data to JSON

    // Clear the existing list before adding new data
    houseList.innerHTML = '';

    // Get the search query from the search input field
    const searchQuery = searchInput.value.toLowerCase().trim();

    // Create and append list items for each house in the response data
    houses.forEach((houseData) => {
     const houseName = houseData.houseName.toLowerCase(); // Convert the house name to lowercase

     // Convert both the search query and the house name to lowercase for case-insensitive matching
     const searchLower = searchQuery.toLowerCase();
     const houseNameLower = houseName.toLowerCase();

     // Check if the house name matches the search query with the exact number of queries.
     const queryCount = searchQuery.trim().split('').length;
     const houseNameCount = searchQuery.split('').length;

     if (houseNameCount === queryCount && houseNameLower.startsWith(searchLower)) {
      // Show the house item if it matches the search query
      const listItem = document.createElement('div');
      listItem.className = 'house-item';
      listItem.innerHTML = `
              <strong>House Name:</strong> ${houseData.houseName}<br>
              <strong>Access Code:</strong> ${houseData.accessCode}<br>
              <strong>Notes:</strong> ${houseData.houseNotes}<br>`;

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      // Pass the house ID to editHouse function.
      editButton.addEventListener('click', () => editHouse(houseData._id));
      listItem.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteHouse(houseData._id));
      listItem.appendChild(deleteButton);

      houseList.appendChild(listItem);
     }
     if (!searchQuery) {
      houseList.style.display = 'none';
     } else {
      houseList.style.display = 'block';
     }
    });
   } else {
    console.error('Error fetching house data.');
   }
  } catch (error) {
   console.error('Error fetching house data:', error);
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
