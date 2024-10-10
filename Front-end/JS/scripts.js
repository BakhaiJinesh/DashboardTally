$(document).ready(function () {

    // Retrieve user ID from session storage
    const userId = localStorage.getItem('userId');

    // Check if userId is available
    if (!userId) {
        console.error('User ID not found in session storage.');
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


    // API URL (adjust to your API endpoint)
    var apiUrl = `https://localhost:44385/Dashboard/GetDashboard?userid=${userId}`; // Use userId from session storage

    // Call the API using jQuery's AJAX method
    $.ajax({
        url: apiUrl,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            // Initialize arrays for chart data
            const labels = [...new Set(data.map(item => `${item.TransactionMonth} ${item.TransactionYear}`))]; // Extract unique month-year labels
            const transactionTypes = [...new Set(data.map(item => item.TransactionType))]; // Extract unique transaction types

            // Prepare datasets for each transaction type
            const datasets = transactionTypes.map(type => {
                const filteredData = data.filter(item => item.TransactionType === type);
                return {
                    label: type,
                    data: labels.map(label => {
                        const matchingItem = filteredData.find(item => `${item.TransactionMonth} ${item.TransactionYear}` === label);
                        return matchingItem ? matchingItem.Cost : 0; // Use 'Cost' for data or 0 if no match
                    }),
                    backgroundColor: getRandomColor(),
                    borderColor: getRandomColor(),
                    borderWidth: 1
                };
            });

            // Generate the chart
            const combinedChart = new Chart(document.getElementById('combinedChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labels, // Set labels to the month-year
                    datasets: datasets // Set datasets for each transaction type
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                boxWidth: 20 // Width of the colored box in the legend
                            }
                        }
                    },
                    scales: {
                        x: {
                            stacked: false
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Cost' // Y-axis title indicating it's the cost data
                            }
                        }
                    }
                }
            });
        },
        error: function (xhr, status, error) {
            // Handle error
            console.log("API Call Failed");
            console.error("Error:", error);
            console.error("Status:", status);
            console.error("XHR Response:", xhr.responseText);
        }
    });

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
