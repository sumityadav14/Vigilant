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

    // Dynamic mathematical recalculation of CV metrics
    const precision = Math.min(99.6, Math.max(82.0, 90.0 + (threshold - 0.5) * 19.5));
    const recall = Math.min(98.8, Math.max(72.0, 98.0 - (threshold - 0.5) * 36.0));
    const mAP = Math.min(96.2, Math.max(84.0, 92.5 + (0.3 - Math.abs(threshold - 0.80)) * 6.5));
    const latency = Math.max(13.8, (14.2 + (1 - threshold) * 4.6));

    const pEl = document.getElementById("sim-kpi-precision");
    const rEl = document.getElementById("sim-kpi-recall");
    const mEl = document.getElementById("sim-kpi-map");
    const lEl = document.getElementById("sim-kpi-latency");

    if (pEl) pEl.textContent = `${precision.toFixed(1)}%`;
    if (rEl) rEl.textContent = `${recall.toFixed(1)}%`;
    if (mEl) mEl.textContent = `${mAP.toFixed(1)}%`;
    if (lEl) lEl.textContent = `${latency.toFixed(1)} ms`;

    // Dynamic Cosine Similarity update
    const cosEl = document.getElementById("sim-cosine-match-score");
    if (cosEl) {
      const dynamicCos = (0.9720 + (threshold * 0.015)).toFixed(4);
      cosEl.textContent = `Cosine Similarity: ${dynamicCos} (${threshold >= 0.75 ? 'High Confidence Match' : 'Corridor Sighting'})`;
    }
  }
};

window.AISimEngine = AISimEngine;
