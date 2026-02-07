import { useState } from "react";
import "./App.css";

import sad2 from "./assets/IMG_6443.jpeg";
import sad3 from "./assets/IMG_6632.jpeg";
import sad4 from "./assets/IMG_6962.jpeg";
import sad5 from "./assets/IMG_7209.jpeg";
import sad6 from "./assets/IMG_7564.jpeg";
import sad7 from "./assets/IMG_7566.jpeg";

import greeting from "./assets/greet.jpeg";
import happy from "./assets/happy.jpeg";
import bimbimatchi from "./assets/bimbimatchi.jpeg";

type Mode = "greeting" | "sad" | "happy";

type Reaction = { image: string; text: string };

const sadReactions: Reaction[] = [
  { image: sad2, text: "U made me sad uknowatmsayin" },
  { image: sad3, text: "Why you say no again punk" },
  { image: sad4, text: "I need my yes and I need it STAT" },
  { image: sad5, text: 'Have I ever said no when you said: "Hand pleaseee"' },
  { image: sad6, text: "Enough I'm watching it u" },
  { image: sad7, text: "You have to go to jail" },
];

const greetingReaction: Reaction = {
  image: greeting,
  text: "What say you to my humble ask?",
};

const happyReaction: Reaction = {
  image: happy,
  text: "Get ready for an exciting valentines day. Don't expect to be cozy cozy like bimbimatchi 💖",
};

function App() {
  const [mode, setMode] = useState<Mode>("greeting");
  const [sadIndex, setSadIndex] = useState<number>(-1);
  const [escapeMode, setEscapeMode] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const handleNo = () => {
    setSadIndex((prev) => {
      const next = prev + 1;

      if (next >= sadReactions.length - 1) {
        setEscapeMode(true);
      }

      return next % sadReactions.length;
    });

    setMode("sad");
  };

  const handleYes = () => {
    setMode("happy");
  };

  const teleportNo = () => {
    const padding = 16;

    const maxX = window.innerWidth - 140;
    const maxY = window.innerHeight - 80;

    setNoPos({
      x: Math.random() * maxX + padding,
      y: Math.random() * maxY + padding,
    });
  };

  const currentReaction = () => {
    if (mode === "greeting") return greetingReaction;
    if (mode === "sad") return sadReactions[sadIndex];
    return happyReaction;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-linear-to-b from-rose-100 via-pink-50 to-white">
      <h1 className="text-3xl font-bold text-center text-pink-900">
        Will you be my valentine?
      </h1>

      <div className="flex gap-4">
        <img
          src={currentReaction().image}
          alt="mood"
          className="w-lg max-w-full rounded-xl shadow-lg transition-all duration-300"
        />

        {mode === "happy" && (
          <img
            src={bimbimatchi}
            className="w-lg max-w-full rounded-xl shadow-lg transition-all duration-300"
          />
        )}
      </div>

      <p
        className={`mt-4 text-lg font-medium text-center ${
          mode === "sad" ? "text-purple-950" : "text-pink-600"
        } animate-fade-in`}
      >
        {currentReaction().text}
      </p>

      {mode === "happy" ? (
        <ul className="mt-4 w-full max-w-md rounded-2xl bg-white/80 backdrop-blur shadow-xl shadow-pink-200/50 p-6 space-y-5 text-pink-900 animate-fade-in text-center">
          <li className="flex flex-col items-center gap-1">
            <span className="text-2xl">📅</span>
            <p className="font-semibold">Date & Time</p>
            <p className="text-sm opacity-80">02 / 14 / 2026 @ 01:00 PM</p>
          </li>

          <li className="flex flex-col items-center gap-1">
            <span className="text-2xl">📍</span>
            <p className="font-semibold">Location</p>
            <p className="text-sm opacity-80">
              Secret — clues will reveal it ✨
            </p>
          </li>

          <li className="flex flex-col items-center gap-1">
            <span className="text-2xl">👗</span>
            <p className="font-semibold">Attire</p>
            <p className="text-sm opacity-80">
              Follow the clues — you’ll need to walk around in style 💃
            </p>
          </li>
        </ul>
      ) : (
        <div className="flex gap-4 relative">
          <button
            onClick={handleYes}
            className="px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 active:scale-95 transition"
          >
            Yes
          </button>

          <button
            onClick={handleNo}
            onMouseEnter={escapeMode ? teleportNo : undefined}
            style={
              escapeMode
                ? {
                    position: "fixed",
                    left: noPos.x,
                    top: noPos.y,
                  }
                : undefined
            }
            className={`px-6 py-3 rounded-lg bg-red-500 text-white font-semibold
              hover:bg-red-600 active:scale-95 transition
              ${escapeMode ? "z-50" : ""}
            `}
          >
            No
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
