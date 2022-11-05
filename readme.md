Cara installasi ke device local:

1. clone repo: https://github.com/satriopriambodo/simpaninvest.git
2. buka folder tersebut, lalu buka terminal dan install package dengan cara menulisakan perintah di terminal: npm install
3. menyiapkan database dengan sequelize:
   - pertama, create database dengan cara menuliskan perintah diterminal: npx sequelize db:create
   - kedua, table migration dengan cara menuliskan perintah diterminal: npx sequelize db:migrate
4. setelah terinstall package dan mempersiapkan database, jalankan local server menggunakan perintah di terminal: npm run start
5. local server sudah berjalan, untuk menghit endpoint/api login dan register:

- Register: http://localhost:5000/users/register (POST METHOD)
  dengan request body:
  username: "string"
  email: "string"
  password: "string"
- Login: http://localhost:5000/users/login (POST METHOD)
  dengan request body:
  email: "string"
  password: "string"

  postman json link: https://www.postman.com/collections/d08ef10407888559bee8
