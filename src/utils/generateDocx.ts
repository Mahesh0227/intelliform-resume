
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const generateDocx = (resumeData: any) => {
  const {
    personalInfo,
    professionalObjective,
    workExperience,
    projects,
    education,
    skills,
    certifications
  } = resumeData;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: personalInfo.fullName, heading: "Title" }),
          new Paragraph({ text: `Email: ${personalInfo.email}` }),
          new Paragraph({ text: `Phone: ${personalInfo.phone}` }),
          new Paragraph({ text: `LinkedIn: ${personalInfo.linkedin}` }),
          new Paragraph({ text: `GitHub: ${personalInfo.github}` }),
          new Paragraph({ text: `Portfolio: ${personalInfo.portfolio}` }),
          new Paragraph({ text: " " }),

          new Paragraph({ text: "Professional Objective", heading: "Heading1" }),
          new Paragraph(professionalObjective.summary),
          new Paragraph({ text: " " }),

          new Paragraph({ text: "Work Experience", heading: "Heading1" }),
          ...workExperience.map((job: any) =>
            new Paragraph({
              children: [
                new TextRun({ text: `${job.jobTitle} at ${job.company} (${job.startDate} - ${job.current ? "Present" : job.endDate})`, bold: true }),
                new TextRun({ text: `\n${job.responsibilities.join(", ")}` }),
              ],
            })
          ),
          new Paragraph({ text: " " }),

          new Paragraph({ text: "Projects", heading: "Heading1" }),
          ...projects.map((project: any) =>
            new Paragraph({
              children: [
                new TextRun({ text: `${project.title} (${project.startDate} - ${project.endDate})`, bold: true }),
                new TextRun({ text: `\n${project.description}` }),
              ],
            })
          ),
          new Paragraph({ text: " " }),

          new Paragraph({ text: "Education", heading: "Heading1" }),
          ...education.map((edu: any) =>
            new Paragraph(`${edu.degree} at ${edu.institution} (${edu.startDate} - ${edu.endDate})`)
          ),
          new Paragraph({ text: " " }),

          new Paragraph({ text: "Skills", heading: "Heading1" }),
          ...skills.map((skill: any) => new Paragraph(`${skill.name} - ${skill.level}`)),

          new Paragraph({ text: " " }),
          new Paragraph({ text: "Certifications", heading: "Heading1" }),
          ...certifications.map((cert: any) =>
            new Paragraph(`${cert.title} from ${cert.organization} on ${cert.dateObtained}`)
          )
        ]
      }
    ]
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, `${personalInfo.fullName.replace(/\s+/g, "_")}_Resume.docx`);
  });
};
