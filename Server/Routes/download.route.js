import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Function to dynamically find the file extension
const findFileWithExtensions = async (directory, id, extensions) => {
  for (const ext of extensions) {
    const filePath = path.join(directory, `${id}.${ext}`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
};

// download certificate
router.get('/download/certificate/:id', async (req, res) => {
  const { id } = req.params;
  const filePath = await findFileWithExtensions(path.join('Documents', 'Certificates'), id, ['pdf', 'jpg', 'jpeg']);
  downloadFile(res, filePath, 'Certificate');
});

// download LOR
router.get('/download/lor/:id', async (req, res) => {
  const { id } = req.params;
  const filePath = await findFileWithExtensions(path.join('Documents', 'LOR'), id, ['pdf', 'jpg', 'jpeg']);
  downloadFile(res, filePath, 'LetterOfRecommendation');
});

// download offer letter
router.get('/download/offerLetter/:id', async (req, res) => {
  const { id } = req.params;
  const filePath = await findFileWithExtensions(path.join('Documents', 'OfferLetters'), id, ['pdf', 'jpg', 'jpeg']);
  downloadFile(res, filePath, 'OfferLetter');
});

// Helper function to download file
const downloadFile = (res, filePath, defaultName) => {
  if (filePath) {
    const fileName = path.basename(filePath);
    res.download(filePath, `${defaultName}${path.extname(fileName)}`, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } else {
    res.status(404).json({ message: 'File not found' });
  }
};

export default router;
