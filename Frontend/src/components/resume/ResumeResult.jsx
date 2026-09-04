const card = "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition-shadow";
const sectionTitle = "text-xs font-bold uppercase tracking-wider mb-3 text-slate-400 dark:text-slate-500";
const tag = "rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300";
const chip = "flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 text-sm text-indigo-50";

const DataSection = ({ title, items }) => {
  if (!items || (Array.isArray(items) && items.length === 0)) return null;
  const list = Array.isArray(items) ? items : [items];

  return (
    <div className={card}>
      <h3 className={sectionTitle}>{title}</h3>
      <ul className="space-y-2">
        {list.map((item, i) => (
          <li
            key={i}
            className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-3 border-l-2 border-slate-200 dark:border-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const TagSection = ({ title, items }) => {
  if (!items || (Array.isArray(items) && items.length === 0)) return null;
  const list = Array.isArray(items) ? items : [items];

  return (
    <div className={card}>
      <h3 className={sectionTitle}>{title}</h3>
      <div className="flex flex-wrap gap-2">
        {list.map((item, i) => (
          <span key={i} className={`${tag} hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={card}>
      <h3 className={sectionTitle}>{title}</h3>
      <div className="space-y-4 divide-y divide-slate-200 dark:divide-slate-700">
        {items.map((project, i) => {
          const name = typeof project === "string" ? project : project.name;
          const techStack = typeof project === "string" ? null : project.tech_stack;
          const techList = Array.isArray(techStack)
            ? techStack
            : typeof techStack === "string" && techStack.trim().length > 0
            ? techStack.split(",").map((t) => t.trim()).filter(Boolean)
            : [];

          return (
            <div key={i} className={`text-sm ${i > 0 ? "pt-4" : ""}`}>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{name}</p>
              {techList.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {techList.map((t, j) => (
                    <span key={j} className={`${tag} text-[11px] px-2.5 py-0.5`}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ResumeResult = ({ data, onReset }) => {
  const name = data.name?.[0] || "Your Resume";

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-5">
      <div className="rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 p-6 sm:p-7 text-white shadow-xl shadow-indigo-500/20">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{name}</h2>
            {data.experience && (
              <p className="mt-1.5 text-indigo-100 text-sm">{data.experience}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {data.email?.[0] && <span className={chip}>{data.email[0]}</span>}
              {data.phone?.[0] && <span className={chip}>{data.phone[0]}</span>}
              {data.github?.[0] && <span className={chip}>{data.github[0]}</span>}
              {data.linkedin?.[0] && <span className={chip}>{data.linkedin[0]}</span>}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            {data.cgpa && (
              <span className="bg-white/15 backdrop-blur-sm border border-white/10 rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-sm">
                CGPA: {data.cgpa}
              </span>
            )}
            {data.grad_year && (
              <span className="text-indigo-100 text-xs font-medium">{data.grad_year}</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataSection title="Education" items={data.college} />
        <DataSection title="Experience" items={data.experience ? [data.experience] : []} />
        <TagSection title="Skills" items={data.skills} />
        <TagSection title="Certifications" items={data.certifications} />
        {data.projects && data.projects.length > 0 && (
          <div className="md:col-span-2">
            <ProjectSection title="Projects" items={data.projects} />
          </div>
        )}
      </div>

      <div className="flex justify-center pt-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow transition-all cursor-pointer active:scale-95"
        >
          Upload Another Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeResult;