import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'audio') {
      if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
      } else {
        cb(new Error('Only audio files allowed'), false);
      }
    } else if (file.fieldname === 'image') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files allowed'), false);
      }
    } else {
      cb(new Error('Unexpected field'), false);
    }
  }
});

// POST /upload/voice
router.post('/voice', upload.single('audio'), async (req, res) => {
  try {
    console.log('Received voice upload request');
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No audio file provided'
      });
    }
    
    console.log('File saved:', req.file.path);
    
    // TODO: Process with Ghana NLP ASR
    const transcription = 'Sample transcription - integrate with Ghana NLP ASR';
    
    res.status(201).json({
      success: true,
      data: {
        fileInfo: {
          originalName: req.file.originalname,
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype
        },
        processing: {
          transcription,
          confidence: 0.8,
          language: 'en'
        }
      },
      message: 'Voice upload successful'
    });
    
  } catch (error) {
    console.error('Voice upload error:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to process voice upload',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /upload/image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    console.log('Received image upload request');
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }
    
    console.log('File saved:', req.file.path);
    
    // TODO: Process with crop disease model
    const prediction = 'Sample prediction - integrate with crop disease model';
    
    res.status(201).json({
      success: true,
      data: {
        fileInfo: {
          originalName: req.file.originalname,
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype
        },
        analysis: {
          prediction,
          confidence: 0.85,
          diseaseInfo: {
            severity: 'medium',
            treatment: 'Sample treatment recommendation',
            prevention: 'Sample prevention advice'
          }
        }
      },
      message: 'Image upload successful'
    });
    
  } catch (error) {
    console.error('Image upload error:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to process image upload',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
