import Script from "next/script";
import { withBase } from "../lib/site";
import "./dashboard.css";

export const metadata = {
  title: "Sonitus — Dublin Noise Intelligence",
};

export default function Page() {
  return (
    <>
<div className="shell">
    <aside className="sidenav">
      <div className="sidenav-brand">
        <a href={withBase("/")} className="sidenav-home"><strong>Sonitus</strong></a>
        <p className="sidenav-sub">Dublin noise</p>
      </div>
      <nav className="tabs" aria-label="Dashboard">
        <p className="nav-label">Observe</p>
        <button type="button" className="tab-btn is-on" data-tab="overview"><span>01</span> Overview</button>
        <p className="nav-label">Intelligence</p>
        <button type="button" className="tab-btn" data-tab="forecast"><span>02</span> Noise forecast</button>
        <button type="button" className="tab-btn" data-tab="anomalies"><span>03</span> Hotspots</button>
        <button type="button" className="tab-btn" data-tab="chat"><span>04</span> Ask</button>
        <button type="button" className="tab-btn" data-tab="insights"><span>05</span> AI insights</button>
        <button type="button" className="tab-btn" data-tab="calendar"><span>06</span> Upcoming</button>
        <p className="nav-label">Source</p>
        <button type="button" className="tab-btn" data-tab="method"><span>07</span> Data methodology</button>
      </nav>
      <button type="button" className="theme-toggle" id="theme-toggle" aria-pressed="false">Dark mode</button>
    </aside>

    <div className="workspace">
      <div className="toolbar topbar" id="controls">
        <p className="toolbar-note" id="window-note">Pick a place on the map for the five-minute chart. Other pages paint immediately from a usual-week pattern.</p>
      </div>

      <section className="panel panel-map is-on" id="tab-overview">
        <header className="mast">
          <div className="brand">
            <p className="eyebrow">RoAI Hackathon · Dublin City Council</p>
            <h1>The city, in decibels.</h1>
            <p className="lede mast-lede">Pick a pin to hear the street in numbers — quieter greens, louder reds. The scale on the right is a reading aid, not a legal limit.</p>
          </div>
          <div className="wave" aria-hidden="true">
            <svg viewBox="0 0 240 72" preserveAspectRatio="none">
              <path className="wave-a" d="M0 36 Q 20 18 40 36 T 80 36 T 120 22 T 160 36 T 200 48 T 240 36" fill="none" strokeWidth="1.5">
                <animate attributeName="d" dur="1.8s" repeatCount="indefinite" values="
                  M0 36 Q 20 18 40 36 T 80 36 T 120 22 T 160 36 T 200 48 T 240 36;
                  M0 36 Q 20 50 40 36 T 80 20 T 120 36 T 160 52 T 200 28 T 240 36;
                  M0 36 Q 20 18 40 36 T 80 36 T 120 22 T 160 36 T 200 48 T 240 36"/>
              </path>
              <path className="wave-b" d="M0 36 Q 20 44 40 36 T 80 48 T 120 36 T 160 24 T 200 36 T 240 36" fill="none" strokeWidth="1.25">
                <animate attributeName="d" dur="2.4s" repeatCount="indefinite" values="
                  M0 36 Q 20 44 40 36 T 80 48 T 120 36 T 160 24 T 200 36 T 240 36;
                  M0 36 Q 20 28 40 36 T 80 24 T 120 36 T 160 44 T 200 36 T 240 36;
                  M0 36 Q 20 44 40 36 T 80 48 T 120 36 T 160 24 T 200 36 T 240 36"/>
              </path>
            </svg>
          </div>
          <aside className="db-guide" aria-label="How to read decibels">
            <p className="eyebrow">How to read the numbers</p>
            <div className="db-meter" aria-hidden="true">
              <div className="seg low"><strong>20–60</strong> low</div>
              <div className="seg mid"><strong>60–80</strong> mid</div>
              <div className="seg high"><strong>80+</strong> high</div>
            </div>
            <ul>
              <li><span className="swatch low" aria-hidden="true"></span><span>Quiet room to easy conversation</span></li>
              <li><span className="swatch mid" aria-hidden="true"></span><span>Busy street — you’ll notice it</span></li>
              <li><span className="swatch high" aria-hidden="true"></span><span>Loud; fine for a short visit</span></li>
            </ul>
            <p className="db-guide-note">A reading aid, not a legal limit.</p>
          </aside>
        </header>

        <div className="stage" id="map-stage">
          <div className="map-wrap">
            <div id="map"></div>
            <div className="map-legend" aria-hidden="true">
              <span><i className="low"></i> 20–60 low</span>
              <span><i className="mid"></i> 60–80 medium</span>
              <span><i className="high"></i> 80+ high</span>
            </div>
          </div>
          <aside className="dock">
            <div className="dock-head">
              <h2>Find a place</h2>
              <label className="search">
                <span className="sr-only">Place name</span>
                <input id="place-search" type="search" placeholder="Raheny, Bull Island, Ringsend…" autoComplete="off" />
              </label>
              <p id="status">Loading monitors…</p>
              <div className="chips" id="place-chips"></div>
            </div>
            <ol id="station-list"></ol>
          </aside>
        </div>

        <section className="stats" id="city-stats">
          <article>
            <p className="stat-label">Stations</p>
            <p className="stat-value" id="stat-stations">—</p>
          </article>
          <article>
            <p className="stat-label">Quietest</p>
            <p className="stat-value" id="stat-min">—</p>
          </article>
          <article>
            <p className="stat-label">City mean</p>
            <p className="stat-value" id="stat-mean">—</p>
          </article>
          <article>
            <p className="stat-label">Loudest</p>
            <p className="stat-value" id="stat-max">—</p>
          </article>
        </section>

        <div className="trace-empty" id="trace-empty">
          <p>Select a pin or a place to load the five-minute dB(A) line.</p>
        </div>
        <section className="detail" id="detail">
          <div className="detail-copy">
            <p className="eyebrow" id="detail-label">Station</p>
            <h2 id="detail-title">Select a monitor</h2>
            <p id="detail-meta"></p>
            <ul className="detail-stats">
              <li><span>Min</span><strong id="d-min">—</strong></li>
              <li><span>Mean</span><strong id="d-mean">—</strong></li>
              <li><span>Max</span><strong id="d-max">—</strong></li>
              <li><span>Latest</span><strong id="d-latest">—</strong></li>
            </ul>
            <aside className="place-ai" id="place-ai">
              <p className="eyebrow">When to go</p>
              <p id="ai-waiting">Pick a place. The chart loads here. AI insights wait until you open that page.</p>
              <div id="ai-ready" hidden={true}>
                <p id="ai-summary"></p>
                <div className="ai-mini" id="ai-mini"></div>
              </div>
            </aside>
          </div>
          <div className="chart-wrap">
            <canvas id="chart" width="1200" height="420"></canvas>
            <p className="hour-strip-label">Usual dB by hour of day</p>
            <div className="hour-strip" id="hour-strip"></div>
            <p className="chart-caption">Five-minute LAeq · dB(A) · Europe/Dublin</p>
          </div>
        </section>
      </section>

      <section className="panel" id="tab-forecast">
        <header className="panel-head">
          <p className="eyebrow">Noise forecast</p>
          <h2>When it’s likely to become noisy.</h2>
          <p className="lede">Not a promise of tomorrow’s exact decibels. These windows are when Dublin’s monitors have recently been louder at this time of day — a usual pattern, shown instantly.</p>
        </header>
        <p className="cal-loading" id="forecast-loading" hidden={true}>Pattern is ready.</p>
        <div id="forecast-board" hidden={true}></div>
      </section>

      <section className="panel" id="tab-anomalies">
        <header className="panel-head">
          <p className="eyebrow">Hotspots</p>
          <h2>Where it’s loud.</h2>
          <p className="lede">Two honest flags from a usual hourly pattern: a mean in the loud colour band (≥ 65 dB), or a swing of 15 dB or more between the quietest and loudest hour. Not a live city-wide pull, and not invented detections.</p>
        </header>
        <div className="intel-empty" id="anomaly-empty">
          <p>Usual-week pattern for Dublin noise stations.</p>
        </div>
        <div className="feed" id="anomaly-feed"></div>
      </section>

      <section className="panel" id="tab-chat">
        <header className="panel-head">
          <p className="eyebrow">Ask</p>
          <h2>How loud is it, and should I go?</h2>
          <p className="lede">Ask about a Dublin monitor — usual decibels, whether it’s a good time to visit, or what to do if it’s loud. Answers use the station list on this dashboard, not a live pull of tomorrow.</p>
        </header>
        <div className="chat-shell">
          <form className="chat-form" id="chat-form">
            <label className="chat-label" htmlFor="chat-input">Type a place or a question</label>
            <div className="chat-compose">
              <input id="chat-input" type="text" maxlength="400" placeholder="e.g. How many dB is Strand Road? Should I go?" autoComplete="off" />
              <button type="submit" className="route-btn" id="chat-send">Ask Groq</button>
            </div>
          </form>
          <p className="chat-hint">Or tap one of these:</p>
          <div className="chat-prompts" id="chat-prompts">
            <button type="button" data-q="How loud is Strand Road usually?">How loud is Strand Road?</button>
            <button type="button" data-q="Should I go to Bull Island in the morning?">Should I go to Bull Island?</button>
            <button type="button" data-q="Where is usually quieter, Raheny or Chancery Park?">Raheny or Chancery Park?</button>
          </div>
          <div className="chat-log" id="chat-log"></div>
        </div>
      </section>

      <section className="panel" id="tab-insights">
        <header className="panel-head">
          <p className="eyebrow">AI insights</p>
          <h2>When to go.</h2>
          <p className="lede" id="insights-lede">Pick a place on the map. This page fills with that place’s hours — noisiest times, calmer windows, and, if it’s very loud, Groq’s ways to take the edge off.</p>
        </header>
        <p id="insights-empty">Pick a place on the map, then come back here. AI only runs on this page.</p>
        <div className="ai-board" id="insights-ready" hidden={true}></div>
      </section>

      <section className="panel" id="tab-calendar">
        <header className="panel-head">
          <p className="eyebrow">Upcoming</p>
          <h2>Where you’re going, and how loud it usually is.</h2>
          <p className="lede">Each card is a place on your day. The number is the typical noise there at that hour — a usual reading, not a promise of the exact sound you’ll hear.</p>
        </header>
        <p className="cal-loading" id="cal-loading" hidden={true}>Upcoming is ready.</p>
        <div className="cal-alerts" id="cal-alerts" hidden={true}></div>
        <div className="cal-layout">
          <div>
            <ol className="cal-list" id="cal-list"></ol>
          </div>
          <article className="cal-detail" id="cal-detail" hidden={true}></article>
        </div>
      </section>

      <section className="panel" id="tab-method">
        <header className="panel-head">
          <p className="eyebrow">Data methodology</p>
          <h2>How this is measured.</h2>
        </header>
        <div className="method-grid">
          <article className="method-card">
            <h3>Source</h3>
            <p>We list every monitor from <code>POST /api/monitors</code> (60 on the last pull). Labels starting with “Noise” are sound. National/Local/Former Air and Gas are air. A few serials return Access denied on readings.</p>
          </article>
          <article className="method-card">
            <h3>Metric</h3>
            <p>LAeq is A-weighted equivalent continuous sound level, in dB(A). The JSON has no unit column; that unit is documented with the dataset. Colour bands on the map are a reading aid, not a legal limit.</p>
          </article>
          <article className="method-card">
            <h3>Intervals</h3>
            <p>Five-minute series from <code>POST /api/data</code>. Hourly means from <code>POST /api/hourly-averages</code> (field <code>laeq</code>). Daily-style rows exist at <code>POST /api/noise-averages</code> and are not used on this dashboard yet. Request times are Unix; response clocks are naive Europe/Dublin.</p>
          </article>
          <article className="method-card">
            <h3>Colour the city</h3>
            <p>Pins use a usual hourly mean for each noise station so the map colours immediately. A live city-wide hourly pull is not required to open this page. Upstream rate limits still apply if you load a station chart.</p>
          </article>
          <article className="method-card">
            <h3>Hotspots</h3>
            <p>Loud band: usual hourly mean ≥ 65 dB(A). Wide swing: usual hourly max minus min ≥ 15 dB. These are thresholds we chose for the dashboard, not Sonitus breach flags. The hotspots list is a pattern so it opens instantly.</p>
          </article>
          <article className="method-card">
            <h3>Groq</h3>
            <p>When you pick a loud place, Groq writes quieter hours and short mitigation steps. The Ask page is a chat: you can question usual decibels and whether to go. Groq only sees the station list and typical dB we send it — not map colours, and not a promise of tomorrow.</p>
          </article>
          <article className="method-card">
            <h3>Forecast</h3>
            <p>The forecast page is a hardcoded time-of-day pattern for Dublin evenings (Europe/Dublin). Elevated windows are historically louder hours — not a guaranteed future dB, and not a live city pull.</p>
          </article>
          <article className="method-card">
            <h3>Calendar</h3>
            <p>Upcoming events are hardcoded Dublin places matched to Sonitus stations by name. The dB on each card is a typical reading at that hour, not a live analyze call and not a future exact level.</p>
          </article>
        </div>
      </section>
    </div>
  </div>
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="beforeInteractive" />
      <Script src="/dashboard.js" strategy="afterInteractive" />
    </>
  );
}
