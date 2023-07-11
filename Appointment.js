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

// Adding saved data from the database to the Web Page
window.addEventListener ("DOMContentLoaded", () => 
{
      // GET Request
    axios.get ("https://crudcrud.com/api/2099092803a0415daaa10b190eb6dd2e/appointmentData")
         .then ((response) => 
         {
            for (let i = 0; i < response.data.length; i++)
            {
                logInput (response.data[i]);
            }
         })
         .catch (error => console.log (error));
})    

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
        axios.post ("https://crudcrud.com/api/2099092803a0415daaa10b190eb6dd2e/appointmentData", myObj)
            .then (alert("Booking Confirmed"))
            .catch (error => console.log (error));
    
    // Resetting the form
        form.reset();
    
    // Refreshing the entire page
        location.reload();
}

function logInput(response)
{        
    // Extracting Data from the Object
        var userID = response._id;
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
        var cell8 = row.insertCell(8);

    // Adding ID
        cell0.innerHTML = userID;
        cell0.style = "display: none";

    // Appending the data to the table
        cell1.innerHTML = fullName;
        cell2.innerHTML = emailID;
        cell3.innerHTML = contact;
        cell4.innerHTML = bookedDate;
        cell5.innerHTML = bookedTime;

    // Adding 8th Column for maintaing serial number and setting its display property to none
        cell8.innerHTML = ++serial;
        cell8.style = "display: none";

    

    // Creating Edit button element
        var editBtn = document.createElement('button');

    // Adding class to Edit button
        editBtn.className = 'btn btn-success';

    // Onclick Function Call
        editBtn.onclick = function(){editItem(this);};

    // Appending text node
        editBtn.appendChild(document.createTextNode('Edit'));

    // Appending Edit button to the column
        cell6.appendChild(editBtn);


        
    // Creating Delete button element
        var deleteBtn = document.createElement('button');

    // Adding class to Delete button
        deleteBtn.className = 'btn btn-danger';

    // Onclick Function Call
        deleteBtn.onclick = function(){removeItem(this);};

    // Appending text node
        deleteBtn.appendChild(document.createTextNode('Delete'));

    // Appending Delete button to the column
        cell7.appendChild(deleteBtn);
}



// Remove item
function removeItem(deleteItem)
{
    // Variable to store Row Number
        var rowCount = (deleteItem.parentNode.parentNode.rowIndex);
        var serialNumber = deleteItem.parentNode.nextSibling.innerHTML;
    // Deleting from the Selected Row
        document.getElementById('items').deleteRow(rowCount);
    // Deleting from the Cloud
        // localStorage.removeItem(serialNumber);
    // Decrementing count so that, count = the number of rows 
        count--;
}


// Edit item
function editItem(editItem)
{
    // Variable to store Row Number
        var rowCount = (editItem.parentNode.parentNode.rowIndex);
        var serialNumber = editItem.parentNode.nextSibling.nextSibling.innerHTML;
    // Parsing the data from JSON
        var obj = JSON.parse(localStorage.getItem(serialNumber));
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