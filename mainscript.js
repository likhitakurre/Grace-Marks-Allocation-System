document.addEventListener('DOMContentLoaded', function() {

    fetch('http://127.0.0.1:5000/get-dropdown-data')
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById('dropdownYear');
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.YEAR;
                option.textContent = item.YEAR;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching dropdown data:', error));

    fetch('http://127.0.0.1:5000/get-branch-data')
        .then(response => response.json())
        .then(data => {
            const dropdownBranch = document.getElementById('dropdownBranch');
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.BRANCH;
                option.textContent = item.BRANCH;
                dropdownBranch.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching branch data:', error));

  
    document.getElementById('submitBtn').addEventListener('click', function() {
        const selectedYear = document.getElementById('dropdownYear').value;
        const selectedBranch = document.getElementById('dropdownBranch').value;
        const regNo = document.getElementById('regNoInput').value;

        if (selectedYear || selectedBranch || regNo) {
            const url = `http://127.0.0.1:5000/get-student-data?year=${selectedYear}&branch=${selectedBranch}&reg_no=${regNo}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log('Student Data:', data);
                    const resultContainer = document.getElementById('resultContainer');
                    resultContainer.innerHTML = ''; 

                    if (data.length > 0) {
                        let table = document.createElement('table');
                        let headerRow = document.createElement('tr');

                        const columnHeaders = {
                            name: "Name",
                            reg_no: "Registration Number",
                            branch: "Branch",
                            year: "Year",
                            category: "Category",
                            mentor_id: "Mentor ID",
                            mentor_name: "Mentor Name",
                            status: "Status",
                            proof: "Proof",
                            marks: "Marks"
                        };

                      
                        for (const key in columnHeaders) {
                            let th = document.createElement('th');
                            th.textContent = columnHeaders[key];
                            headerRow.appendChild(th);
                        }
                        table.appendChild(headerRow);

                        data.forEach(row => {
                            let tr = document.createElement('tr');
                            for (const key in columnHeaders) {
                                let td = document.createElement('td');
                                td.textContent = row[key] || 'N/A'; 
                                tr.appendChild(td);
                            }
                            table.appendChild(tr);
                        });
                        resultContainer.appendChild(table);

                    } else {
                        resultContainer.textContent = 'No data found for the selected year or branch.';
                    }
                })
                .catch(error => console.error('Error fetching student data:', error));
        } else {
            alert('Please select a year or a branch');
        }
    });
});


fetch('https://python app.py/get-data')
.then(response=>response.json())
.then(data=>{
    renderTable(data);

})
.catch(error=>{
    console.error('Error fetching data:', error);
});

function renderTable(data){
    const tableBody = document.querySelector('#data-table tbody');

    tableBody.innerHTML = '';

    data.forEach(item=>{
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = item.mentor_id;
        const nameCell = document.createElement('td');
        nameCell.textContent = item.mentor_name;
    })

    row.appendChild(idCell);
    row.appendChild(nameCell);

    tableBody.appendChild(row);
}

function moveTable(){
    const table = document.getElementById("data-table");
    table.classList.add("pushed-down");
}

document.getElementById('logout-button').addEventListener('click', () => {
    // Redirect to a logout route or clear session storage
    fetch('/logout', {
        method: 'POST', // Assuming your backend handles POST for logout
        credentials: 'include' // Include credentials if needed
    })
    .then(response => {
        if (response.ok) {
            // Redirect to the login page after logout
            window.location.href = '/login';
        }
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
});
