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


// Multer Configuration for File Upload
const storage = multer.memoryStorage(); // Store files in memory as Buffer

const upload = multer({ storage: storage });

// Create MongoDB model for PDF documents
const pdfSchema = new mongoose.Schema({
  filename: String,
  data: Buffer, // Store the file data as a Buffer in MongoDB
});

const PDF = mongoose.model('PDF', pdfSchema);

// Routes
app.use(express.json());

// Upload PDF
app.post('/upload', upload.single('pdf'), async (req, res) => {
  const { originalname, buffer } = req.file;

  try {
    const pdf = new PDF({
      filename: originalname,
      data: buffer, // Store the file data as a Buffer in MongoDB
    });
    await pdf.save();
    res.json({ message: 'PDF uploaded successfully' });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch PDFs
app.get('/fetch', async (req, res) => {
  try {
    const pdfs = await PDF.find();
    res.json(pdfs);
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Serve PDF
app.get('/pdf/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const pdf = await PDF.findById(id);
      if (!pdf) {
        return res.status(404).json({ message: 'PDF not found' });
      }
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `inline; filename="${pdf.filename}"`
      );
      res.send(pdf.data);
    } catch (error) {
      console.error('Error serving PDF:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Delete PDF
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await PDF.findByIdAndRemove(id);
    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error('Error deleting PDF:', error);
    res.status(500).json({ message: 'Internal server error' });
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
