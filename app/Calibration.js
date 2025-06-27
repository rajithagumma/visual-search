"use client";
import React, { useState, useEffect } from "react";

function Calibration() {
  const [lineWidth, setLineWidth] = useState(300);
  const minWidth = 0;
  const maxWidth = 600;

  useEffect(() => {
    const savedWidth = localStorage.getItem("lineWidth");
    if (savedWidth) {
      setLineWidth(parseInt(savedWidth));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lineWidth", lineWidth);

    const remSize = 12 + ((lineWidth - minWidth) / (maxWidth - minWidth)) * (32 - 12);
    document.documentElement.style.fontSize = `${remSize}px`;

    localStorage.setItem("remSize", remSize);
  }, [lineWidth]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setLineWidth((prev) => Math.min(prev + 5, maxWidth));
      } else if (e.key === "ArrowLeft") {
        setLineWidth((prev) => Math.max(prev - 5, minWidth));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="calibration-container">
      <h2>Calibration</h2>

      <p className="description">
        Use your <strong>left/right arrow keys</strong> to adjust the line’s length and see the font size change.
      </p>

      <div className="calibration-line" style={{ width: `${lineWidth}px` }}></div>

      <div className="value-display">Line Length: {lineWidth}px</div>

      <p className="text">This is 1.2rem text</p>

      <button className="ok-btn">OK</button>
    </div>
  );
}

export default Calibration;









// "use client";
// import React, { useState, useEffect } from "react";

// function Calibration() {
//   const [remSize, setRemSize] = useState(16);

//   useEffect(() => {
//     const savedSize = localStorage.getItem("remSize");
//     if (savedSize) {
//       setRemSize(parseInt(savedSize));
//     }
//   }, []);

//   useEffect(() => {
//     document.documentElement.style.fontSize = `${remSize}px`;
//     localStorage.setItem("remSize", remSize);
//   }, [remSize]);

//   const handleSliderChange = (e) => {
//     setRemSize(e.target.value);
//   };

//   return (
//     <div className="Calibration-div">
//       <h1>Dynamic rem Size Controller</h1>

//       <div className="control">
//         <label htmlFor="remSlider">Base rem size: {remSize}px</label>
//         <input
//           type="range"
//           id="remSlider"
//           min="10"
//           max="30"
//           value={remSize}
//           onChange={handleSliderChange}
//         />
//       </div>

//       <div className="box">This box is 10rem × 10rem</div>
//       <p className="text">This text is 1.2rem</p>

//       <button className="calibration-btn">OK</button>
//     </div>
//   );
// }

// export default Calibration;
