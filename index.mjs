import http from 'http';
import axios from "axios";

const PORT_NUMBER = 8125;

const LIST_OF_APIS =[
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/posts/59",
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts/178",
    "https://jsonplaceholder.typicode.com/comments",
    "https://jsonplaceholder.typicode.com/users/987",
    "https://jsonplaceholder.typicode.com/albums",
    "https://jsonplaceholder.typicode.com/todos/967",
    "https://jsonplaceholder.typicode.com/comments/732",
    "https://jsonplaceholder.typicode.com/photos",
    "https://jsonplaceholder.typicode.com/todos",
    "https://jsonplaceholder.typicode.com/photos/800"
];

http.createServer(async (request, response) => {
    console.log('request ', request.url);
    let contentAxiosResponses = await Promise.allSettled(LIST_OF_APIS.map(endpoint=>axios.get(endpoint)));
    let content = contentAxiosResponses.map((value,index)=>
         ({endpoint:LIST_OF_APIS[index], status:value.status==='fulfilled'?value.value.status:value.reason.response.status, ...(value.status==='fulfilled'?{}:{error:value.reason.message})})
    );
    response.end(JSON.stringify(content,null,2), 'utf-8');
}).listen(PORT_NUMBER);
console.log(`Server running at http://127.0.0.1:${PORT_NUMBER}/`);
