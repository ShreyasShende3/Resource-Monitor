function updateInformation() {
    // Use AJAX to fetch resource information from your Python script
    fetch('/api/resource-info')
        .then(response => response.json())
        .then(data => {
            // Log the received data to the console for debugging
            console.log('Received data:', data);

            // Check if the required properties exist before accessing them
            if (data && data.memoryUsage && data.memoryUsage.percent !== undefined &&
                data.diskUsage && data.diskUsage['C:\\'] && data.diskUsage['C:\\'].percent !== undefined &&
                data.networkUsage) {

                // Log network usage data to the console
                console.log('Network Usage:', data.networkUsage);

                // Create the HTML content dynamically with separate tables
                const htmlContent = `
                    <div class="table-container">
                        <h2>System Information</h2>
                        <table>
                            <tr>
                                <th>CPU Usage</th>
                                <td>${data.cpuUsage}%</td>
                            </tr>
                            <tr>
                                <th>Memory Usage</th>
                                <td>${data.memoryUsage.percent}%</td>
                            </tr>
                            <tr>
                                <th>Disk Usage</th>
                                <td>${data.diskUsage['C:\\'].percent}%</td>
                            </tr>
                            <tr>
                                <th>Boot Time</th>
                                <td>${data.boottime}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="table-container">
                        <h2>Network Usage</h2>
                        <table>
                            <tr>
                                <th>Bytes Received</th>
                                <td>${data.networkUsage.bytes_received}</td>
                            </tr>
                            <tr>
                                <th>Bytes Sent</th>
                                <td>${data.networkUsage.bytes_sent}</td>
                            </tr>
                            <tr>
                                <th>Packets Received</th>
                                <td>${data.networkUsage.packets_received}</td>
                            </tr>
                            <tr>
                                <th>Packets Sent</th>
                                <td>${data.networkUsage.packets_sent}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="table-container">
                        <h2>Top 10 Processes by Memory Usage</h2>
                        <table>
                            <tr>
                                <th>PID</th>
                                <th>Name</th>
                                <th>CPU %</th>
                                <th>Memory %</th>
                            </tr>
                            ${data.processList.map(process => `
                                <tr>
                                    <td>${process[0]}</td>
                                    <td>${process[1]}</td>
                                    <td>${process[2]}</td>
                                    <td>${process[3]}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                `;

                // Update the content dynamically
                document.getElementById('resource-info').innerHTML = htmlContent;
            } else {
                console.error('Received data is missing required properties.');
            }
        })
        .catch(error => console.error('Error fetching resource information:', error));
}

// Initial update when the page loads
updateInformation();
