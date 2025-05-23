import express from 'express';
import Diagnosis from '../models/diagnosis.js';

const router = express.Router();

// POST /output/localize
router.post('/localize', async (req, res) => {
  try {
    console.log('Received localization request:', req.body);
    
    const { diagnosisId, targetLanguage = 'tw' } = req.body;
    
    if (!diagnosisId) {
      return res.status(400).json({
        success: false,
        error: 'Diagnosis ID is required'
      });
    }
    
    // Validate MongoDB ObjectId format
    if (!diagnosisId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid diagnosis ID format'
      });
    }
    
    const diagnosis = await Diagnosis.findById(diagnosisId);
    
    if (!diagnosis) {
      return res.status(404).json({
        success: false,
        error: 'Diagnosis not found'
      });
    }
    
    // TODO: Integrate with Ghana NLP Translation and TTS APIs
    const localizedText = `[${targetLanguage.toUpperCase()}] ${diagnosis.combinedResult}`;
    const audioURL = `http://localhost:5000/audio/diagnosis-${diagnosisId}.mp3`;
    
    // Update diagnosis
    diagnosis.localizedText = localizedText;
    diagnosis.audioURL = audioURL;
    diagnosis.language = targetLanguage;
    await diagnosis.save();
    
    res.json({
      success: true,
      data: {
        diagnosisId,
        localizedText,
        audioURL,
        targetLanguage
      },
      message: 'Localization completed successfully'
    });
    
  } catch (error) {
    console.error('Localization error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to localize diagnosis',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /output/languages
router.get('/languages', (req, res) => {
  res.json({
    success: true,
    data: {
      supportedLanguages: {
        'en': 'English',
        'tw': 'Twi',
        'ak': 'Akan',
        'ee': 'Ewe'
      }
    },
    message: 'Supported languages retrieved successfully'
  });
});

export default router;
