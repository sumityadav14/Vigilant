/* ==========================================
   VIGILANT - AI MODEL SIMULATION ENGINE
   Simulates YOLOv8 Object Detection & Feature Embedding Math
   ========================================== */

const AISimEngine = {
  // Current Detection Confidence Threshold (0.50 to 0.98)
  confidenceThreshold: 0.85,

  // Calculate Cosine Similarity between two feature vectors: cos(θ) = (A · B) / (||A|| ||B||)
  calculateCosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) return 0;
    return (dotProduct / (normA * normB)).toFixed(4);
  },

  // Dynamic Bounding Box Filtering based on Threshold Slider
  filterDetections(threshold) {
    this.confidenceThreshold = threshold;
    const items = document.querySelectorAll(".sim-bbox-item");
    let visibleCount = 0;

    items.forEach(item => {
      const conf = Number(item.dataset.conf);
      if (conf >= threshold) {
        item.style.display = "block";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    const activeBadge = document.getElementById("active-detections-count");
    if (activeBadge) {
      activeBadge.textContent = `${visibleCount} Detected Boxes Active`;
    }
  }
};

window.AISimEngine = AISimEngine;
