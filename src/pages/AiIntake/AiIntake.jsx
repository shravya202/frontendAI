import { useState } from "react";
import "./AiIntake.css";

export default function AiIntake() {
    const [prompt, setPrompt] = useState("");
    const [files, setFiles] = useState([]);
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            alert("Please enter your website requirement.");
            return;
        }

        try {
            const response = await fetch("https://backendai-129b.onrender.com/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt }),
});

            const data = await response.json();

            if (data.status === "success") {
                setGeneratedUrl(data.url);
            } else {
                alert("No matching website found");
            }
        } catch (error) {
            console.error(error);
            alert("Server not reachable");
        }
    };

    const handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className="ai-layout">

            {/* ===== SIDEBAR ===== */}
            <aside className={`ai-sidebar ${sidebarOpen ? "open" : "closed"}`}>
  {/* LOGO */}
  <div className="logo-circle">
    <span className="logo-rv">RV</span>
    <span className="logo-ai">AI</span>
  </div>

  {/* MAIN MENU */}
  <div className="sidebar-group">
    <div className="sidebar-item active">✏️ New chat</div>
    <div className="sidebar-item">🔍 Search chats</div>
    <div className="sidebar-item">✨ Your Year With RvaI</div>

    <div className="sidebar-item">
      🖼️ Images <span className="badge">NEW</span>
    </div>

    <div className="sidebar-item">🧩 Apps</div>
    <div className="sidebar-item">📁 Projects</div>
  </div>

  {/* GPTs */}
  <div className="sidebar-section-title">GPTs</div>
  <div className="sidebar-group">
    <div className="sidebar-item">🎨 Canva</div>
    <div className="sidebar-item">🧠 Explore GPTs</div>
  </div>

  {/* CHATS */}
  <div className="sidebar-section-title">Your chats</div>
  <div className="sidebar-group chats">
    <div className="sidebar-item muted">Hospital Website</div>
    <div className="sidebar-item muted">Real Estate UI</div>
    <div className="sidebar-item muted">Coaching Platform</div>
  </div>

  {/* USER */}
  <div className="sidebar-footer">
    <div className="user-avatar">SD</div>
    <span>Shravya Dandiga</span>
  </div>
</aside>


            {/* ===== MAIN ===== */}
            <div className="ai-main">

                {/* TOP BAR */}
                <header className="ai-topbar">
                    <button
                        className="sidebar-toggle"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        ☰
                    </button>
                    <span>AI Website Generator</span>
                </header>

                {/* OUTPUT (TOP) */}
                {generatedUrl && (
                    <div className="ai-output">
                        <iframe
                            src={generatedUrl}
                            title="Generated Website"
                            className="ai-preview-frame"
                        />
                    </div>
                )}

                {/* INPUT (CENTER → BOTTOM) */}
                <div className={`ai-input-container ${generatedUrl ? "bottom" : "center"}`}>
                    <div className="ai-input-box">

                        {files.length > 0 && (
                            <div className="file-chips">
                                {files.map((file, index) => (
                                    <div key={index} className="file-chip">
                                        📎 {file.name}
                                        <span onClick={() => removeFile(index)}>✕</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <textarea
                            className="ai-input"
                            placeholder="Describe the website you want to build..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        <div className="ai-input-actions">
                            <label className="icon-btn">
                                📎
                                <input type="file" multiple hidden onChange={handleFileUpload} />
                            </label>

                            <button className="start-btn" onClick={handleGenerate}>
                                Start
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
