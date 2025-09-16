import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import session from "express-session";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


 const app = express();
 const port = 3000;


 const db = new pg.Client({
   user: "postgres",
   host: "localhost",
   database: "donationdb",
   password: "aya",
   port: 5432,
 });
 db.connect();
 
  app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


 app.use(express.json());

 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static("public"));

 app.use(
  session({
    secret: "votre_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Mettez à true si vous utilisez HTTPS , Running on localhost without HTTPS
  })
);

// Middleware pour vérifier l'authentification
function requireAuth(req, res, next) {
  if (req.session.userid) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});


 app.get("/",async(req,res)=>{
   res.render("welcome.ejs");
 });
 
 
 app.get("/welcome",async(req,res)=>{
   res.render("welcome.ejs");
 });
 app.get("/contact",async(req,res)=>{
   res.render("contact.ejs");
 });

app.get("/home_page", async (req, res) => {
  const result = await db.query("SELECT * FROM medical_case ORDER BY id_case DESC");
  res.render("home_page.ejs", { cases: result.rows });
});


 
 

 app.get("/SignUp",(req,res)=>{
    res.render("SignUp.ejs");
 });
  

 app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM account WHERE email = $1", [
      email,
    ]);
   

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;
      const role = user.role;
       const id_account = result.rows[0].id_account; 

      if (password === storedPassword) {
        if(role === "Clinic"){
            const result1 = await db.query("SELECT * FROM clinic WHERE id_account = $1 ", [
      id_account]);
        
        const clinic = result1.rows[0];
           req.session.userid = clinic.id_clinic.toString();
        req.session.useradrress = clinic.address;
        req.session.username = clinic.name;
          req.session.donation_link = clinic.donation_link;
       return res.render("clinic.ejs");
        
      }/*else if (role === "Prosthetist"){
         res.render("ProsthetistDashbord.ejs");
     } */ else if (role === "Donator"){
       const result2 = await db.query("SELECT * FROM donator WHERE id_account = $1 ", [
      id_account]);

      const pending="pending";
  const result3 = await db.query("SELECT * FROM medical_case WHERE status = $1",[pending]);

        const donator = result2.rows[0];
       req.session.userid = donator.id_donator.toString();
        req.session.userfirst_name = donator.first_name;
        req.session.userlast_name  =donator.last_name ;
         req.session.userid_account  =donator.id_account ;
         
         res.render("ml.ejs");
          } 
     else if (role === "Patient"){
       const result1 = await db.query("SELECT * FROM patient WHERE id_account = $1 ", [
      id_account]);
        
        const patient = result1.rows[0];
           req.session.userid = patient.id_patient.toString();
           req.session.userid_account = patient.id_account.toString();
       console.log("checkpoint")
         res.render("patient_profile.ejs");}
     } else {
      return res.send("Incorrect Password");
        
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/patient_account", requireAuth,(req, res) => {

  res.render("patient_account.ejs",{ id_clinic:req.session.userid}); 
});

app.get("/clinic", requireAuth,(req, res) => {
res.render("clinic.ejs"); 
});

app.post("/SignUp", async (req, res) => {
  
  const { role,email, password , first_name,last_name , phone,address ,name,donation_link} = req.body;//It automatically extracts email and password from req.body and creates variables with the same names.

  try {
   
    const checkResult = await db.query("SELECT * FROM account WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      const result = await db.query(
        "INSERT INTO account (email, password,role) VALUES ($1, $2,$3) returning id_account",
        [email, password, role]
      );
     const id_account = result.rows[0].id_account; 

       if (role == "Clinic"){
      const result1 = await db.query(
        "INSERT INTO clinic (name,address,id_account,donation_link) VALUES ($1, $2 ,$3,$4)",
        [name,address,id_account,donation_link]
      );
      
      res.render("clinic.ejs");
    } else if(role == "Donator"){

   const result1 = await db.query(
        "INSERT INTO donator (first_name,last_name , id_account) VALUES ($1, $2 ,$3 )",
        [first_name,last_name ,id_account]
      );
       res.render("ml.ejs");
    } else {
  res.status(400).send("Invalid role");
}} } catch (err) {
    console.log(err);
     console.error("Error in /SignUp route:", err);
     res.status(500).send("Server error");
     
  }
});

app.post("/patient_account", async (req, res) => {
 
  const { email, password , first_name,last_name , phone,age ,gender,id_clinic} = req.body;
  const role ="patient"
  try {
     const result1 = await db.query("INSERT INTO account (email, password,role) VALUES ($1,$2,$3) returning id_account", 
      [email, password,role]);

       const id_account = result1.rows[0].id_account; 

    const result = await db.query("INSERT INTO patient (first_name,last_name , phone_number,age ,gender, id_account ,id_clinic) VALUES ($1,$2,$3,$4,$5,$6,$7) returning id_patient ",
       [first_name,last_name , phone,age ,gender,id_account ,id_clinic]);

        const id_patient = result.rows[0].id_patient; 
      
       
   res.redirect(`/clinicDashbord/${id_patient}`);
      } catch (err) {
    console.log(err);
  }
});





app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Route to add a patient with image
app.post("/clinicDashbord/:id_patient", upload.single("image"), async (req, res) => {
  const {  description, blood_type, price , type_of_limb , side} = req.body;
  const image = req.file ? req.file.filename : null;
  const id_patient = req.params.id_patient;
  const status ="pending";
  try {
    await db.query(
      "INSERT INTO medical_case( status, blood_type, price, image,type_of_limb , side, description ,id_patient) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [ status, blood_type, price, image,type_of_limb , side, description,id_patient] );
 
      res.render("clinicDashbord.ejs");
      
   // res.send("Case added successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});


app.get("/clinicDashbord/:id_patient", requireAuth,(req,res) => {
   res.render("clinicDashbord.ejs", { id_patient: req.params.id_patient });
});


app.get("/Medical_cases",requireAuth, async (req, res) => {
  const result = await db.query(" SELECT * FROM medical_case JOIN patient ON patient.id_patient = medical_case.id_patient where patient.id_clinic=$1",[ req.session.userid ]);
 
res.render("Medical_cases.ejs", { medical: result.rows });
});

app.get("/edit_case/:id_case",requireAuth, (req,res) => {
   res.render("edit_case.ejs", { id_case: req.params.id_case });
});

app.post("/edit_case/:id_case", upload.single("image"), async (req, res) => {
  let { status, blood_type, price, type_of_limb, side ,description} = req.body;
  const id_case = req.params.id_case;
  const image = req.file ? req.file.filename : null;

  // Convert empty strings to null
  const clean = v => (v === "" ? null : v);

  status = clean(status);
  blood_type = clean(blood_type);
  price = clean(price);
  type_of_limb = clean(type_of_limb);
  side = clean(side);
 description = clean(description);
  try {
    await db.query(
      `UPDATE medical_case
       SET 
         status = COALESCE($1, status),
         blood_type = COALESCE($2, blood_type),
         price = COALESCE($3, price),
         type_of_limb = COALESCE($4, type_of_limb),
         side = COALESCE($5, side),
          description = COALESCE($6, description ),
         image = COALESCE($7, image)
       WHERE id_case = $8`,
      [status, blood_type, price, type_of_limb, side,description, image, id_case]
    );

    res.render("edit_case.ejs");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/Donators",requireAuth, async (req, res) => {
  const result = await db.query( "SELECT * FROM donation WHERE id_clinic = $1",
 [req.session.userid]);
 res.render("Donators.ejs", { donations: result.rows });
});

app.get("/DonatorDashbord", requireAuth,async(req, res) => {
  const pending="pending";
  const result3 = await db.query("SELECT * FROM medical_case WHERE status = $1",[pending]);
res.render("DonatorDashbord.ejs",{m: result3.rows }); 
});


app.get("/donate/:id_patient",requireAuth, (req,res) => {
   const id_patient= req.params.id_patient;
   
   res.render("donate.ejs", { id_patient,id_donator:req.session.userid });
});

app.post("/donate/:id_patient", async (req, res) => {
  let { price, country, cardSelection,id_donator} = req.body;
  const id_patient= req.params.id_patient;
  
  try {
   const result= await db.query(
      "select id_clinic from patient where id_patient =$1",
      [ id_patient] );
      const id_clinic = result.rows[0].id_clinic;
     
 
  await db.query(
      "INSERT INTO donation( price, country, payment_method,id_clinic,id_donator) VALUES ($1,$2,$3,$4,$5)",
      [ price, country,cardSelection,id_clinic,id_donator] );
 
      const result1 =await db.query(
      "select donation_link from clinic where id_clinic = $1",[id_clinic] );
 
      const donationLink = result1.rows[0].donation_link;

           res.redirect(donationLink);

   } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});


app.get("/patient_profile",requireAuth,async (req,res) => {
  const result = await db.query("SELECT * FROM patient WHERE id_patient = $1",[req.session.userid]);
  const result1=await db.query("SELECT email FROM account WHERE id_account = $1",[req.session.userid_account]);
console.log("checkpoint")
  res.render("patient_profile.ejs",{p:result.rows[0],s:result1.rows[0].id_account});
});


app.post("/patient_profile", async (req, res) => {
   const { email, first_name,last_name , phone,age ,gender} = req.body;
 
  // Convert empty strings to null
  const clean = v => (v === "" ? null : v);

  //email = clean(email);
  //password = clean(password);
  first_name = clean(first_name);
  last_name = clean(last_name);
 phone = clean(phone);
age = clean(age);
gender = clean(gender);
/*  email = COALESCE($1, email),
         password = COALESCE($2,  password),*/ 
try {
    await db.query(
      `UPDATE patient
       SET 
       first_name = COALESCE($3, first_name),
          last_name = COALESCE($4,  last_name),
         phone = COALESCE($5, phone),
         age  = COALESCE($6, age ),
         gender  = COALESCE($7, gender )
       WHERE id_patient = $8`,
      [first_name,last_name , phone,age ,gender,req.session.userid]
    );
     console.log("checkpoint")
    res.render("patient_profile.ejs",);
     //res.redirect("/patient_profile");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});


app.get("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error logging out");
    }

    // Optionally, clear the cookie
    res.clearCookie("connect.sid"); // 'connect.sid' is the default session cookie name

    // Redirect to login or home page
    res.redirect("/home_page");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
