import express from 'express';
import Diagnosis from '../models/diagnosis.js';

const router = express.Router();

// POST /diagnose - Create new diagnosis
router.post('/', async (req, res) => {
  try {
    console.log('Received diagnosis request:', req.body);
    
    const { 
      voiceInput, 
      imageResult, 
      combinedResult, 
      language = 'en' 
    } = req.body;
    
    // Validation
    if (!combinedResult) {
      return res.status(400).json({
        success: false,
        error: 'Combined result is required',
        requiredFields: ['combinedResult']
      });
    }
    
    // Create new diagnosis
    const diagnosis = new Diagnosis({
      voiceInput: voiceInput || null,
      imageResult: imageResult || null,
      combinedResult,
      language,
      createdAt: new Date()
    });
    
    const savedDiagnosis = await diagnosis.save();
    console.log('Diagnosis saved:', savedDiagnosis._id);
    
    res.status(201).json({
      success: true,
      data: savedDiagnosis,
      message: 'Diagnosis created successfully'
    });
    
  } catch (error) {
    console.error(' Diagnosis creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create diagnosis',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /diagnose - Get all diagnoses
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, language } = req.query;
    
    const query = language ? { language } : {};
    const skip = (page - 1) * limit;
    
    const diagnoses = await Diagnosis.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Diagnosis.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        diagnoses,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count: diagnoses.length,
          totalRecords: total
        }
      },
      message: 'Diagnoses retrieved successfully'
    });
    
  } catch (error) {
    console.error('Get diagnoses error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve diagnoses',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /diagnose/:id - Get specific diagnosis
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid diagnosis ID format'
      });
    }
    
    const diagnosis = await Diagnosis.findById(id);
    
    if (!diagnosis) {
      return res.status(404).json({
        success: false,
        error: 'Diagnosis not found'
      });
    }
    
    res.json({
      success: true,
      data: diagnosis,
      message: 'Diagnosis retrieved successfully'
    });
    
  } catch (error) {
    console.error(' Get diagnosis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve diagnosis',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
