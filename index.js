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


app.use(cors({
  // origin:"http://localhost:3000",
  origin:"https://jivikasfg.online",
  // origin:"*"
}));
app.use(express.json());

// Create a CAPTCHA model
const Captcha = mongoose.model('Captcha', {
  code: String,
});


// Generate a random 6-letter code
function generateCaptcha() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
}

// Create and save a new CAPTCHA code
app.post('/generateCaptcha', async (req, res) => {
  const captchaCode = generateCaptcha();
  const captcha = new Captcha({ code: captchaCode });

  try {
    await captcha.save();
    res.json({ captchaCode });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Verify CAPTCHA code
app.post('/verifyCaptcha', async (req, res) => {
  const { userEnteredCaptcha, captchaCode } = req.body;

  if (userEnteredCaptcha === captchaCode) {
    // CAPTCHA verified successfully, perform another process here
    res.status(200).json({ success: true, message: 'CAPTCHA verified successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'CAPTCHA verification failed!' });
  }
});

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
app.use('/api', require('./routes/EmployeeMonth'))
app.use('/api/employee', require('./routes/employee'))
app.use('/api/loan', require('./routes/loan'))
app.use('/api/payment', require('./routes/payment'))
app.use('/api/message', require('./routes/messsage'));          


// Multer Configuration for File Upload
const storage = multer.memoryStorage(); // Store files in memory as Buffer

const upload = multer({ storage: storage });

// models/Pdf.js

// Create MongoDB model for PDF documents
const pdfSchema = new mongoose.Schema({
  filename: String,
  data: Buffer, // Store the file data as a Buffer in MongoDB
});

const PDF = mongoose.model('PDF', pdfSchema);
const IDCard = new mongoose.Schema({
  filename: String,
  data: Buffer,
  userId: String, // Add userId field to associate PDF with a user
});

const IDCards = mongoose.model('IDCard', IDCard);

//Results
const Result = new mongoose.Schema({
  filename: String,
  data: Buffer,
  userId: String, // Add userId field to associate PDF with a user
});

const Results = mongoose.model('Result', Result);

// Routes
app.use(express.json());
app.post('/Result/upload', upload.single('pdf'), async (req, res) => {
  const { originalname, buffer } = req.file;
  const { userId } = req.body; // Assuming userId is sent in the request body

  try {
    const pdf = new Results({
      filename: originalname,
      data: buffer,
      userId, // Store the user ID in the PDF document
    });
    await pdf.save();
    res.json({ message: 'Result uploaded successfully' });
  } catch (error) {
    console.error('Error uploading Result:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/IDCard/upload', upload.single('pdf'), async (req, res) => {
  const { originalname, buffer } = req.file;
  const { userId } = req.body; // Assuming userId is sent in the request body

  try {
    const pdf = new IDCards({
      filename: originalname,
      data: buffer,
      userId, // Store the user ID in the PDF document
    });
    await pdf.save();
    res.json({ message: 'IDCard uploaded successfully' });
  } catch (error) {
    console.error('Error uploading IDCard:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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


// Serve PDF
app.get('/idcard/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pdf = await IDCards.findById(id);
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
// Serve Result
app.get('/result/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pdf = await Results.findById(id);
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
// Fetch PDFs
app.get('/IDCard/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const pdfs = await IDCards.findOne({userId: userId});
    res.json(pdfs);
  } catch (error) {
    console.error('Error fetching PDFs:', error);
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
// Get all PDFs route
// app.get('/resultsUser', async (req, res) => {
//   try {
//     const pdfs = await Results.find();
//     res.json(pdfs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// Assuming your route is /resultsUser/:filename
app.get('/resultsUser/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const pdf = await Results.findOne({ filename });

    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    // Set Content-Type header to indicate that you are sending a PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// Assuming your route is /resultsUser/:filename
app.delete('/resultsUser/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const deletedResult = await Results.findOneAndDelete({ filename });

    if (!deletedResult) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// Assuming your route is /resultsUser
app.get('/resultsUser', async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const pdfs = await Results.find(query);
    res.json(pdfs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
 // Serve PDF
app.get('/result', async (req, res) => {
  

  try {
    const pdf = await Results.find();
    if (!pdf) {
      return res.status(404).json({ message: 'Result not found' });
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
app.delete('result/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Results.findByIdAndRemove(id);
    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error('Error deleting PDF:', error);
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
