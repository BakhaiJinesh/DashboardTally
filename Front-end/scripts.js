const ctx = document.getElementById('combinedChart').getContext('2d');
const combinedChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Purchase',
                data: [500, 600, 550, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Sales',
                data: [800, 900, 850, 1000, 1100, 1200, 1250, 1300, 1350, 1400, 1450, 1500],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Inventory Levels',
                data: [300, 280, 260, 320, 340, 300, 310, 290, 280, 270, 260, 250],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            },
            {
                label: 'Profit',
                data: [500, 600, 550, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            },
            {
                label: 'New Customers',
                data: [50, 60, 55, 70, 80, 90, 95, 100, 105, 110, 115, 120],
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
                position: 'top', // Can be 'top', 'left', 'bottom', 'right'
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
