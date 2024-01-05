
  const table = document.getElementById('data-table');
  const tableHeader = table.getElementsByTagName('thead')[0];
  const tableBody = table.getElementsByTagName('tbody')[0];

  // Extract main keys for the table header
  const mainKeys = Object.keys(jsonData[0]);

  // Create table header with main keys
  const headerRow = tableHeader.insertRow();
  // Add a column for S.no
  const snoCell = document.createElement('th');
  snoCell.textContent = 'S.no';
  headerRow.appendChild(snoCell);

  mainKeys.forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    headerRow.appendChild(th);
  });

  // Iterate through the JSON data and create table rows
  jsonData.forEach((item, index) => {
    const row = tableBody.insertRow();
    // Add S.no to each row
    const snoCell = row.insertCell();
    snoCell.textContent = index + 1;

    mainKeys.forEach(key => {
      const cell = row.insertCell();
      const value = item[key];

      // Check if the value is an object and format it as a nested table
      if (key === "values" && Array.isArray(value)) {
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => {
          const popupContainer = document.getElementById('popup-container');
          popupContainer.innerHTML = '';

          // Iterate through the elements of the "values" array
          value.forEach((element, index) => {
            const innerTable = document.createElement('table');
            Object.entries(element).forEach(([innerKey, innerValue]) => {
              const innerRow = innerTable.insertRow();
              innerRow.insertCell().textContent = innerKey;

              // Check if the inner value is an object and format it as a nested table
              if (typeof innerValue === 'object' && innerValue !== null) {
                const subInnerTable = document.createElement('table');
                Object.entries(innerValue).forEach(([subInnerKey, subInnerValue]) => {
                  const subInnerRow = subInnerTable.insertRow();
                  subInnerRow.insertCell().textContent = subInnerKey;
                  subInnerRow.insertCell().textContent = JSON.stringify(subInnerValue, null, 2);
                });
                innerRow.insertCell().appendChild(subInnerTable);
              } else {
                innerRow.insertCell().textContent = JSON.stringify(innerValue, null, 2);
              }
            });

            // Display the elements of the array in the popup
            popupContainer.appendChild(innerTable);
          });

          // Add an OK button to close the popup
          const okButton = document.createElement('button');
          okButton.textContent = 'OK';
          okButton.addEventListener('click', () => {
            popupContainer.style.display = 'none';
          });

          popupContainer.appendChild(okButton);

          // Display the popup
          popupContainer.style.display = 'block';
        });

        cell.appendChild(plusButton);
      } else {
        cell.textContent = JSON.stringify(value, null, 2);
      }
    });
  });

  // Search function to filter data based on the entered date
  function searchByDate() {
    const searchDateInput = document.getElementById('search-date');
    const searchDate = searchDateInput.value;

    // Filter the JSON data based on the entered date
    const filteredData = jsonData.filter(item => item.date === searchDate);

    // Clear the table body
    tableBody.innerHTML = '';

    // Display the filtered rows in the table
    filteredData.forEach((item, index) => {
      const row = tableBody.insertRow();
      const snoCell = row.insertCell();
      snoCell.textContent = index + 1;

      mainKeys.forEach(key => {
        const cell = row.insertCell();
        const value = item[key];

        // Check if the value is an object and format it as a nested table
        if (key === "values" && Array.isArray(value)) {
          const plusButton = document.createElement('button');
          plusButton.textContent = '+';
          plusButton.addEventListener('click', () => {
            const popupContainer = document.getElementById('popup-container');
            popupContainer.innerHTML = '';

            // Iterate through the elements of the "values" array
            value.forEach((element, index) => {
              const innerTable = document.createElement('table');
              Object.entries(element).forEach(([innerKey, innerValue]) => {
                const innerRow = innerTable.insertRow();
                innerRow.insertCell().textContent = innerKey;

                // Check if the inner value is an object and format it as a nested table
                if (typeof innerValue === 'object' && innerValue !== null) {
                  const subInnerTable = document.createElement('table');
                  Object.entries(innerValue).forEach(([subInnerKey, subInnerValue]) => {
                    const subInnerRow = subInnerTable.insertRow();
                    subInnerRow.insertCell().textContent = subInnerKey;
                    subInnerRow.insertCell().textContent = JSON.stringify(subInnerValue, null, 2);
                  });
                  innerRow.insertCell().appendChild(subInnerTable);
                } else {
                  innerRow.insertCell().textContent = JSON.stringify(innerValue, null, 2);
                }
              });

              // Display the elements of the array in the popup
              popupContainer.appendChild(innerTable);
            });

            // Add an OK button to close the popup
            const okButton = document.createElement('button');
            okButton.textContent = 'OK';
            okButton.addEventListener('click', () => {
              popupContainer.style.display = 'none';
            });

            popupContainer.appendChild(okButton);

            // Display the popup
            popupContainer.style.display = 'block';
          });

          cell.appendChild(plusButton);
        } else {
          cell.textContent = JSON.stringify(value, null, 2);
        }
      });
    });
  }