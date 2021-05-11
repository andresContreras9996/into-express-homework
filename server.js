//Modules
const express = require('express');
const app = express();
const PORT = 5000;
//Router
const routes = require("./routes/router");

app.use(express.json());

app.use(routes);
app.use((req,res)=>{
  res.status(404).json({
    message: "resource not found"
  });
});

app.listen(PORT, ()=>{
  console.log(`app running at port ${PORT}`);
});


