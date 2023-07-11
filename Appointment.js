// Form submit event
    var form = document.getElementById('appointmentForm');
    form.addEventListener('submit', addItem);


// Form reset event
    var form2 = document.getElementById('appointmentForm');


// Delete event
    var itemList = document.getElementsByClassName('btn-danger');


// Edit event
    var editList = document.getElementsByClassName('btn-success');


// Count Variable for maintaining Row Count
    var count = 0;




// Adding saved data from the database to the Web Page every time the page is loaded
    window.addEventListener ("DOMContentLoaded", () => 
    {
        // GET Request
            axios.get ("https://crudcrud.com/api/dc20ff41eab342bcb645d7108f372d28/appointmentData")
                .then ((response) => 
                {
                    for (let i = 0; i < response.data.length; i++)
                    {
                        logInput (response.data[i]);
                    }
                })
                .catch (error => console.log (error));
    });




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

        // POST Request
            axios.post ("https://crudcrud.com/api/dc20ff41eab342bcb645d7108f372d28/appointmentData", myObj)
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

        // Adding ID
            cell0.innerHTML = userID;
            cell0.style = "display: none";

        // Appending the data to the table
            cell1.innerHTML = fullName;
            cell2.innerHTML = emailID;
            cell3.innerHTML = contact;
            cell4.innerHTML = bookedDate;
            cell5.innerHTML = bookedTime;

        

        // Creating Edit button element
            var editBtn = document.createElement('button');

        // Adding class to Edit button
            editBtn.className = 'btn btn-success';

        // Onclick Function Call
            editBtn.onclick = function(){editItem(response);};

        // Appending text node
            editBtn.appendChild(document.createTextNode('Edit'));

        // Appending Edit button to the column
            cell6.appendChild(editBtn);



            
        // Creating Delete button element
            var deleteBtn = document.createElement('button');

        // Adding class to Delete button
            deleteBtn.className = 'btn btn-danger';

        // Onclick Function Call
            deleteBtn.onclick = function(){removeItem(response);};

        // Appending text node
            deleteBtn.appendChild(document.createTextNode('Delete'));

        // Appending Delete button to the column
            cell7.appendChild(deleteBtn);
    }




// Remove item
    function removeItem(deleteItem)
    {
        // Storing the _id from the database in a variable
            var serialNumber = deleteItem._id;

        // DELETE request
            axios.delete (`https://crudcrud.com/api/dc20ff41eab342bcb645d7108f372d28/appointmentData/${serialNumber}`)
                .then (alert("Booking Deleted"))
                .catch(error => console.error(error));
        
        // Refreshing the entire page
            location.reload();
    }




// Edit item
    function editItem(editItem)
    {
        // Storing the _id from the database in a variable
            var serialNumber = editItem._id;

        // Variable to store particular data from the object 
            var fullName = editItem.Name;
            var emailID = editItem.Email;
            var contact = editItem.Contact;
            var bookedDate = editItem.Date;
            var bookedTime = editItem.Time;
        
        // Appending the values in the form
            document.getElementById('fullName').value = fullName;
            document.getElementById('emailID').value = emailID;
            document.getElementById('contact').value = contact;
            document.getElementById('bookedDate').value = bookedDate;
            document.getElementById('bookedTime').value = bookedTime;
        
        // DELETE request
            axios.delete (`https://crudcrud.com/api/dc20ff41eab342bcb645d7108f372d28/appointmentData/${serialNumber}`)
                .then ()
                .catch(error => console.error(error));
    }



// Form reset button
    function resetForm()
    {
        form2.reset();
    }