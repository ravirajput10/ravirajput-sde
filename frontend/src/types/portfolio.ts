export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Vue.js" },
      { name: "Tailwind CSS" },
      { name: "Redux" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Python" },
      { name: "FastAPI" },
      { name: "GraphQL" },
      { name: "REST APIs" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Prisma" },
      { name: "Firebase" },
      { name: "Supabase" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "Vercel" },
      { name: "CI/CD" },
      { name: "Terraform" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git" },
      { name: "VS Code" },
      { name: "Figma" },
      { name: "Jira" },
      { name: "Postman" },
      { name: "Linux" },
    ],
  },
];

export const profileInfo = {
  name: "Ravi Rajput",
  title: "Full-Stack Developer",
  summary: "Passionate Full-Stack Developer with 2+ years of experience building modern, scalable web applications. I specialize in React, Node.js, and cloud technologies, with a focus on creating performant, user-centric solutions.",
  yearsOfExperience: 2,
  resumeUrl: "/resume.pdf",
  about: `I'm a results-driven Full-Stack Developer who thrives on turning complex problems into elegant, scalable solutions. With a strong foundation in both frontend and backend technologies, I've built products that users love.

My journey in tech started with a curiosity about how things work on the web, which quickly evolved into a passion for creating seamless digital experiences. I believe in writing clean, maintainable code and staying current with industry best practices.

When I'm not coding, you'll find me contributing to open-source projects, exploring new technologies, or learning about the latest in AI and machine learning.`,
  social: {
    github: "https://github.com/ravirajput10",
    linkedin: "https://linkedin.com/in/ravirajput10",
    email: "rajput.ravi7970@gmail.com",
  },
};
