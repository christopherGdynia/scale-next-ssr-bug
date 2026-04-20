"use client";

import {
  ScaleCard,
  ScaleTag,
  ScaleDivider,
  ScaleButton,
  ScaleAccordion,
  ScaleCollapsible,
} from "@telekom/scale-components-react";

const teamMembers = [
  {
    name: "Anna Schmidt",
    role: "Projektmanagerin",
    department: "Produktmanagement",
    email: "anna.schmidt@example.com",
    skills: ["Scrum", "Jira", "Kommunikation"],
  },
  {
    name: "Markus Weber",
    role: "Senior Frontend-Entwickler",
    department: "Engineering",
    email: "markus.weber@example.com",
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    name: "Lisa Müller",
    role: "UX Designerin",
    department: "Design",
    email: "lisa.mueller@example.com",
    skills: ["Figma", "User Research", "Prototyping"],
  },
  {
    name: "Thomas Braun",
    role: "Backend-Entwickler",
    department: "Engineering",
    email: "thomas.braun@example.com",
    skills: ["Node.js", "PostgreSQL", "Docker"],
  },
  {
    name: "Sarah Koch",
    role: "QA Ingenieurin",
    department: "Qualitätssicherung",
    email: "sarah.koch@example.com",
    skills: ["Cypress", "Jest", "Testplanung"],
  },
  {
    name: "Jan Fischer",
    role: "DevOps Engineer",
    department: "Engineering",
    email: "jan.fischer@example.com",
    skills: ["Kubernetes", "CI/CD", "AWS"],
  },
];

const faqs = [
  {
    question: "Wie kann ich dem Team beitreten?",
    answer: "Bewerbungen können über unser Karriereportal eingereicht werden. Offene Stellen werden regelmäßig aktualisiert.",
  },
  {
    question: "Wie ist das Team organisiert?",
    answer: "Wir arbeiten in cross-funktionalen Squads nach dem agilen Framework. Jedes Squad hat einen Product Owner und Scrum Master.",
  },
  {
    question: "Welche Technologien werden eingesetzt?",
    answer: "Primär Next.js, React, TypeScript im Frontend und Node.js mit PostgreSQL im Backend. Deployment über AWS und Kubernetes.",
  },
];

export default function TeamContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Unser Team</h1>
      <p className="text-gray-500 mb-8">
        Lernen Sie die Menschen hinter dem Projekt kennen
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {teamMembers.map((member) => (
          <ScaleCard key={member.name}>
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-[#e20074] flex items-center justify-center text-white text-xl font-bold mb-4">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500 text-sm mb-1">{member.role}</p>
              <ScaleTag size="small" className="mb-3">
                {member.department}
              </ScaleTag>
              <ScaleDivider className="my-3" />
              <p className="text-sm text-gray-500 mb-3">{member.email}</p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <ScaleTag key={skill} size="small" variant="strong">
                    {skill}
                  </ScaleTag>
                ))}
              </div>
            </div>
          </ScaleCard>
        ))}
      </div>

      <ScaleDivider className="my-10" />

      <h2 className="text-2xl font-semibold mb-6">Häufige Fragen</h2>
      <ScaleAccordion>
        {faqs.map((faq) => (
          <ScaleCollapsible key={faq.question} heading={faq.question}>
            <p className="p-4 text-gray-600">{faq.answer}</p>
          </ScaleCollapsible>
        ))}
      </ScaleAccordion>

      <div className="mt-10 text-center">
        <ScaleButton>Kontakt aufnehmen</ScaleButton>
      </div>
    </div>
  );
}
