from flask import Flask, jsonify, render_template
import psutil
import time

app = Flask(__name__)

def get_cpu_usage():
    return psutil.cpu_percent(interval=1)

def get_memory_usage():
    memory = psutil.virtual_memory()
    return {
        'total': memory.total,
        'used': memory.used,
        'free': memory.available,
        'percent': memory.percent
    }

def get_disk_usage():
    partitions = psutil.disk_partitions()
    disk_usage = {}
    for partition in partitions:
        try:
            usage = psutil.disk_usage(partition.mountpoint)
            disk_usage[partition.device] = {
                'total': usage.total,
                'used': usage.used,
                'free': usage.free,
                'percent': usage.percent
            }
        except Exception as e:
            print(f"Error reading disk usage for {partition.device}: {e}")
    return disk_usage

def get_network_usage():
    network = psutil.net_io_counters()
    return {
        'bytes_sent': network.bytes_sent,
        'bytes_received': network.bytes_recv,
        'packets_sent': network.packets_sent,
        'packets_received': network.packets_recv
    }

def get_process_list():
    processes = []
    for process in sorted(psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']),
                          key=lambda x: x.info['memory_percent'], reverse=True)[:10]:
        processes.append([
            process.info['pid'],
            process.info['name'],
            f"{process.info['cpu_percent']:.2f}%",
            f"{process.info['memory_percent']:.2f}%"
        ])
    return processes

def get_boot_time():
    boot_time_timestamp = psutil.boot_time()
    boot_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(boot_time_timestamp))
    return boot_time

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/resource-info')
def resource_info():
    cpu_usage = get_cpu_usage()
    memory_usage = get_memory_usage()
    disk_usage = get_disk_usage()
    network_usage = get_network_usage()
    process_list = get_process_list()
    boot_time = get_boot_time()

    return jsonify({
        'cpuUsage': cpu_usage,
        'memoryUsage': memory_usage,
        'diskUsage': disk_usage,
        'networkUsage': network_usage,
        'processList': process_list,
        'boottime' : boot_time
    })

if __name__ == '__main__':
    app.run(debug=True)
