const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');

// Set up GridFS storage engine
const storage = new GridFsStorage({
  url: 'mongodb://localhost/your-database-name', // Replace with your MongoDB connection URL
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'videos', // Specify the bucket name for storing videos in MongoDB
        };
        resolve(fileInfo);
      });
    });
  },
});

// Create the multer upload instance
const upload = multer({ storage });

module.exports = upload;

