<h3 align="center">Resource Monitor Using Python</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
</div>

---

<p align="center"> This is a Python program for checking the resource usage done by the computer. The resource usage is shown in various parts like Disk Usage, Network Usage and Boot Time.
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [License](#license)

## 🧐 About <a name = "about"></a>
 The provided code implements a simple resource monitoring web application using Flask, a Python web framework, and the psutil library for system information retrieval. The application offers real-time insights into various aspects of a computer's performance, including CPU usage, memory usage, disk usage, network usage, and a list of top processes.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
### Prerequisites
What things you need to install for this project and how to install them.

```
Python 3.x
Flask(2.0.2) : Flask is a lightweight Python web framework for building web applications with ease.
Psutil(5.9.5) : Psutil is a Python library for accessing system details and resource utilization information.
Time(1.0.0) : The time library in Python facilitates time-related operations, including measuring execution time and handling timestamps.
```

### Installing
The following commands can be used to install the prerequisites and run the code.

1) Install Depedencies(Time is already present by default you don't need to install it separately)

````
pip install Flask psutil
````
2) Clone the repository

````
git clone https://github.com/ShreyasShende3/Resource-Monitor.git
````
3) After cloning change the directory to the directory name

````
cd Resource-Monitor
````
### Usage
1) Make sure all the files are in there right folder. (Static should include script.js and style.css and Templates should include index.html)

2) Run the Python script:

```
python main.py
```
3) Open a web browser and navigate to http://127.0.0.1:5000/ to see the output.

You should see the following output:
![Output]([https://github.com/ShreyasShende3/Resource-Monitor/blob/main/Screenshot%20(67).png])

4) Click the Update button and wait for a few seconds to see the updated resource usage.

## License <a name = "license"></a>
MIT License
