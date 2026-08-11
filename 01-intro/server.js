const http = require('http');

let requestsCount = 0;

// create server with params request, response
const server = http.createServer((request, response) => {
    requestsCount++;

    // react to these url
    switch (request.url) {
        // if request to the /students - write 'students' in the page
        case '/students':
            response.write('students ');
            break;
        case '/':
        case '/courses':
            response.write('courses ');
            break;
        default:
            response.write('404 not found ');
    }

    response.write('testing server' + ' ' + requestsCount);
    response.end();
});

server.listen(3003);