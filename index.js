// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
require('dotenv').config();
// const app = express();
// const passwordRoute = require('./routes/passwordReset');
// const register = require('./routes/register');
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
// const fileUpload = require('express-fileupload');


// // Connect to MongoDB database
// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//     .then(() => console.log('Connected to MongoDB'))
    
//     .catch((error) => console.error(error));
//   // Middleware
//   app.use(cors({
//     // origin:"http://localhost:3000"
//     // origin:"https://globalsuccesspoint.netlify.app"
//     // origin:"https://globalsuccesspoint.in"
//   }));
//   app.use(express.json());
//   app.use(fileUpload())
// // error handler middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
// // Routes
// app.use("/api/auth", require("./routes/auth"));

// //for User Register
// app.use('/api/users', register);
// //for password Reset
// app.use('/api/auth', passwordRoute);
// app.use('/api/users', require('./routes/users'));
// //Admin Routes
// app.use("/api/admin", require('./routes/Admin/admin'));
// //contact
// app.use('/api', require('./routes/contact'));
// app.use('/api', require('./routes/OTP'));
// app.use('/api', require('./routes/form'))
// app.use('/api/employee', require('./routes/employee'))
// app.use('/api/payment', require('./routes/payment'))





// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = uuidv4();
//     cb(null, `${uniqueSuffix}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// const pdfSchema = new mongoose.Schema({
//   filename: String,
// });

// const Pdf = mongoose.model('Pdf', pdfSchema);

// app.use(cors());
// app.use(express.json());



// app.post('/upload', upload.single('pdf'), async (req, res) => {
//   try {
//     const { filename } = req.file;
//     const newPdf = new Pdf({ filename });
//     await newPdf.save();
//     res.status(201).json({ message: 'PDF uploaded successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error uploading the PDF' });
//   }
// });

// app.get('/pdfs', async (req, res) => {
//   try {
//     const pdfs = await Pdf.find({}, '-_id filename'); // Exclude the "_id" field from the response
//     res.json(pdfs);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching PDFs' });
//   }
// });

// app.use('/pdfs', express.static('uploads'));

//    // Admin 
//   app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Server error');
//   });
  
//   // 
  
  
//   // Start server
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  

// index.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const passwordRoute = require('./routes/passwordReset');
const register = require('./routes/register');
const app = express();
const port = process.env.PORT || 5000;

// Database setup (use your MongoDB connection string)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log('Connected to MONGODB'))
.catch((error)=>console.log(error));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const pdfSchema = new mongoose.Schema({
  filename: String,
});

const Pdf = mongoose.model('Pdf', pdfSchema);

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", require("./routes/auth"));

//for User Register
app.use('/api/users', register);
//for password Reset
app.use('/api/auth', passwordRoute);
app.use('/api/users', require('./routes/users'));
//Admin Routes
app.use("/api/admin", require('./routes/Admin/admin'));
//contact
app.use('/api', require('./routes/contact'));
app.use('/api', require('./routes/OTP'));
app.use('/api', require('./routes/form'))
app.use('/api/employee', require('./routes/employee'))
app.use('/api/payment', require('./routes/payment'))
app.use('/api', require('./routes/messsage'));

app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const { filename } = req.file;
    const newPdf = new Pdf({ filename });
    await newPdf.save();
    res.status(201).json({ message: 'PDF uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading the PDF' });
  }
});

app.get('/pdfs', async (req, res) => {
  try {
    const pdfs = await Pdf.find({}, '-_id filename'); // Exclude the "_id" field from the response
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching PDFs' });
  }
});

app.use('/pdfs', express.static('uploads'));
   // Admin 
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
  });
  
  // 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
