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
        var apiUrl = "http://localhost:3000/login"; // Adjust the port as necessary

        // Send the POST request using jQuery's AJAX method
        $.ajax({
            url: apiUrl,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data), // Convert the data object to a JSON string
            success: function (response) {
                // Handle a successful login
                $('#message').text('Login successful!'); // Display success message
                // Optionally, redirect or perform other actions based on response
            },
            error: function (xhr, status, error) {
                // Handle errors
                $('#message').text('Login failed: ' + xhr.responseText); // Display error message
                console.error("Error:", error);
            }
        });
    });
});
