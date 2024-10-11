$(document).ready(function () {

    const apiUrl = config.apiBaseUrl;
    

    $('#loginForm').on('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the username and password from the form
        var username = $('#username').val();
        var password = $('#password').val();

        // Disable the submit button
        $('#submitButton').attr('disabled', true);

        // Create the data object to send to the API
        var data = {
            username: username,
            password: password
        };

        // API URL (replace with your actual API endpoint)
        var LoginUri = apiUrl + "Dashboard/Login"; // Adjust the port as necessary

        // Send the POST request using jQuery's AJAX method
        $.ajax({
            url: LoginUri,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data), // Convert the data object to a JSON string
            success: function (response) {
                // Check if the response is a number (indicating user ID)
                if (!isNaN(response)) {
                    $('#message').text('Login successful!'); // Display success message

                    // Store the user ID in local storage (or session storage)
                    localStorage.setItem('userId', response);

                    // Redirect to index.html without userId in the URL
                    window.location.href = "index.html";
                } else {
                    // Display message from the response for failed login
                    $('#message').text('Login failed: ' + (response || 'Unknown error')); 
                    // alert('Login failed: ' + (response || 'Unknown error'));
                    // Re-enable the button if login failed
                    $('#submitButton').attr('disabled', false);
                }
            },
            error: function (xhr, status, error) {
                if (xhr.status === 0) {
                    // Handle net::ERR_CONNECTION_REFUSED or similar network issues
                    $('#message').text('502 Bad Gateway: Unable to reach the server. Please try again later.');
                    alert('502 Bad Gateway: Unable to reach the server. Please try again later.');
                } else {
                    // Handle other errors (e.g., server errors or bad requests)
                    $('#message').text('Login failed: ' + xhr.responseText);
                }
            
                console.error("Error:", error);
            
                // Re-enable the button if there was an error
                $('#submitButton').attr('disabled', false);
            }
        });
    });
});
