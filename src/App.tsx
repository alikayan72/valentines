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
  text: "Get ready for an adventerous valentines day. Don't expect to be cozy cozy like bimbimatchi 💖",
};

function App() {
  const [mode, setMode] = useState<Mode>("greeting");
  const [sadIndex, setSadIndex] = useState<number>(-1);
  const [escapeMode, setEscapeMode] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showCard, setShowCard] = useState(false);

  const handleNo = () => {
    setSadIndex((prev) => {
      const next = prev + 1;
      if (next >= sadReactions.length - 1) setEscapeMode(true);
      return next % sadReactions.length;
    });
    setMode("sad");
  };

  const handleYes = () => setMode("happy");

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
    <main className="min-h-screen flex flex-col items-center justify-center gap-3 bg-linear-to-b from-rose-100 via-pink-50 to-white px-4">
      <h1 className="text-3xl font-bold text-center text-pink-900">
        Will you be my valentine?
      </h1>

      <div className="flex gap-4 flex-wrap justify-center">
        <img
          src={currentReaction().image}
          alt="mood"
          className="w-72 max-w-full rounded-xl shadow-lg transition-all duration-300"
        />

        {mode === "happy" && (
          <img
            src={bimbimatchi}
            className="w-72 max-w-full rounded-xl shadow-lg transition-all duration-300"
          />
        )}
      </div>

      <p
        className={`mt-2 text-lg font-medium text-center ${
          mode === "sad" ? "text-purple-600" : "text-pink-600"
        } animate-fade-in`}
      >
        {currentReaction().text}
      </p>

      {mode === "happy" ? (
        <>
          <ul className="mt-3 w-full max-w-4xl rounded-2xl bg-white/80 backdrop-blur shadow-xl shadow-pink-200/50 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-pink-900 animate-fade-in text-center">
            <li className="flex flex-col items-center gap-2">
              <span className="text-3xl">📅</span>
              <p className="font-semibold text-lg">Date & Time</p>
              <p className="text-sm opacity-80">02 / 14 / 2026 @ 01:00 PM</p>
            </li>

            <li className="flex flex-col items-center gap-2">
              <span className="text-3xl">📍</span>
              <p className="font-semibold text-lg">Location</p>
              <p className="text-sm opacity-80">The Barnes Foundation ✨</p>
            </li>

            <li className="flex flex-col items-center gap-2">
              <span className="text-3xl">👗</span>
              <p className="font-semibold text-lg">Attire</p>
              <p className="text-sm opacity-80">
                Stylish and mobile like a spy thriller 💃
              </p>
            </li>
          </ul>

          <button
            onClick={() => setShowCard(true)}
            className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 transition"
          >
            Open Valentine Card 💌
          </button>
        </>
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
                ? { position: "fixed", left: noPos.x, top: noPos.y }
                : undefined
            }
            className={`px-6 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-95 transition ${
              escapeMode ? "z-50" : ""
            }`}
          >
            No
          </button>
        </div>
      )}

      {/* 🌹 Valentine Modal */}
      {showCard && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowCard(false)}
        >
          <div
            className="bg-gradient-to-b from-rose-100 via-pink-50 to-white rounded-3xl shadow-2xl p-8 max-w-lg w-[90%] text-center relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCard(false)}
              className="absolute top-3 right-4 text-pink-500 hover:text-pink-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-pink-900 mb-4">
              Azmeh Tane 💖
            </h2>

            <p className="text-pink-800 leading-relaxed">
              Azmeh, I will keep this short whether you read it on valentines
              day or not
              <br />
              I'm writing this as you drink your cuffeez across the hallway. And
              the fact that you put in so much effort to form new relationships
              even in such hard times is so impresive to me. Whether it is
              through solidcore, bumble, neighbors or your existing friends you
              always put in such constant effort to show up for people around
              you. And I know that it hasn't been the easiest to do so, but you
              still did, and this deserves so much recognition.
              <br />
              You make everything and everyone around you brighter and I'm lucky
              to be around you!
              <br />
              -Ali
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
