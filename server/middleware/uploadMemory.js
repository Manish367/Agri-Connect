const multer = require('multer');

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const mimeOk = allowed.test(file.mimetype);
  if (mimeOk) return cb(null, true);
  cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed'));
};

const uploadMemory = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = uploadMemory;
