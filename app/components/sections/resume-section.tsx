"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Download,
  Calendar,
  MapPin,
  Award,
  GraduationCap,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const experiences = [
  {
    title: "Backend Developer",
    company: "FnClick",
    period: "2025 - Present",
    location: "Bhaktapur, Liwali",
    description:
      "Leading development of next-generation web applications with AI integration.",
    achievements: [
      "Joined as a WordPress programmer in the trial phase",
      "Currently learning and adapting to the company's development workflow",
      "Gaining hands-on experience with WordPress, ACF, and AJAX",
    ],
    technologies: ["HTML", "CSS", "WORDPRESS", "AJAX", "ACF"],
  },
  {
    title: "Frontend Developer",
    company: "ProfoxStudio",
    period: "2023 - 2024",
    location: "Bhaktapur, Kaushaltar",
    description:
      "Built responsive web applications and improved user experience metrics by 40%.",
    achievements: [
      "Led the development of interactive web applications using WordPress and JavaScript.",
      "animations using Bootstrap CSS and GSAP. Collaborated with designers to create seamless user experiences. ",
      "Mentored junior developers and conducted code reviews.",
    ],
    technologies: ["HTML", "WORDPRESS", "BOOSTRAP CSS", "CSS", "JAVASCRIPT"],
  },
];

const education = [
  {
    degree: "Bachelor in computer application",
    school: "Swastik College",
    period: "2021 - present",
    location: "Bhaktapur, Chardobato",
    description: "Specialized in Web Development and Artificial Intelligence",
    achievements: [""],
  },
];

const certifications = [
  {
    name: "Broadway infoysis",
    issuer: "Frontend Developer",
    date: "2023",
    credentialId: "2023-001",
  },
];

export function ResumeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<
    "experience" | "education" | "certifications"
  >("experience");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/sample-resume.pdf";
    link.download = "sameir_lama_Resume.pdf";
    link.click();
  };

  return (
    <section
      id="resume"
      className="min-h-screen flex items-center py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Professional Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            A comprehensive timeline of experience, education, and achievements
          </p>

          <motion.button
            onClick={handleDownloadResume}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            Download Resume
          </motion.button>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-effect rounded-lg p-1 border border-white/10">
            {[
              { key: "experience", label: "Experience", icon: Briefcase },
              { key: "education", label: "Education", icon: GraduationCap },
              { key: "certifications", label: "Certifications", icon: Award },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as typeof activeTab)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === key
                    ? "bg-primary text-black"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Experience Timeline */}
          {activeTab === "experience" && (
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start mb-12 last:mb-0"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <motion.div
                    className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-black z-10"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  />

                  <div className="ml-20 glass-effect rounded-2xl p-6 border border-white/10 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-primary font-semibold">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end text-sm text-gray-400 mt-2 md:mt-0">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar size={14} />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <button
                      onClick={() => toggleExpanded(index)}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium mb-4"
                    >
                      {expandedItems.has(index) ? "Show Less" : "Show More"}
                      {expandedItems.has(index) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>

                    {expandedItems.has(index) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-4">
                          <h4 className="text-white font-semibold mb-2">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="text-gray-300 text-sm flex items-start gap-2"
                              >
                                <span className="text-primary mt-1">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-2">
                            Technologies:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Education Timeline */}
          {activeTab === "education" && (
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent" />

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start mb-12 last:mb-0"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <motion.div
                    className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-black z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  />

                  <div className="ml-20 glass-effect rounded-2xl p-6 border border-white/10 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {edu.degree}
                        </h3>
                        <p className="text-accent font-semibold">
                          {edu.school}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end text-sm text-gray-400 mt-2 md:mt-0">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar size={14} />
                          {edu.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {edu.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-4">
                      {edu.description}
                    </p>

                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="text-gray-300 text-sm flex items-start gap-2"
                          >
                            <span className="text-accent mt-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Certifications Grid */}
          {activeTab === "certifications" && (
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="glass-effect rounded-2xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="text-primary" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-primary font-semibold mb-1">
                        {cert.issuer}
                      </p>
                      <p className="text-gray-400 text-sm mb-2">
                        Issued: {cert.date}
                      </p>
                      <p className="text-gray-500 text-xs">
                        ID: {cert.credentialId}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-5" />
      <motion.div
        className="absolute top-1/3 right-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}
