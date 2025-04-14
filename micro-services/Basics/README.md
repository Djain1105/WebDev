# Micro-Services Project

## Tools Used

### Autocannon

Autocannon is a fast HTTP/1.1 benchmarking tool designed to test the performance of your web server. It allows you to simulate multiple concurrent requests to measure how well your server handles load.

**Usage in this project:**  
Autocannon is used in the `test.js` file to benchmark the performance of the server running on `http://localhost:3000`. It tracks metrics such as total requests, duration, and errors during the test.

### Morgan

Morgan is an HTTP request logger middleware for Node.js. It logs details about incoming requests, such as the HTTP method, URL, status code, and response time, which is useful for debugging and monitoring.

**Usage in this project:**  
Morgan is used in the `stress.service.js` and `index.js` files to log incoming requests to the server, providing visibility into server activity during development and testing.

### Express-HTTP-Proxy

Express-HTTP-Proxy is a middleware for proxying HTTP requests in an Express application. It allows you to forward requests to another server or service, making it useful for building microservices or API gateways.

**Usage in this project:**  
Express-HTTP-Proxy is used in the `gateway.service.js` file to forward incoming requests to specific microservices based on the request path.

### OS Module

The `os` module is a built-in Node.js module that provides operating system-related utility methods and properties. It can be used to retrieve information about the system's CPU, memory, and network interfaces.

**Usage in this project:**  
The `os` module is used in the `stress.service.js` file to determine the number of CPU cores available, which helps in creating worker processes for load balancing.

### Cluster Module

The `cluster` module is a built-in Node.js module that enables the creation of child processes (workers) that share the same server port. It is commonly used to improve the performance of Node.js applications by utilizing multiple CPU cores.

**Usage in this project:**  
The `cluster` module is used in the `stress.service.js` file to create multiple worker processes, each handling a portion of the incoming requests, thereby improving scalability and fault tolerance.

## Summary of Code

This project demonstrates a microservices architecture using Node.js. It includes tools for benchmarking (`autocannon`), logging (`morgan`), and proxying requests (`express-http-proxy`). The `os` and `cluster` modules are used to optimize server performance by leveraging system resources. Each tool and module is integrated into specific files (`test.js`, `gateway.service.js`, and `stress.service.js`) to achieve modularity and scalability.
