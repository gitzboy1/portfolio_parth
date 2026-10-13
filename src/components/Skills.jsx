import { Braces, ChartNoAxesCombined, Cpu } from "lucide-react";
const groups = [
  {
    title: "Software development",
    icon: Braces,
    description: "From a requirement to a tested user flow.",
    skills: [
      "C / C++",
      "Python",
      "JavaScript",
      "HTML / CSS",
      "Node.js",
      "PostgreSQL",
      "Playwright",
      "Git / GitHub",
    ],
  },
  {
    title: "Data & analytics",
    icon: ChartNoAxesCombined,
    description: "Clean data. Clear reporting. Useful insights.",
    skills: [
      "SQL",
      "Power BI",
      "Excel",
      "pandas",
      "NumPy",
      "Matplotlib",
      "Jupyter Notebook",
    ],
  },
  {
    title: "AI foundations & delivery",
    icon: Cpu,
    description: "A growing toolkit, built on strong fundamentals.",
    skills: [
      "AI/ML foundations",
      "Prompt engineering",
      "GitHub Copilot",
      "AWS",
      "Agile",
      "Requirements gathering",
      "Technical documentation",
    ],
  },
];
export default function Skills() {
  return (
    <div className="skills-grid">
      {groups.map(({ title, icon: Icon, description, skills }) => (
        <div className="skill-group" key={title}>
          <Icon size={24} strokeWidth={1.5} />
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="tags">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
