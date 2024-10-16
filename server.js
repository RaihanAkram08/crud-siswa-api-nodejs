const http = require('http');

let data = [
  { id: 1, name: 'Muhammad', age: 15, class: 10 },
  { id: 2, name: 'Raihan', age: 16, class: 11 }
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // GET All Students
  if (url === '/students' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }

  // Create New Student
  if (url === '/students' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newStudent = JSON.parse(body);
      newStudent.id = data.length + 1;
      data.push(newStudent);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newStudent));
    });
  }

  // Update Student by ID
  if (url.startsWith('/students/') && method === 'PUT') {
    const id = parseInt(url.split('/')[2]);
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedStudent = JSON.parse(body);
      const index = data.findIndex(student => student.id === id);
      if (index !== -1) {
        data[index] = { id, ...updatedStudent };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data[index]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Student not found' }));
      }
    });
  }

  // Delete Student by ID
  if (url.startsWith('/students/') && method === 'DELETE') {
    const id = parseInt(url.split('/')[2]);
    const index = data.findIndex(student => student.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      res.writeHead(204); // No content
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Student not found' }));
    }
  }
});

// Menjalankan server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
