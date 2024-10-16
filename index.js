// Mengimpor modul 'http' dari Node.js untuk membuat server HTTP
const http = require('http');

// Membuat server HTTP menggunakan metode 'createServer'
// Fungsi ini menerima dua parameter: req (request) dan res (response)
const server = http.createServer((req, res) => {
  // Mengatur header respons dengan status 200 (OK) dan tipe konten 'text/plain'
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Mengakhiri respons dan mengirimkan teks 'Server is running!' ke klien
  res.end('Server is running!');
});

// Memulai server untuk mendengarkan pada port 3000
// Setelah server berhasil dijalankan, fungsi callback ini akan dipanggil
server.listen(3000, () => {
  // Mencetak pesan ke konsol yang menunjukkan bahwa server telah berjalan
  console.log('Server running at http://localhost:3000/');
});


