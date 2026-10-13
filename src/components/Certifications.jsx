import { Award, BadgeCheck } from "lucide-react";
export default function Certifications() {
  return (
    <div className="credentials">
      <div>
        <Award size={20} />
        <p>
          <strong>AIR 6 · LEET Exam</strong>
          <span>DSEU Topper Scholarship Holder · AIR 295</span>
        </p>
      </div>
      <div>
        <BadgeCheck size={20} />
        <p>
          <strong>Python Programming</strong>
          <span>Google for Education</span>
        </p>
      </div>
      <div>
        <BadgeCheck size={20} />
        <p>
          <strong>AI & Machine Learning Foundation</strong>
          <span>RF Skilling Academy</span>
        </p>
      </div>
    </div>
  );
}
