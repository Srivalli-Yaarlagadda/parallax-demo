"use client";

const goals = [
  { num: "01", title: "Scale", desc: "Lorem ipsum dolor sit amet, consectetur" },
  { num: "02", title: "Unit Economics", desc: "Lorem ipsum dolor sit amet" },
  { num: "03", title: "Sales/Mktg", desc: "Lorem ipsum dolor sit amet" },
  { num: "04", title: "People", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
  { num: "05", title: "Infrastructure", desc: "Lorem ipsum dolor sit amet, consectetur" },
  { num: "06", title: "Risk Mitigation", desc: "Lorem ipsum dolor sit amet" },
  { num: "07", title: "Other", desc: "Lorem ipsum dolor sit amet, consectetur" },
];

export default function Timeline() {
  return (
    <section className="relative w-full overflow-x-auto bg-[#0d2818] py-16 px-6 md:px-10">
      <h2 className="mb-14 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Primary Goals
      </h2>

      <div className="relative mx-auto min-w-[880px] max-w-6xl">
        {/* Wavy ribbon background */}
        <div className="absolute left-0 top-1/2 h-20 w-full -translate-y-1/2 md:h-24">
          <svg viewBox="0 0 880 100" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a4d3a" />
                <stop offset="50%" stopColor="#0f3326" />
                <stop offset="100%" stopColor="#1a4d3a" />
              </linearGradient>
            </defs>
            {/* Closed wavy ribbon */}
            <path
              d="M0 35 Q220 5 440 35 T880 35 L880 65 T660 95 T440 65 T220 65 T0 65 Z"
              fill="url(#ribbon)"
              opacity={0.95}
            />
          </svg>
        </div>

        {/* Nodes row */}
        <div className="relative flex justify-between">
          {goals.map((item, idx) => {
            const above = idx % 2 === 0;
            return (
              <div
                key={item.num}
                className="relative flex flex-1 flex-col items-center"
              >
                {/* Top content (for odd indices 0,2,4,6) */}
                <div className={`flex min-h-[100px] w-full max-w-[130px] flex-col ${above ? "justify-end" : "invisible"}`}>
                  {above && (
                    <>
                      <span className="text-3xl font-bold text-emerald-400 [-webkit-text-stroke:1.5px_rgba(52,211,153,0.6)] md:text-4xl">
                        {item.num}
                      </span>
                      <h3 className="mt-0.5 text-sm font-semibold text-emerald-400">{item.title}</h3>
                      <p className="mt-0.5 text-xs leading-snug text-slate-300">{item.desc}</p>
                    </>
                  )}
                </div>

                {/* Vertical line */}
                <div
                  className={`h-6 w-px bg-emerald-400/80 ${above ? "mt-1" : "mb-1"}`}
                />
                {/* Circle on wave */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.6)]">
                  <span className="h-2 w-2 rounded-full bg-emerald-900" />
                </div>
                {/* Vertical line */}
                <div className={`h-6 w-px bg-emerald-400/80 ${above ? "mb-1" : "mt-1"}`} />

                {/* Bottom content (for even indices 1,3,5) */}
                <div className={`flex min-h-[100px] w-full max-w-[130px] flex-col ${!above ? "justify-start" : "invisible"}`}>
                  {!above && (
                    <>
                      <span className="text-3xl font-bold text-emerald-400 [-webkit-text-stroke:1.5px_rgba(52,211,153,0.6)] md:text-4xl">
                        {item.num}
                      </span>
                      <h3 className="mt-0.5 text-sm font-semibold text-emerald-400">{item.title}</h3>
                      <p className="mt-0.5 text-xs leading-snug text-slate-300">{item.desc}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}