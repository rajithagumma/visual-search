"use client";
import React, { useState, useEffect } from "react";

function Calibration({onDone}) {
  const [remSize, setRemSize] = useState(16); // default 16px

  // load from localStorage
  useEffect(() => {
    const savedSize = localStorage.getItem("remSize");
    if (savedSize) {
      setRemSize(parseInt(savedSize));
    }
  }, []);

  // update font-size on change
  useEffect(() => {
    document.documentElement.style.fontSize = `${remSize}px`;
    localStorage.setItem("remSize", remSize);
  }, [remSize]);
ndnndnndnnnn n  // arrow key events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setRemSize((prev) => Math.min(prev + 1, 32)); // max 32px
      } else if (e.key === "ArrowLeft") {
        setRemSize((prev) => Math.max(prev - 1, 12)); // min 12px
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="calibration-container">
      <div className="intro-instruction-div">
      <h1>Before starting:</h1>
      <ol>
        <li>
          Set your browsing window to Full Screen (you can do this by pressing
          F11 on Windows and Linux or the key combination CTRL+CMD+F on a Mac;
          if that does not work, in Chrome you can go to the View menu and click
          Enter Full Screen).
        </li>
        <li>
          Minimize possible distractions (TV, phone, etc.) that may affect your
          performance during the test.
        </li>
        <li>
          Position yourself at arm's length from the monitor and try to maintain
          this viewing distance throughout the experiment.
        </li>
      </ol>
      <button className="ok-btn" onClick={onDone}>
        Done
      </button>
    </div>

      <p className="description">
        Use your <strong>left/right arrow keys</strong> to adjust font size.
      </p>

      <div
        className="calibration-line"
        style={{ width: `${(remSize - 12) * 20}px` }}
      ></div>

      <div className="value-display">Font Size: {remSize}px</div>

      <p className="text">This is 1.2rem text</p>

      <button className="ok-btn" onClick={onDone}>OK</button>
    </div>
  );
}

export default Calibration;















