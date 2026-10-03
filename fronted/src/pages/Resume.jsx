import { Link, Navigate } from "react-router-dom";

function Resume() {
  const savedData = localStorage.getItem("resumeData");

  if (!savedData) {
    return <Navigate to="/" replace />;
  }

  const resumeData = JSON.parse(savedData);

  const handleSavePdf = () => {
    window.print();
  };

  const imageSource = resumeData.imagePreview || resumeData.imageUrl || "";

  const fullName = resumeData.name || "[Your Full Name]";
  const professionalTitle =
    resumeData.jobTitle || "[Your Professional Title]";
  const email = resumeData.email || "[your.email@example.com]";
  const phone = resumeData.phone || "[+92 300 0000000]";
  const linkedin = resumeData.linkedin || "";
  const github = resumeData.github || "";
  const summary =
    resumeData.summary ||
    "[Write a concise 2–3 line professional summary here.]";

  return (
    <main className="min-h-screen bg-slate-200 px-4 py-8 sm:px-6 print:bg-white print:p-0">
      {/* Resume Area: This section will be printed/saved as PDF */}
      <section
        id="resume-template"
        className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white p-7 text-slate-900 shadow-2xl print:min-h-0 print:max-w-none print:p-8 print:shadow-none"
      >
        {/* Header */}
        <header className="flex flex-col gap-6 border-b-2 border-[#0f6db5] pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border-4 border-[#dceaf7] bg-slate-100">
              {imageSource ? (
                <img
                  src={imageSource}
                  alt={`${fullName}'s profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl text-slate-400">
                  👤
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h1 className="break-words text-2xl font-extrabold uppercase leading-tight text-slate-950 sm:text-3xl">
                {fullName}
              </h1>

              <p className="mt-1 break-words text-lg font-bold text-[#0f6db5]">
                {professionalTitle}
              </p>
            </div>
          </div>

          <div className="space-y-1 text-left text-sm text-slate-700 sm:max-w-[260px] sm:text-right">
            <p className="break-all">{email}</p>
            <p>{phone}</p>

            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="block break-all font-medium text-[#0f6db5] underline"
              >
                LinkedIn
              </a>
            )}

            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="block break-all font-medium text-[#0f6db5] underline"
              >
                GitHub
              </a>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mt-6">
          <h2 className="bg-[#dceaf7] px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-slate-950">
            Professional Summary
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-700">{summary}</p>
        </section>

        {/* Technical Skills */}
        <section className="mt-6">
          <h2 className="bg-[#dceaf7] px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-slate-950">
            Technical Skills
          </h2>

          <div className="mt-3 grid gap-x-8 gap-y-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            <p>
              <span className="font-bold text-slate-950">
                Programming Languages:
              </span>{" "}
              {resumeData.programmingLanguages || "[Add languages]"}
            </p>

            <p>
              <span className="font-bold text-slate-950">
                Frameworks & Libraries:
              </span>{" "}
              {resumeData.frameworks || "[Add frameworks]"}
            </p>

            <p>
              <span className="font-bold text-slate-950">
                Backend / Databases:
              </span>{" "}
              {resumeData.backend || "[Add backend skills]"}
            </p>

            <p>
              <span className="font-bold text-slate-950">Tools & IDEs:</span>{" "}
              {resumeData.tools || "[Add tools]"}
            </p>

            
            
          </div>
        </section>

        {/* Experience - Responsibilities deliberately excluded */}
        <section className="mt-6">
          <h2 className="bg-[#dceaf7] px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-slate-950">
            Experience
          </h2>

          <div className="mt-3">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-base font-extrabold uppercase text-[#0f6db5]">
                  {resumeData.companyName || "[Company Name]"}
                </h3>

                <p className="text-sm font-semibold text-slate-800">
                  {resumeData.experienceJobTitle || "[Job Title]"}
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-600">
                {resumeData.duration || "[Duration]"}
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mt-6">
          <h2 className="bg-[#dceaf7] px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-slate-950">
            Projects
          </h2>

          <div className="mt-3">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-slate-950">
                  {resumeData.projectName || "[Project Name]"}
                </h3>

                <p className="mt-0.5 text-sm font-semibold text-[#0f6db5]">
                  {resumeData.projectTechStack || "[Tech Stack]"}
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-700">
                  {resumeData.projectDescription ||
                    "[Write a one-line project description.]"}
                </p>
              </div>

              <div className="flex shrink-0 gap-3 text-sm font-bold">
                {resumeData.githubProject && (
                  <a
                    href={resumeData.githubProject}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0f6db5] underline"
                  >
                    GitHub
                  </a>
                )}

                {resumeData.liveDemo && (
                  <a
                    href={resumeData.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0f6db5] underline"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mt-6">
          <h2 className="bg-[#dceaf7] px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-slate-950">
            Education
          </h2>

          <div className="mt-3 flex flex-col justify-between gap-1 text-sm sm:flex-row sm:items-center">
            <div>
              <h3 className="font-extrabold text-slate-950">
                {resumeData.degree || "[Degree Name]"}
              </h3>

              <p className="text-slate-700">
                {resumeData.university || "[Institute / University]"}
              </p>
            </div>

            <p className="font-semibold text-slate-600">
              {resumeData.educationYear || "[Year / CGPA]"}
            </p>
          </div>
        </section>
      </section>

      {/* Buttons: print mein hide ho jayenge */}
      <section className="mx-auto mt-6 flex w-full max-w-[794px] flex-col gap-3 sm:flex-row print:hidden">
        <button
          type="button"
          onClick={handleSavePdf}
          className="flex-1 rounded-xl bg-[#0f6db5] px-5 py-3.5 text-center font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-[#095b99] focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          Save Resume as PDF
        </button>

        <Link
          to="/"
          className="flex-1 rounded-xl border-2 border-[#0f6db5] bg-white px-5 py-3.5 text-center font-bold text-[#0f6db5] transition hover:bg-blue-50"
        >
          ← Edit Resume
        </Link>
      </section>

      <style>{`
        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          #resume-template,
          #resume-template * {
            visibility: visible;
          }

          #resume-template {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            min-height: 100%;
          }
        }
      `}</style>
    </main>
  );
}

export default Resume;