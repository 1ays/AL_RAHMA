import express from "express";
 const app = express();
 const port = 3000;

 app.get("/",(req,res)=>{
    res.render("home_page.ejs");
 });

 app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
