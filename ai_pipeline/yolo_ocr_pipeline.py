"""
VIGILANT - YOLOv8 Object Detection & Optical Character Recognition (OCR) AI Pipeline
Detects Vehicles, License Plate Bounding Boxes, Helmet Infractions, and Extracts License Plate Text
"""

import os
import json
import re

class YoloOcrPipeline:
    def __init__(self):
        self.supported_violations = ["RED_LIGHT_JUMP", "NO_HELMET", "SPEEDING", "NO_SEATBELT"]

    def process_frame(self, image_path_or_name):
        """
        Simulates YOLOv8 Inference & OCR License Plate Text Extraction
        """
        print(f"[YOLOv8] Running Object Detection on frame: {image_path_or_name}")
        
        # Bounding box coordinates: [x_min, y_min, x_max, y_max, class, confidence]
        detections = [
            {
                "class": "vehicle",
                "label": "Hyundai Creta",
                "bbox": [120, 180, 480, 390],
                "confidence": 0.96
            },
            {
                "class": "license_plate",
                "label": "License Plate",
                "bbox": [260, 310, 390, 350],
                "confidence": 0.98,
                "ocr": {
                    "raw_text": "DL 01 AB 1234",
                    "cleaned_plate": "DL01AB1234",
                    "ocr_confidence": 0.984,
                    "matched_owner": "Sumit Yadav",
                    "vehicle_model": "Hyundai Creta (2023)"
                }
            },
            {
                "class": "violation",
                "label": "Red Light Stop-Line Breach",
                "bbox": [100, 150, 520, 410],
                "confidence": 0.94
            }
        ]

        result = {
            "status": "SUCCESS",
            "frame_id": os.path.basename(image_path_or_name),
            "inference_time_ms": 18.4,
            "yolo_version": "YOLOv8x-traffic",
            "ocr_engine": "EasyOCR / Tesseract 5.0",
            "detections_count": len(detections),
            "ocr_extracted_plate": "DL 01 AB 1234",
            "detections": detections
        }

        return result

if __name__ == "__main__":
    pipeline = YoloOcrPipeline()
    res = pipeline.process_frame("sample_camera_feed.jpg")
    print(json.dumps(res, indent=2))
