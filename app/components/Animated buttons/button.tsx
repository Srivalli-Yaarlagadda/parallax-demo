"use client";

export default function ButtonAnimations() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <style>{`
        @keyframes wave-animation {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes liquid-sweep {
          0% {
            transform: translateX(-120%) skewX(-12deg);
          }
          50% {
            transform: translateX(-10%) skewX(-16deg);
          }
          100% {
            transform: translateX(120%) skewX(-12deg);
          }
        }

        @keyframes halo-orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes gradient-border-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
      {/* 1 Gradient Flow Border */}
      <Card title="Gradient Flow Border">
        <button className="relative px-7 py-3 text-white font-semibold tracking-wide rounded-xl overflow-hidden group">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          <span className="absolute inset-0.5 bg-slate-900 rounded-xl group-hover:bg-slate-800/50 transition-colors duration-500"></span>
          <span className="relative z-10 flex items-center justify-center gap-2">
            Hover Me
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </button>
      </Card>

      {/* 2 Premium Fill Left → Right */}
      <Card title="Premium Fill">
        <button className="relative overflow-hidden px-7 py-3 text-white font-semibold tracking-wide bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border border-slate-600 group hover:border-slate-500 transition-colors duration-300">
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></span>
          <span className="relative z-10">Hover Me</span>
        </button>
      </Card>

      {/* 3 Liquid Rise Premium */}
      <Card title="Liquid Rise">
        <button className="relative overflow-hidden px-7 py-3 text-white font-semibold tracking-wide bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border border-slate-600 group hover:border-cyan-400/50 transition-all duration-300">
          <span className="absolute inset-0 bg-gradient-to-t from-cyan-400 via-cyan-300 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out opacity-80"></span>
          <span className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out opacity-0 group-hover:opacity-100"></span>
          <span className="relative z-10">Hover Me</span>
        </button>
      </Card>

      {/* 4 Magnetic Scale Premium */}
      <Card title="Magnetic Scale">
        <button className="relative px-7 py-3 bg-gradient-to-br from-slate-700 to-slate-800 text-white font-semibold tracking-wide rounded-xl border border-slate-600 group overflow-hidden transition-all duration-300 hover:scale-105 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/30">
          <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10">Hover Me</span>
        </button>
      </Card>

      {/* 5 Color Shift */}
      <Card title="Color Shift">
        <button className="relative px-7 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-semibold tracking-wide rounded-xl border border-pink-400 group overflow-hidden transition-all duration-500 hover:border-yellow-300/70 hover:shadow-2xl hover:shadow-orange-500/50">
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
          <span className="relative z-10">Hover Me</span>
        </button>
      </Card>

      {/* 6 Liquid Glass */}
      <Card title="Liquid Glass">
        <button className="relative px-8 py-3.5 rounded-2xl border border-cyan-300/70 bg-slate-900/40 text-cyan-50 font-semibold tracking-wide overflow-hidden group backdrop-blur-2xl shadow-[0_18px_45px_rgba(8,47,73,0.85)] hover:border-cyan-200 hover:bg-slate-900/70 transition-all duration-500">
          {/* outer glow ring */}
          <span className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-300/20 blur-[1px] group-hover:border-cyan-200/40 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] transition-all duration-500" />

          {/* glass tint */}
          <span className="absolute inset-0 bg-gradient-to-br from-cyan-400/22 via-sky-500/12 to-slate-50/4 opacity-70 group-hover:opacity-90 transition-opacity duration-400" />

          {/* top reflective sheen */}
          <span className="pointer-events-none absolute inset-x-[-10%] top-0 h-1/2 bg-gradient-to-b from-white/30 via-white/5 to-transparent opacity-70 group-hover:opacity-95 mix-blend-screen transition-opacity duration-400" />

          {/* main liquid streak */}
          <span className="pointer-events-none absolute inset-y-[-35%] -left-28 -right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-cyan-300/90 via-cyan-200/85 to-transparent blur-3xl animate-[liquid-sweep_1.9s_ease-in-out_infinite]" />
          </span>

          {/* secondary subtle streak for depth */}
          <span className="pointer-events-none absolute inset-y-[-40%] -left-40 -right-8 opacity-0 group-hover:opacity-80 transition-opacity duration-200 delay-100">
            <span className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-sky-200/60 via-cyan-100/40 to-transparent blur-[26px] animate-[liquid-sweep_2.4s_ease-in-out_infinite]" />
          </span>

          <span className="relative z-10 flex items-center justify-center">
            Hover Me
          </span>
        </button>
      </Card>

      {/* 7 Aurora Halo */}
      <Card title="Aurora Halo">
        <button className="relative px-7 py-3 rounded-xl border border-indigo-400/70 bg-slate-900/60 text-slate-50 font-semibold tracking-wide overflow-hidden group shadow-[0_18px_40px_rgba(30,64,175,0.85)] hover:border-fuchsia-300/80 hover:bg-slate-900/80 transition-all duration-500">
          {/* inner glow */}
          <span className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/20 to-emerald-400/15 opacity-70 group-hover:opacity-90 transition-opacity duration-400" />

          {/* orbiting halo ring */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-400/50 blur-[2px] opacity-0 group-hover:opacity-100 [box-shadow:0_0_45px_rgba(244,114,182,0.75)] animate-[halo-orbit_3.2s_linear_infinite]" />

          {/* inner solid ring for depth */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-200/70 opacity-0 group-hover:opacity-80 transition-opacity duration-500 delay-75" />

          <span className="relative z-10 flex items-center justify-center">
            Hover Me
          </span>
        </button>
      </Card>

      {/* 8 Premium Gate */}
      <Card title="Premium Gate">
        <button className="relative px-8 py-3 rounded-xl border border-emerald-400/70 bg-gradient-to-br from-slate-900 via-slate-900/80 to-emerald-900/40 text-emerald-50 font-semibold tracking-wide overflow-hidden group shadow-[0_18px_40px_rgba(16,185,129,0.55)] hover:border-emerald-300 hover:bg-slate-900 transition-all duration-500">
          {/* outer soft glow */}
          <span className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-emerald-300/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />

          {/* left gate panel */}
          <span className="pointer-events-none absolute inset-y-1 left-1 w-1/2 rounded-l-lg bg-gradient-to-r from-emerald-400/45 via-emerald-300/20 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          {/* right gate panel */}
          <span className="pointer-events-none absolute inset-y-1 right-1 w-1/2 rounded-r-lg bg-gradient-to-l from-emerald-400/45 via-emerald-300/20 to-transparent origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out delay-75" />

          {/* bottom underline that grows in */}
          <span className="pointer-events-none absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300 to-transparent group-hover:w-3/4 transition-all duration-500 ease-out delay-75" />

          <span className="relative z-10 flex items-center justify-center">
            Hover Me
          </span>
        </button>
      </Card>

      {/* 9 Infinity Edge */}
      <Card title="Infinity Edge">
        <button className="relative px-8 py-3 rounded-xl border border-slate-500/70 bg-slate-950/70 text-slate-50 font-semibold tracking-wide overflow-hidden group shadow-[0_18px_40px_rgba(15,23,42,0.9)] hover:border-blue-400/80 hover:bg-slate-950 transition-all duration-500">
          {/* base inner gradient */}
          <span className="absolute inset-0 bg-gradient-to-br from-slate-700/70 via-slate-900/60 to-slate-950 opacity-70 group-hover:opacity-90 transition-opacity duration-400" />

          {/* rotating border frame */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-blue-400/40 opacity-0 group-hover:opacity-100 [box-shadow:0_0_45px_rgba(59,130,246,0.75)] animate-[halo-orbit_6s_linear_infinite]" />

          {/* inner gradient edge sweep */}
          <span className="pointer-events-none absolute inset-[1px] rounded-[0.75rem] bg-[linear-gradient(120deg,rgba(59,130,246,0.0),rgba(59,130,246,0.45),rgba(59,130,246,0.0))] bg-[length:200%_200%] opacity-0 group-hover:opacity-100 group-hover:animate-[wave-animation_0.9s_ease-out_forwards]" />

          {/* thin bottom highlight line */}
          <span className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-300 to-transparent group-hover:w-4/5 transition-all duration-500 ease-out delay-75" />

          <span className="relative z-10 flex items-center justify-center">
            Hover Me
          </span>
        </button>
      </Card>

      {/* 10 Flowing Gradient Border */}
      <Card title="Flowing Gradient Border">
        <button className="relative px-[1px] py-[1px] rounded-xl bg-transparent text-slate-50 font-semibold tracking-wide overflow-hidden group shadow-[0_12px_30px_rgba(30,64,175,0.55)]">
          {/* ultra-thin animated gradient border */}
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(120deg,#22d3ee,#6366f1,#ec4899,#22d3ee)] bg-[length:220%_220%] opacity-0 group-hover:opacity-100 group-hover:animate-[gradient-border-flow_2.2s_linear_infinite]" />

          {/* inner solid button body */}
          <span className="relative z-10 flex items-center justify-center px-7 py-3 rounded-[0.75rem] bg-slate-950/90 border border-slate-800/80 group-hover:border-slate-600/80 transition-colors duration-300">
            Hover Me
          </span>
        </button>
      </Card>
      
    </div>
  );
}

function Card({ children, title }: any) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="w-48 h-48 border-2 border-slate-600 rounded-xl flex items-center justify-center bg-slate-800/30 hover:border-slate-500 transition-all duration-300">
        {children}
      </div>
      <p className="text-slate-300 text-xs font-medium tracking-wide uppercase">{title}</p>
    </div>
  );
}