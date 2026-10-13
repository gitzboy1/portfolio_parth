const experiences = [
  {
    company: "StaplerLabs",
    role: "Data Analyst Intern",
    date: "Jun — Aug 2026",
    label: "Data & reporting",
    points: [
      "Cleaned and validated internal datasets with SQL, Python, and Excel, checking missing values, duplicates, and inconsistent formats.",
      "Updated Power BI dashboards and KPI reports; documented reporting requirements and data checks for the team.",
    ],
  },
  {
    company: "KDSESJS",
    role: "Web Developer Intern",
    date: "Jun — Jul 2025",
    label: "Web development",
    points: [
      "Built an NGO website from scratch, translating stakeholder requirements into a structured, user-friendly interface for health and education programmes.",
    ],
  },
  {
    company: "Airports Authority of India",
    role: "IT Division Intern",
    date: "Sep 2023",
    label: "IT operations",
    points: [
      "Mapped IT infrastructure workflows and documented system gaps for stakeholder review.",
      "Maintained operational reports, asset registers, and inventory trackers across 3+ airport divisions.",
    ],
  },
  {
    company: "CERT-In",
    role: "Security Engineer Intern",
    date: "Jun — Jul 2023",
    label: "Cybersecurity",
    points: [
      "Authored 10+ cybersecurity audit SOPs, translating technical processes into reference documentation.",
      "Supported incident-response coordination with public and private sector CERTs and maintained cross-functional operational data.",
    ],
  },
];
export default function Experience() {
  return (
    <section
      className="section experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="container experience-layout">
        <div className="experience-intro">
          <p className="eyebrow">02 / Where I’ve contributed</p>
          <h2 id="experience-title">
            Learning by
            <br />
            doing the work.
          </h2>
          <p>
            Experience across product development, data analysis, and the
            systems that keep organisations running.
          </p>
          <a
            className="text-link"
            href={
              import.meta.env.BASE_URL + "resumes/Parth_Shekhawat_DB_Resume.pdf"
            }
            download
          >
            Get the full resume <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="experience-list">
          {experiences.map((job, index) => (
            <article className="experience-row" key={job.company}>
              <div className="timeline-marker">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <div className="experience-meta">
                  <span>{job.label}</span>
                  <span>{job.date}</span>
                </div>
                <h3>{job.company}</h3>
                <p className="experience-role">{job.role}</p>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
