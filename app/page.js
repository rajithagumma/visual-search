"use client";
import { useState } from "react";
import IntroductionPage from "./introductionPage";
import Calibration from "./Calibration.js";
import ParticipantInf from "./ParticipantInf"; // ✅ default export
import StartPractice from "./StartPractice.js";
import GameContainer from "./gameContainer";
import Practice from "./Practice.js";
import StartTest from "./StartTest.js";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      {/* <Calibration />
      <ParticipantInf />
      <StartPractice />
      <Practice />
      <StartTest /> */}
      <>
        {currentStep === 1 && (
          <IntroductionPage onDone={() => setCurrentStep(2)} />
        )}

        {currentStep === 2 && <Calibration onDone={() => setCurrentStep(3)} />}

        {currentStep === 3 && <GameContainer />}
      </>
    </>
  );
}
