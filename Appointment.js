// Form submit event
    var form = document.getElementById('appointmentForm');
    form.addEventListener('submit', addItem);

// Delete event
    var itemList = document.getElementsByClassName('btn-danger');

// Edit event
    var editList = document.getElementsByClassName('btn-success');

// Maintaining a count to be used as key for entries in the database
    var count = 0;

// Maintaining a serial variable to be used as a unique key in the table and database
    var serial = 0;


// Add item
function addItem(e)
{
    e.preventDefault();

    // Storing the input values from the user in variables
        var fullName = document.getElementById('fullName').value;
        var emailID = document.getElementById('emailID').value;
        var contact = document.getElementById('contact').value;
        var bookedDate = document.getElementById("bookedDate").value;
        var bookedTime = document.getElementById("bookedTime").value;

    // Creating an Object and storing the data
        var myObj = {
            Name: fullName,
            Email: emailID,
            Contact: contact,
            Date: bookedDate,
            Time: bookedTime
        };

    // Converting the data to JSON
        var myObj_serialized = JSON.stringify(myObj);

    // POST Request
        axios.post ("https://crudcrud.com/api/7fa20286195844a58fb6765526eec6a5/appointmentData", myObj)
            .then (response => logInput (response.data))
            .catch (error => console.log (error));
    
    // Resetting the form
        form.reset();
}

function logInput(response)
{        
    // Extracting Data from the Object
        var fullName = response.Name;
        var emailID = response.Email;
        var contact = response.Contact;
        var bookedDate = response.Date;
        var bookedTime = response.Time;

    // Creating a new Table
        var table = document.getElementById("items");
    
    // Creating new Table row
        var row = table.insertRow(++count);

    // Creating new Columns in the newly created row
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);
        var cell7 = row.insertCell(7);

    // Appending the data to the table
        cell0.innerHTML = fullName;
        cell1.innerHTML = emailID;
        cell2.innerHTML = contact;
        cell3.innerHTML = bookedDate;
        cell4.innerHTML = bookedTime;

    // Adding 8th Column for maintaing serial number and setting its display property to none
        cell7.innerHTML = ++serial;
        cell7.style = "display: none";

    

    // Creating Edit button element
        var editBtn = document.createElement('button');

    // Adding class to Edit button
        editBtn.className = 'btn btn-success';

    // Onclick Function Call
        editBtn.onclick = function(){editItem(this);};

    // Appending text node
        editBtn.appendChild(document.createTextNode('Edit'));

    // Appending Edit button to the column
        cell5.appendChild(editBtn);


        
    // Creating Delete button element
        var deleteBtn = document.createElement('button');

    // Adding class to Delete button
        deleteBtn.className = 'btn btn-danger';

    // Onclick Function Call
        deleteBtn.onclick = function(){removeItem(this);};

    // Appending text node
        deleteBtn.appendChild(document.createTextNode('Delete'));

    // Appending Delete button to the column
        cell6.appendChild(deleteBtn);
}



// Remove item
function removeItem(deleteItem)
{
    // Variable to store Row Number
        var rowCount = (deleteItem.parentNode.parentNode.rowIndex);
        var sn = deleteItem.parentNode.nextSibling.innerHTML;
    // Deleting from the Selected Row
        document.getElementById('items').deleteRow(rowCount);
    // Deleting from the Cloud
        // localStorage.removeItem(sn);
    // Decrementing count so that, count = the number of rows 
        count--;
}


// Edit item
function editItem(editItem)
{
    // Variable to store Row Number
        var rowCount = (editItem.parentNode.parentNode.rowIndex);
        var sn = editItem.parentNode.nextSibling.nextSibling.innerHTML;
    // Parsing the data from JSON
        var obj = JSON.parse(localStorage.getItem(sn));
    // Variable to store particular data from the object 
        var fullName = obj.Name;
        var emailID = obj.Email;
        var contact = obj.Contact;
        var bookedDate = obj.Date;
        var bookedTime = obj.Time;
    // Deleting from the Selected Row
        document.getElementById('items').deleteRow(rowCount);
    // Deleting from the Local Storage
        // localStorage.removeItem(sn);
    // Decrementing count so that, count = the number of rows 
        count--;
    // Appending the values in the form
        document.getElementById('fullName').value = fullName;
        document.getElementById('emailID').value = emailID;
        document.getElementById('contact').value = contact;
        document.getElementById('bookedDate').value = bookedDate;
        document.getElementById('bookedTime').value = bookedTime;
}