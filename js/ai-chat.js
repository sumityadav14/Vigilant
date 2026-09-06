/* ==========================================
   VIGILANT - ENHANCED AI CHATBOT ENGINE
   Comprehensive Knowledge Base & Natural Language Intent Classifier
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  injectChatbotWidget();
});

function injectChatbotWidget() {
  if (document.getElementById("ai-chat-bubble-btn")) return;

  // Create Chat Floating Button
  const bubbleBtn = document.createElement("button");
  bubbleBtn.id = "ai-chat-bubble-btn";
  bubbleBtn.innerHTML = '<i class="lucide-bot"></i>';
  bubbleBtn.onclick = toggleAiChatWindow;

  // Create Chat Window
  const chatWindow = document.createElement("div");
  chatWindow.id = "ai-chat-window";
  chatWindow.innerHTML = `
    <div class="ai-chat-header">
      <div class="ai-chat-title">
        <div class="ai-avatar-icon"><i class="lucide-bot"></i></div>
        <div>
          <strong style="font-size:0.95rem; color:#FFF; display:block;">VIGILANT AI Assistant</strong>
          <span style="font-size:0.7rem; color:var(--success);">● Trained Knowledge Base Online</span>
        </div>
      </div>
      <button onclick="toggleAiChatWindow()" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:1.2rem;">&times;</button>
    </div>

    <div id="ai-chat-messages-list" class="ai-chat-messages">
      <div class="chat-msg chat-msg-ai">
        Hello! 👋 I am your VIGILANT AI Assistant. I am trained on Motor Vehicle Laws (MV Act 2019), traffic penalties, document expiries, challan disputes, stolen vehicle tracking, and camera telemetry. Ask me any question!
      </div>
    </div>

    <div class="chat-suggestions">
      <button class="chat-chip" onclick="sendQuickQuery('Check Creta PUC Expiry')">Creta PUC Expiry</button>
      <button class="chat-chip" onclick="sendQuickQuery('Red Light Fine')">Red Light Fine</button>
      <button class="chat-chip" onclick="sendQuickQuery('Drunk Driving Fine')">Drunk Driving</button>
      <button class="chat-chip" onclick="sendQuickQuery('How to dispute a challan?')">Dispute Challan</button>
      <button class="chat-chip" onclick="sendQuickQuery('No Insurance Penalty')">Insurance Fine</button>
      <button class="chat-chip" onclick="sendQuickQuery('Blocking Ambulance Fine')">Ambulance Fine</button>
    </div>

    <form class="ai-chat-input-row" onsubmit="handleAiChatSubmit(event)">
      <input type="text" id="ai-chat-input-field" class="form-control" placeholder="Ask any traffic law or vehicle question..." required>
      <button type="submit" class="btn btn-primary btn-sm" style="border-radius:50%; width:38px; height:38px; padding:0;">
        <i class="lucide-send" style="font-size:0.9rem;"></i>
      </button>
    </form>
  `;

  document.body.appendChild(bubbleBtn);
  document.body.appendChild(chatWindow);

  if (window.lucide) window.lucide.createIcons();
}

function toggleAiChatWindow() {
  const win = document.getElementById("ai-chat-window");
  if (win) win.classList.toggle("active");
}

function sendQuickQuery(queryText) {
  const input = document.getElementById("ai-chat-input-field");
  if (input) {
    input.value = queryText;
    handleAiChatSubmit(new Event("submit"));
  }
}

function handleAiChatSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("ai-chat-input-field");
  const msgList = document.getElementById("ai-chat-messages-list");
  if (!input || !msgList) return;

  const query = input.value.trim();
  if (!query) return;

  // Render User Message
  const userMsg = document.createElement("div");
  userMsg.className = "chat-msg chat-msg-user";
  userMsg.textContent = query;
  msgList.appendChild(userMsg);

  input.value = "";
  msgList.scrollTop = msgList.scrollHeight;

  // Render Typing Indicator
  const typingMsg = document.createElement("div");
  typingMsg.className = "chat-msg chat-msg-ai";
  typingMsg.id = "ai-typing-indicator";
  typingMsg.innerHTML = '<span style="font-style:italic; color:var(--text-muted);">AI Assistant analyzing question...</span>';
  msgList.appendChild(typingMsg);
  msgList.scrollTop = msgList.scrollHeight;

  // Process Intent with Full Knowledge Base
  setTimeout(() => {
    const indicator = document.getElementById("ai-typing-indicator");
    if (indicator) indicator.remove();

    const responseText = processComprehensiveAiIntent(query);
    const aiMsg = document.createElement("div");
    aiMsg.className = "chat-msg chat-msg-ai";
    aiMsg.innerHTML = responseText;
    msgList.appendChild(aiMsg);
    msgList.scrollTop = msgList.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  }, 500);
}

/* Comprehensive Intent Engine for All Traffic, Vehicle & Legal Questions */
function processComprehensiveAiIntent(query) {
  const q = query.toLowerCase();

  // 1. GREETINGS & INTRODUCTIONS
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("who are you")) {
    return `👋 Hello! I am your <strong>VIGILANT AI Assistant</strong>. I can answer questions about:<br>
      • Traffic Penalties & Fines under Motor Vehicle Act 2019<br>
      • Your Vehicle RC, Insurance & PUC Expiry Dates<br>
      • Challan Evidence Inspection & Dispute Reviews<br>
      • Hypothecation (HPA) Removal & Form 35<br>
      • Emergency Stolen Vehicle Reporting<br>
      • Police Command Center Live Camera Telemetry`;
  }

  // 2. SPECIFIC VEHICLE DOCUMENT EXPIRIES (CRETA / NEXON)
  if (q.includes("creta") && (q.includes("puc") || q.includes("pollut") || q.includes("expire"))) {
    return `📄 <strong>Hyundai Creta (DL 01 AB 1234) PUC Status:</strong><br>Your PUC Certificate <code>PUC-DL-2026-991</code> expires on <strong>02 Sep 2026</strong> (7 days remaining). Renew it in your <a href="../citizen/document-vault.html" style="color:var(--accent-cyan)">Document Vault</a> to avoid a ₹10,000 fine.`;
  }

  if (q.includes("creta") && (q.includes("insurance") || q.includes("policy"))) {
    return `🛡️ <strong>Hyundai Creta (DL 01 AB 1234) Insurance:</strong><br>Insurer: HDFC ERGO General Insurance<br>Policy No: <code>INS-HYU-887192</code><br>Expiry Date: <strong>31 Dec 2026</strong> (Valid & Active).`;
  }

  if (q.includes("nexon") && (q.includes("puc") || q.includes("ev"))) {
    return `⚡ <strong>Tata Nexon EV (DL 04 CD 5678):</strong><br>As a Zero-Emission Electric Vehicle (EV), this car is <strong>Exempt from PUC Certificate requirements</strong>.`;
  }

  if (q.includes("nexon") && (q.includes("insurance") || q.includes("policy"))) {
    return `🛡️ <strong>Tata Nexon EV (DL 04 CD 5678) Insurance:</strong><br>Insurer: TATA AIG Motor Insurance<br>Policy No: <code>INS-TAT-998124</code><br>Expiry Date: <strong>15 Jan 2027</strong> (Valid).`;
  }

  if (q.includes("rc") || q.includes("registration certificate")) {
    return `📋 <strong>Registration Certificate (RC) Status:</strong><br>
      • <strong>DL 01 AB 1234 (Hyundai Creta):</strong> Valid until 12 May 2038 (RTO Delhi North)<br>
      • <strong>DL 04 CD 5678 (Tata Nexon EV):</strong> Valid until 24 Aug 2039 (RTO Delhi West)`;
  }

  // 3. TRAFFIC FINES & PENALTIES (MV AMENDMENT ACT 2019)
  if (q.includes("red light") || q.includes("signal")) {
    return `🚨 <strong>Red Light Jumping Fine:</strong><br>Under Section 184 of MV Act 2019, jumping a traffic signal results in a fine of <strong>₹1,000</strong>. Repeat offenses incur up to ₹5,000 fine and/or 1-year imprisonment.`;
  }

  if (q.includes("helmet")) {
    return `🪖 <strong>Driving Without Helmet Fine:</strong><br>Under Section 194D of MV Act, riding a two-wheeler without a helmet carries a fine of <strong>₹1,000</strong> plus 3-month driver license disqualification.`;
  }

  if (q.includes("speed") || q.includes("fast")) {
    return `⚡ <strong>Over-Speeding Penalty:</strong><br>Under Section 183 of MV Act, over-speeding carries:<br>• <strong>₹1,000 to ₹2,000</strong> for Light Motor Vehicles (LMVs)<br>• <strong>₹2,000 to ₹4,000</strong> for Medium/Heavy Commercial Vehicles.`;
  }

  if (q.includes("seatbelt") || q.includes("seat belt")) {
    return `🚘 <strong>Driving Without Seatbelt Fine:</strong><br>Under Section 194B of MV Act, driving or riding without wearing a seatbelt carries a penalty of <strong>₹1,000</strong>.`;
  }

  if (q.includes("drunk") || q.includes("alcohol") || q.includes("drink")) {
    return `🍷 <strong>Drunk Driving (DUI) Penalty:</strong><br>Under Section 185 of MV Act:<br>• <strong>1st Offense:</strong> Up to <strong>₹10,000 fine</strong> and/or up to 6 months imprisonment.<br>• <strong>2nd Offense:</strong> Up to <strong>₹15,000 fine</strong> and/or up to 2 years imprisonment.`;
  }

  if (q.includes("license") || q.includes("licence") || q.includes("without license")) {
    return `🪪 <strong>Driving Without License Fine:</strong><br>Under Section 181 of MV Act, driving a vehicle without a valid driving license carries a fine of <strong>₹5,000</strong>.`;
  }

  if (q.includes("no insurance") || q.includes("without insurance")) {
    return `🛡️ <strong>Driving Without Insurance Penalty:</strong><br>Under Section 196 of MV Act:<br>• <strong>1st Offense:</strong> <strong>₹2,000 fine</strong> and/or up to 3 months imprisonment.<br>• <strong>2nd Offense:</strong> <strong>₹4,000 fine</strong>.`;
  }

  if (q.includes("no puc") || q.includes("puc fine") || q.includes("puc penalty")) {
    return `💨 <strong>Driving Without Valid PUC Penalty:</strong><br>Under Section 190(2) of MV Act, operating a vehicle without a valid Pollution Under Control certificate carries a fine of up to <strong>₹10,000</strong>.`;
  }

  if (q.includes("mobile") || q.includes("phone") || q.includes("calling")) {
    return `📱 <strong>Using Mobile Phone While Driving:</strong><br>Under Section 184(c) of MV Act, using a handheld mobile phone while driving incurs a fine of <strong>₹1,000 to ₹5,000</strong>.`;
  }

  if (q.includes("ambulance") || q.includes("emergency vehicle")) {
    return `🚑 <strong>Blocking Emergency Vehicles:</strong><br>Under Section 194E of MV Act, failing to allow free passage to emergency vehicles (Ambulance, Fire Brigade) carries a heavy penalty of <strong>₹10,000</strong> and/or 6 months imprisonment.`;
  }

  if (q.includes("parking") || q.includes("tow")) {
    return `🅿️ <strong>Illegal Parking Penalty:</strong><br>Parking in a non-designated area incurs a fine of <strong>₹500 to ₹1,500</strong> plus towing charges.`;
  }

  if (q.includes("wrong side") || q.includes("dangerous")) {
    return `⚠️ <strong>Wrong-Side / Dangerous Driving Fine:</strong><br>Under Section 184 of MV Act, driving dangerously or against the traffic flow carries a penalty of <strong>₹5,000</strong>.`;
  }

  // 4. CHALLANS & DISPUTE WORKFLOW
  if (q.includes("dispute") || q.includes("review") || q.includes("wrong challan") || q.includes("appeal")) {
    return `⚖️ <strong>How to Dispute a Traffic Challan:</strong><br>
      1. Go to <a href="../citizen/challan-list.html" style="color:var(--accent-cyan)">Challans List</a>.<br>
      2. Click <strong>Inspect Evidence</strong> to view the captured AI photo frame & confidence score.<br>
      3. Click <strong>Request Dispute Review</strong>, select your reason (e.g. Evidence Issue, Wrong Vehicle), and upload proof.<br>
      4. Once submitted, status changes to <code>UNDER REVIEW</code>, pausing fine penalties while a police officer verifies your evidence.`;
  }

  if (q.includes("pay") || q.includes("payment")) {
    return `💳 <strong>Pay Challan Online:</strong><br>You can pay your pending challan using Credit/Debit Card, Net Banking, or UPI on the <a href="../citizen/challan-list.html" style="color:var(--accent-cyan)">Challans Management Page</a>.`;
  }

  // 5. HYPOTHECATION & LOAN REMOVAL (HPA)
  if (q.includes("hypothecation") || q.includes("hpa") || q.includes("loan") || q.includes("form 35")) {
    return `🏦 <strong>Hypothecation (HPA) Endorsement Removal:</strong><br>
      When your car loan is fully paid off:<br>
      1. Obtain the Bank No Objection Certificate (NOC).<br>
      2. Download RTO <strong>Form 35</strong>.<br>
      3. Track the guided 5-step removal process on the <a href="../citizen/hypothecation-assistant.html" style="color:var(--accent-cyan)">Hypothecation Assistant Page</a>.`;
  }

  // 6. EMERGENCY STOLEN VEHICLE NETWORK
  if (q.includes("stolen") || q.includes("theft") || q.includes("stole") || q.includes("fir")) {
    return `🚨 <strong>Emergency Stolen Vehicle Reporting:</strong><br>
      If your car is stolen, file an emergency report at <a href="../citizen/stolen-report.html" style="color:var(--danger)">Stolen Vehicle Reporting</a>.<br>
      Enter your vehicle plate & police FIR number. The platform immediately injects your vehicle's visual features into 24 smart city cameras for automated visual match tracking!`;
  }

  // 7. AUTHORITY COMMAND CENTER & AI TELEMETRY
  if (q.includes("camera") || q.includes("cctv") || q.includes("telemetry") || q.includes("fps")) {
    return `📹 <strong>Smart City CCTV Telemetry:</strong><br>
      • Active Camera Nodes: <strong>21 / 24 LIVE</strong><br>
      • Stream Throughput: <strong>30 FPS</strong><br>
      • Today's Vehicle Detections: <strong>12,450</strong><br>
      • Today's AI Violations Logged: <strong>823</strong>`;
  }

  if (q.includes("reid") || q.includes("re-identification") || q.includes("feature vector") || q.includes("yolo")) {
    return `👁️ <strong>AI Vehicle Re-ID Architecture:</strong><br>
      • <strong>Object Detection:</strong> YOLOv8 model fine-tuned for traffic violations.<br>
      • <strong>Re-ID Feature Extractor:</strong> ResNet-50 deep neural network outputting 512D visual feature vectors.<br>
      • <strong>Similarity Metric:</strong> Cosine Distance ($cos(\\theta) = 0.9642$) matching vehicle body geometry & color across cameras even with hidden plates.`;
  }

  if (q.includes("map") || q.includes("tracking") || q.includes("route")) {
    return `🗺️ <strong>Multi-Camera Route Tracking:</strong><br>
      Using <strong>Leaflet.js Spatial GIS Mapping</strong>, the system plots camera markers where a vehicle was detected and reconstructs its movement route vector over time. View it on <a href="../authority/tracking.html" style="color:var(--accent-cyan)">Multi-Cam Tracking Map</a>.`;
  }

  // 8. INTELLIGENT COMPREHENSIVE FALLBACK
  return `🤖 I am trained on VIGILANT platform operations & Motor Vehicle Laws.<br><br>
    <strong>You can ask me about:</strong><br>
    • <em>"When does Creta PUC expire?"</em><br>
    • <em>"What is the fine for Red Light violation?"</em><br>
    • <em>"Drunk Driving Penalty"</em><br>
    • <em>"How to dispute a challan?"</em><br>
    • <em>"Report Stolen Vehicle"</em><br>
    • <em>"How does AI Vehicle Re-ID work?"</em>`;
}
