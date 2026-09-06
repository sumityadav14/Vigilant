-- ==========================================
-- VIGILANT - RELATIONAL DATABASE SCHEMA
-- Compatible with PostgreSQL & MySQL
-- ==========================================

-- 1. Users Table
CREATE TABLE users (
  user_id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) NOT NULL DEFAULT 'citizen', -- 'citizen' or 'authority'
  badge_number VARCHAR(50),
  department VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Vehicles Table
CREATE TABLE vehicles (
  vehicle_id VARCHAR(36) PRIMARY KEY,
  owner_id VARCHAR(36) NOT NULL,
  registration_number VARCHAR(20) UNIQUE NOT NULL,
  vehicle_type VARCHAR(30) NOT NULL, -- SUV, Sedan, EV, Two-Wheeler
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  color VARCHAR(30) NOT NULL,
  year INT NOT NULL,
  chassis_number VARCHAR(50) UNIQUE,
  engine_number VARCHAR(50) UNIQUE,
  status VARCHAR(20) DEFAULT 'Verified',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 3. RC Records Table
CREATE TABLE rc_records (
  rc_id VARCHAR(36) PRIMARY KEY,
  vehicle_id VARCHAR(36) NOT NULL,
  registration_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  rto_authority VARCHAR(100) NOT NULL,
  rc_status VARCHAR(20) DEFAULT 'Valid',
  digital_smart_card_url VARCHAR(255),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- 4. Insurance Table
CREATE TABLE insurance (
  insurance_id VARCHAR(36) PRIMARY KEY,
  vehicle_id VARCHAR(36) NOT NULL,
  policy_number VARCHAR(50) UNIQUE NOT NULL,
  insurer_name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  coverage_type VARCHAR(50) DEFAULT 'Comprehensive',
  status VARCHAR(20) DEFAULT 'Valid',
  policy_document_url VARCHAR(255),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- 5. PUC Table
CREATE TABLE puc (
  puc_id VARCHAR(36) PRIMARY KEY,
  vehicle_id VARCHAR(36) NOT NULL,
  certificate_number VARCHAR(50) UNIQUE NOT NULL,
  tested_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  emission_level VARCHAR(20) DEFAULT 'Pass',
  status VARCHAR(20) DEFAULT 'Valid',
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- 6. Vehicle Documents Table
CREATE TABLE vehicle_documents (
  document_id VARCHAR(36) PRIMARY KEY,
  vehicle_id VARCHAR(36) NOT NULL,
  document_type VARCHAR(30) NOT NULL, -- 'RC', 'INSURANCE', 'PUC', 'HPA_NOC'
  file_url VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- 7. Camera Locations Table
CREATE TABLE camera_locations (
  camera_id VARCHAR(36) PRIMARY KEY,
  camera_code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  location_address VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  status VARCHAR(20) DEFAULT 'LIVE',
  fps INT DEFAULT 30
);

-- 8. Challans Table
CREATE TABLE challans (
  challan_id VARCHAR(36) PRIMARY KEY,
  vehicle_id VARCHAR(36) NOT NULL,
  camera_id VARCHAR(36) NOT NULL,
  violation_type VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  violation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'Under Review', 'Paid', 'Resolved'
  description TEXT,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
  FOREIGN KEY (camera_id) REFERENCES camera_locations(camera_id)
);

-- 9. Challan Evidence Table
CREATE TABLE challan_evidence (
  evidence_id VARCHAR(36) PRIMARY KEY,
  challan_id VARCHAR(36) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  ai_confidence_score DECIMAL(5, 4) NOT NULL, -- e.g. 0.9600
  bounding_box_json TEXT,
  captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (challan_id) REFERENCES challans(challan_id) ON DELETE CASCADE
);

-- 10. Challan Reviews Table (Disputes)
CREATE TABLE challan_reviews (
  review_id VARCHAR(36) PRIMARY KEY,
  challan_id VARCHAR(36) NOT NULL,
  citizen_id VARCHAR(36) NOT NULL,
  reason_category VARCHAR(50) NOT NULL,
  explanation TEXT NOT NULL,
  evidence_attachment_url VARCHAR(255),
  status VARCHAR(20) DEFAULT 'UNDER REVIEW',
  assigned_officer_id VARCHAR(36),
  decision_notes TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  FOREIGN KEY (challan_id) REFERENCES challans(challan_id) ON DELETE CASCADE,
  FOREIGN KEY (citizen_id) REFERENCES users(user_id)
);

-- 11. Stolen Vehicle Reports Table
CREATE TABLE stolen_vehicle_reports (
  report_id VARCHAR(36) PRIMARY KEY,
  vehicle_id VARCHAR(36) NOT NULL,
  reporter_id VARCHAR(36) NOT NULL,
  incident_date_time TIMESTAMP NOT NULL,
  last_known_location VARCHAR(255) NOT NULL,
  fir_number VARCHAR(50) NOT NULL,
  description TEXT,
  fir_document_url VARCHAR(255),
  status VARCHAR(20) DEFAULT 'Submitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
  FOREIGN KEY (reporter_id) REFERENCES users(user_id)
);

-- 12. Vehicle Detections Table
CREATE TABLE vehicle_detections (
  detection_id VARCHAR(36) PRIMARY KEY,
  camera_id VARCHAR(36) NOT NULL,
  detected_plate VARCHAR(20),
  confidence_score DECIMAL(5, 4) NOT NULL,
  snapshot_url VARCHAR(255),
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (camera_id) REFERENCES camera_locations(camera_id)
);

-- 13. Vehicle Reidentification Table
CREATE TABLE vehicle_reidentification (
  reid_id VARCHAR(36) PRIMARY KEY,
  target_vehicle_id VARCHAR(36) NOT NULL,
  matched_camera_id VARCHAR(36) NOT NULL,
  similarity_score DECIMAL(5, 4) NOT NULL, -- e.g. 0.9400
  feature_vector_hash VARCHAR(255),
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (target_vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
  FOREIGN KEY (matched_camera_id) REFERENCES camera_locations(camera_id)
);

-- 14. Vehicle Tracking Table
CREATE TABLE vehicle_tracking (
  tracking_id VARCHAR(36) PRIMARY KEY,
  vehicle_id VARCHAR(36) NOT NULL,
  camera_id VARCHAR(36) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  speed_kmh DECIMAL(5, 2),
  trajectory_sequence INT,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
  FOREIGN KEY (camera_id) REFERENCES camera_locations(camera_id)
);

-- 15. Hypothecation Records Table
CREATE TABLE hypothecation_records (
  hypo_id VARCHAR(36) PRIMARY KEY,
  vehicle_id VARCHAR(36) NOT NULL,
  financier_name VARCHAR(100) NOT NULL,
  loan_account_number VARCHAR(50) NOT NULL,
  status VARCHAR(30) DEFAULT 'Loan Active',
  noc_issued_date DATE,
  form35_status VARCHAR(30) DEFAULT 'Draft',
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- 16. Notifications Table
CREATE TABLE notifications (
  notification_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  title VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 17. Audit Logs Table
CREATE TABLE audit_logs (
  log_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  action VARCHAR(100) NOT NULL,
  details TEXT,
  ip_address VARCHAR(45),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
