function updateInformation() {
    
    fetch('/api/resource-info')
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', data);

            if (data && data.memoryUsage && data.memoryUsage.percent !== undefined &&
                data.diskUsage && data.diskUsage['C:\\'] && data.diskUsage['C:\\'].percent !== undefined &&
                data.networkUsage) {

                console.log('Network Usage:', data.networkUsage);

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

                document.getElementById('resource-info').innerHTML = htmlContent;
            } else {
                console.error('Received data is missing required properties.');
            }
        })
        .catch(error => console.error('Error fetching resource information:', error));
}

updateInformation();
