const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

let upload; 

const allowedExtensions = ['.pdf', '.doc', '.docx'];
const allowedMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

if (process.env.USE_CLOUDINARY === 'true') {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });

  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      const ext = path.extname(file.originalname); 
      const name = path.basename(file.originalname, ext);
  
      return {
        folder: 'job_applications',
        resource_type: 'raw',
        // public_id: `${Date.now()}-${name}${ext}`, 
        public_id: `${Date.now()}-${name}`,
        use_filename: true,
        unique_filename: false
      };
    }
  });  

  upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const isValidExt = allowedExtensions.includes(ext);
      const isValidMime = allowedMimeTypes.includes(file.mimetype);

      if (isValidExt && isValidMime) {
        cb(null, true);
      } else {
        cb(new Error('Only .pdf, .doc, and .docx files are allowed!'));
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 } 
  });

} else {
  const uploadDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const localStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix);
    }
  });

upload = multer({
  storage: localStorage,  
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    console.log("Uploading file:", file);
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log('❌ Blocked file:', file.originalname, '| Type:', file.mimetype);
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

module.exports = upload;
