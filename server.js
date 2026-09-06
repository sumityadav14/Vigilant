/* ==========================================
   VIGILANT - NODE.JS / EXPRESS REST API SERVER
   Backend Blueprint Entrypoint
   ========================================== */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simulated DB / Service Layer Handlers
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  res.json({
    success: true,
    user: {
      id: role === 'authority' ? 'USR-AUTH-99' : 'USR-CIT-01',
      name: role === 'authority' ? 'Insp. R. K. Sharma' : 'Sumit Yadav',
      email,
      role: role || 'citizen'
    },
    token: 'jwt_simulated_token_vigilant_2026'
  });
});

app.get('/api/vehicles', (req, res) => {
  res.json({ success: true, count: 2, data: [] });
});

app.post('/api/vehicles', (req, res) => {
  res.status(201).json({ success: true, message: 'Vehicle registered successfully' });
});

app.get('/api/challans', (req, res) => {
  res.json({ success: true, data: [] });
});

app.post('/api/challans/:id/review', (req, res) => {
  res.json({
    success: true,
    reviewId: 'REV-2026-9901',
    status: 'UNDER REVIEW',
    message: 'Dispute request logged for officer verification'
  });
});

app.post('/api/stolen/report', (req, res) => {
  res.json({
    success: true,
    referenceId: 'SV-2026-0012',
    status: 'Submitted',
    message: 'Stolen vehicle alert broadcast to camera network'
  });
});

app.post('/api/stolen/search', (req, res) => {
  res.json({
    success: true,
    status: 'possible_match',
    similarity: 0.94,
    camera: 'CAM-07',
    requiresHumanVerification: true
  });
});

app.post('/api/vehicle-reid', (req, res) => {
  res.json({
    success: true,
    vehicleId: 'VH-1029',
    similarity: 0.94,
    matchedCameras: ['CAM-01', 'CAM-03', 'CAM-07', 'CAM-11']
  });
});

app.get('/api/cameras', (req, res) => {
  res.json({ success: true, activeCount: 21, data: [] });
});

app.get('/api/violations', (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/analytics', (req, res) => {
  res.json({ success: true, stats: { totalDetections: 12450, totalViolations: 823 } });
});

app.listen(PORT, () => {
  console.log(`[VIGILANT API] Express REST server running on port ${PORT}`);
});
