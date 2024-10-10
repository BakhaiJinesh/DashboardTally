$(document).ready(function () {
    // API URL (adjust to your API endpoint)
    var apiUrl = "https://localhost:44385/Home"; // Replace with your actual API URL

    // Call the API using jQuery's AJAX method
    $.ajax({
        url: apiUrl,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            // Initialize arrays for chart data
            const labels = data.map(item => item.month); // Extract months for labels
            const purchases = data.map(item => item.purchase); // Extract purchases
            const sales = data.map(item => item.sales); // Extract sales
            const inventoryLevels = data.map(item => item.inventory_levels); // Extract inventory levels
            const profits = data.map(item => item.profit); // Extract profits
            const newCustomers = data.map(item => item.new_customers); // Extract new customers

            const combinedChart = new Chart(document.getElementById('combinedChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labels, // Set labels to the months
                    datasets: [
                        {
                            label: 'Purchase',
                            data: purchases,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Sales',
                            data: sales,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Inventory Levels',
                            data: inventoryLevels,
                            backgroundColor: 'rgba(255, 206, 86, 0.6)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Profit',
                            data: profits,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'New Customers',
                            data: newCustomers,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }
                    ]
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
                                text: 'Values'
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
});
