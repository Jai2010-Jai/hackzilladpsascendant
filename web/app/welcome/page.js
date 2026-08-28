import { withBase } from "../../lib/site";
import "../landing.css";

export const metadata = {
  title: "Sonitus — Listen to Dublin",
};

export default function WelcomePage() {
  return (
    <div className="welcome-root">
<div className="grain" aria-hidden="true"></div>

  <header className="top">
    <a className="mark" href={withBase("/")}>
      <span className="mark-dot" aria-hidden="true"></span>
      Sonitus
    </a>
    <p className="top-meta">RoAI Hackathon · Dublin City Council</p>
  </header>

  <main className="hero">
    <div className="copy">
      <p className="eyebrow">Dublin noise intelligence</p>
      <h1>
        <span className="line">The city,</span>
        <span className="line italic">in decibels.</span>
      </h1>
      <p className="lede">Sixty monitors. Quieter greens, louder reds. A map that lets you hear Dublin before you go.</p>
      <a className="enter" href={withBase("/")}>
        <span>Enter the map</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h12M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>

    <aside className="wave-panel" aria-hidden="true">
      <svg className="wave" viewBox="0 0 640 240" preserveAspectRatio="xMidYMid meet">
        <path className="fill" d="M0 120 C 40 40, 80 200, 120 120 S 200 20, 240 120 S 320 220, 360 120 S 440 30, 480 120 S 560 200, 640 120 V 240 H 0 Z"/>
        <path className="w a" fill="none" stroke="#fff8eb" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" d="M0 120 C 40 40, 80 200, 120 120 S 200 20, 240 120 S 320 220, 360 120 S 440 30, 480 120 S 560 200, 640 120"/>
        <path className="w b" fill="none" stroke="#d4a056" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" d="M0 120 C 48 190, 96 50, 144 120 S 240 210, 288 120 S 384 40, 432 120 S 528 185, 640 120"/>
      </svg>
    </aside>
  </main>

  <footer className="rail">
    <div>
      <span>Stations</span>
      <strong>60</strong>
    </div>
    <div>
      <span>Quiet</span>
      <strong>20–60</strong>
    </div>
    <div>
      <span>Busy</span>
      <strong>60–80</strong>
    </div>
    <div>
      <span>Loud</span>
      <strong>80+</strong>
    </div>
  </footer>
    </div>
  );
}
