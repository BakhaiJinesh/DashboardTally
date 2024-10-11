$(document).ready(function () {

    // Retrieve user ID from local storage
    const userId = localStorage.getItem('userId');
    const apiUrl = config.apiBaseUrl;

    // Check if userId is available
    if (!userId) {
        console.error('User ID not found in local storage.');
        window.location.href = '../HTML/login.html'; // Adjust path as necessary
        return; // Stop further script execution
    }
    
    // If userId is found, change the button to Logout
    $('#authButton').text('Logout');
    $('#authButton').attr('href', '#'); // Set href to # for logout action

    // Set up logout functionality
    $('#authButton').on('click', function () {
        // Clear localStorage
        localStorage.removeItem('userId');
        // Redirect to login page
        window.location.href = '../HTML/login.html'; // Adjust path as necessary
    });


    // Event listener for item clicks
    $('#itemList').on('click', 'li', function () {
        const accessID = $(this).data('accessId'); // Get AccessID from the clicked list item
        localStorage.setItem('AccessID',accessID);
        fetchDashboardData(accessID); // Call the function to fetch data using the selected AccessID
    });

    // Set up click event for the download icon
    $('#downloadChartIcon').on('click', function (e) {
        e.preventDefault(); // Prevent default action (if it's a link)
        const accessID = localStorage.getItem('AccessID'); // Get AccessID from the clicked list item
        downloadChartData(accessID); // Call function to download data
    });


        
    // Set up click event for the share icon
    $('#shareChartIcon').on('click', function (e) {
        e.preventDefault(); // Prevent default action (if it's a link)
        const accessID = localStorage.getItem('AccessID');

        // Show the modal
        $('#shareModal').css('display', 'block');
    });

    // Close modal when the user clicks on <span> (x)
    $('.close-button').on('click', function() {
        $('#shareModal').css('display', 'none');
        $('#shareForm')[0].reset(); // Clear the form fields
    });

    // Close modal when the user clicks anywhere outside of the modal
    $(window).on('click', function(event) {
        if (event.target.id === 'shareModal') {
            $('#shareModal').css('display', 'none');
            $('#shareForm')[0].reset(); // Clear the form fields
        }
    });

    // Handle form submission
    $('#shareForm').on('submit', function(e) {
        e.preventDefault(); // Prevent form submission
        const email = $('#email').val();
        const accessID = localStorage.getItem('AccessID');
        
        // Close the modal after sending
        $('#shareModal').css('display', 'none');
        $('#shareForm')[0].reset(); // Clear the form fields after sending

        sendEmail(email,accessID);
    });


        
    
    // Set up click event for the download icon
    $('#whatsappButton').on('click', function (e) {
       alert('Click on whatsapp Button')
    });


    // API URL for GetChartRoles (adjust to your API endpoint)
    var GetChartRoles = apiUrl + `Dashboard/GetChartRoles?userid=${userId}`;

    // Call the API for chart roles data
    $.ajax({
        url: GetChartRoles,
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            
            // Check if response has Roles data
            if (response && response.length > 0 && response[0].Roles) {
                // Parse the 'Roles' JSON string into an array of objects
                const roles = JSON.parse(response[0].Roles);

                // Get reference to the list in HTML
                const itemList = $('#itemList');

                // Clear existing list items (if needed)
                itemList.empty();

                // Add each role name as a list item dynamically
                roles.forEach(role => {
                    const listItem = $('<li></li>').text(role.Name).data('accessId', role.AccessID);
                    itemList.append(listItem); // Append new list item
                });

                // Get the AccessID of the first role in the array
                const firstAccessID = roles[0].AccessID;

                localStorage.setItem('AccessID',firstAccessID);
                
                // Now call the GetDashboard API with the first AccessID
                fetchDashboardData(firstAccessID);

            } else {
                console.error("No Roles found in the response.");
            }
        },
        error: function (xhr, status, error) {
            console.log("GetChartRoles API Call Failed");
            console.error("Error:", error);
            console.error("Status:", status);
            console.error("XHR Response:", xhr.responseText);
            if (xhr.status === 0) {
                // Handle net::ERR_CONNECTION_REFUSED or similar network issues
                $('#message').text('502 Bad Gateway: Unable to reach the server. Please try again later.');
                alert('502 Bad Gateway: Unable to reach the server. Please try again later.');
            }
        }
    });

    // Function to call the GetDashboard API
    function fetchDashboardData(accessID) {
        var GetDashboard = apiUrl + `Dashboard/GetDashboard?userid=${accessID}`;
        
        $.ajax({
            url: GetDashboard,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                const labels = [...new Set(data.map(item => `${item.TransactionMonth} ${item.TransactionYear}`))];
                const transactionTypes = [...new Set(data.map(item => item.TransactionType))];
    
                const datasets = transactionTypes.map(type => {
                    const filteredData = data.filter(item => item.TransactionType === type);
                    return {
                        label: type,
                        data: labels.map(label => {
                            const matchingItem = filteredData.find(item => `${item.TransactionMonth} ${item.TransactionYear}` === label);
                            return matchingItem ? matchingItem.Cost : 0;
                        }),
                        backgroundColor: getRandomColor(),
                        borderColor: getRandomColor(),
                        borderWidth: 1
                    };
                });
    
                // Destroy the existing chart if it exists
                if (window.myChart) {
                    window.myChart.destroy();
                }
    
                // Create a new chart instance
                window.myChart = new Chart(document.getElementById('combinedChart').getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: datasets
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                                labels: { boxWidth: 20 }
                            }
                        },
                        scales: {
                            x: { stacked: false },
                            y: {
                                beginAtZero: true,
                                title: { display: true, text: 'Cost' }
                            }
                        }
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error("API Call Failed", error);
            }
        });
    }
    
    //Get Chart Data Export
    function downloadChartData(accessID) {
        // Construct the URL for fetching the chart data
        const exportUri = apiUrl + `Dashboard/Export?userid=${accessID}`;
    
        // Use jQuery's AJAX to fetch the data
        $.ajax({
            url: exportUri,
            method: 'GET',
            xhrFields: {
                responseType: 'blob' // Set response type to blob for file download
            },
            success: function (data,textStatus, xhr) {
                console.log('date',data);
                console.log('textStatus',textStatus);
                console.log('xhr',xhr);
                // Create a blob object from the data
                const blob = new Blob([data], { type: 'application/octet-stream' });
    
                // Create a URL for the blob
                const exportUri = window.URL.createObjectURL(blob);
    
                // Create a link element to trigger the download
                const a = document.createElement('a');
                a.href = exportUri;
                var date = new Date();
                a.download = 'Report ' + date.getFullYear() + " _ " + (date.getMonth() + 1) + " _ " + date.getDate() + '.xlsx'; // Specify the default filename
    
                // Append the link to the body and trigger the download
                document.body.appendChild(a);
                a.click();
    
                // Clean up by removing the link and revoking the object URL
                setTimeout(() => {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(exportUri);
                }, 100);
            },
            error: function (xhr, status, error) {
                console.error('Error downloading chart data:', error);
                alert('An error occurred while downloading the data. Please try again.');
            }
        });
    }
   


    // Function to send email
    function sendEmail(email,accessID) {
    // Define the API URL
    const emailUri = apiUrl + 'Email/send-email';

      // Prepare the data to send
      const dataToSend = JSON.stringify({
        email: email,
        accessID: parseInt(accessID,10) // Include the accessID in the payload
    });


     // Send the email using AJAX
    $.ajax({
        url: emailUri,
        method: 'POST',
        contentType: 'application/json',
        data: dataToSend, // Send the email and accessID as JSON
        success: function (response) {
            $('#shareModal').hide(); // Hide the modal
            $('#email').val(''); // Clear the input field
            alert('Email sent successfully!');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error('Error sending email:', errorThrown);
            alert('Failed to send email. Please try again.'); // Error message
        }
    });
}


    // Helper function to generate random colors for chart bars
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

});
