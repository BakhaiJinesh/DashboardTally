$(document).ready(function () {
    $('#loginForm').on('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the username and password from the form
        var username = $('#username').val();
        var password = $('#password').val();

        // Create the data object to send to the API
        var data = {
            username: username,
            password: password
        };

        // API URL (replace with your actual API endpoint)
        var apiUrl = "https://localhost:44385/Dashboard/Login"; // Adjust the port as necessary

        // Send the POST request using jQuery's AJAX method
        $.ajax({
            url: apiUrl,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data), // Convert the data object to a JSON string
            success: function (response) {
                // Check if the response is a number (indicating user ID)
                if (!isNaN(response)) {
                    $('#message').text('Login successful!'); // Display success message
                    
                    // Optionally, redirect or perform other actions based on response
                    // Redirect to index.html with user ID as a query parameter
                    // Store the user ID in local storage (or session storage)
                    localStorage.setItem('userId', response);

                    // Redirect to index.html without userId in the URL
                    window.location.href = "index.html";

                    // Example: window.location.href = "dashboard.html";
                } else {
                    // Display message from the response for failed login
                    $('#message').text('Login failed: ' + (response || 'Unknown error')); 
                }
            },
            error: function (xhr, status, error) {
                // Handle errors
                $('#message').text('Login failed: ' + xhr.responseText); // Display error message
                console.error("Error:", error);
            }
        });
    });
});
