import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobTitle: "",
    phone: "",
    summary: "",

    programmingLanguages: "",
    frameworks: "",
    backend: "",
    tools: "",

    companyName: "",
    experienceJobTitle: "",
    duration: "",

    projectName: "",
    projectTechStack: "",
    projectDescription: "",
    githubProject: "",
    liveDemo: "",

    degree: "",
    university: "",
    educationYear: "",
  });

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select only an image file.");
      setImage(null);
      setImageName("");
      setPreview("");
      return;
    }

    setError("");
    setImage(selectedFile);
    setImageName(selectedFile.name);

    const imagePreviewUrl = URL.createObjectURL(selectedFile);
    setPreview(imagePreviewUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || !trimmedEmail || !image) {
      setError("Please fill Name, Email and select an Image.");
      return;
    }

    const localResumeData = {
      ...formData,
      name: trimmedName,
      email: trimmedEmail,
      imageName,
      imagePreview: preview,
      imageUrl: preview,
    };

    try {
      setError("");
      setLoading(true);

      const uploadFormData = new FormData();

      uploadFormData.append("name", trimmedName);
      uploadFormData.append("email", trimmedEmail);
      uploadFormData.append("title", trimmedName);
      uploadFormData.append("media", image);

      const response = await fetch(
        "https://resume-final-gamma.vercel.app/api/media/upload",
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed. Please try again.");
      }

      const data = await response.json();

      const uploadedImagePath =
        data.data?.media ||
        data.data?.imageUrl ||
        data.image ||
        data.imageUrl ||
        "";

      const imageUrl = uploadedImagePath.startsWith("http")
        ? uploadedImagePath
        : `https://resume-final-gamma.vercel.app/${uploadedImagePath.replace(/^\/+/, "")}`;

      const resumeData = {
        ...formData,

        name: data.data?.title || trimmedName,
        email: data.data?.email || trimmedEmail,

        imageName,
        imagePreview: uploadedImagePath ? imageUrl : preview,
        imageUrl: uploadedImagePath ? imageUrl : preview,
      };

      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    } catch (error) {
      console.warn(
        "Backend upload unavailable, using local resume preview.",
        error
      );

      localStorage.setItem(
        "resumeData",
        JSON.stringify(localResumeData)
      );
    } finally {
      setLoading(false);
      navigate("/resume");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 px-4 py-8 sm:px-6">
      <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-300/50">
        <div className="bg-[#0f6db5] px-6 py-8 text-white sm:px-10">
          <p className="mb-2 text-xs font-bold tracking-[0.25em] text-blue-100">
            ONE PAGE RESUME BUILDER
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Create Your Resume
          </h1>

          <p className="mt-2 text-sm text-blue-100">
            Fill your details to create a clean, professional one-page resume.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 p-5 sm:p-8">
          {/* Personal Information */}
          <section>
            <h2 className="mb-5 bg-[#dceaf7] px-4 py-3 text-lg font-bold uppercase tracking-wide text-slate-900">
              Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Full Name
                </label>

                <input
                  name="name"
                  type="text"
                  placeholder="e.g. Muhammad Ali"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Email Address
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="e.g. yourname@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Professional Title
                </label>

                <input
                  name="jobTitle"
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Phone Number
                </label>

                <input
                  name="phone"
                  type="tel"
                  placeholder="e.g. +92 300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Profile Image */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Profile Image
              </label>

              <label
                htmlFor="image"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-6 text-center transition hover:border-[#0f6db5] hover:bg-blue-100"
              >
                <span className="mb-2 text-3xl">📷</span>

                <span className="font-semibold text-[#0f6db5]">
                  Click to upload profile image
                </span>

                <span className="mt-1 text-xs text-slate-500">
                  JPG, JPEG or PNG image allowed
                </span>

                {imageName && (
                  <span className="mt-3 max-w-full truncate rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600">
                    Selected: {imageName}
                  </span>
                )}
              </label>

              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {preview && (
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="h-20 w-20 rounded-lg border-4 border-blue-200 object-cover shadow-md"
                  />

                  <p className="text-sm text-slate-600">
                    Your image will appear at the top-left of your resume.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Professional Summary */}
          <section>
            <h2 className="mb-5 bg-[#dceaf7] px-4 py-3 text-lg font-bold uppercase tracking-wide text-slate-900">
              Professional Summary
            </h2>

            <textarea
              name="summary"
              rows="4"
              placeholder="Write a short 2–3 line professional introduction..."
              value={formData.summary}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="mb-5 bg-[#dceaf7] px-4 py-3 text-lg font-bold uppercase tracking-wide text-slate-900">
              Technical Skills
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="programmingLanguages"
                type="text"
                placeholder="Programming Languages: JavaScript, Python"
                value={formData.programmingLanguages}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <input
                name="frameworks"
                type="text"
                placeholder="Frameworks: React, Next.js, Tailwind CSS"
                value={formData.frameworks}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <input
                name="backend"
                type="text"
                placeholder="Backend / Databases: Node.js, MongoDB"
                value={formData.backend}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <input
                name="tools"
                type="text"
                placeholder="Tools & IDEs: GitHub, VS Code"
                value={formData.tools}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="mb-5 bg-[#dceaf7] px-4 py-3 text-lg font-bold uppercase tracking-wide text-slate-900">
              Experience
            </h2>

            <div className="grid gap-5 md:grid-cols-3">
              <input
                name="companyName"
                type="text"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <input
                name="experienceJobTitle"
                type="text"
                placeholder="Job Title"
                value={formData.experienceJobTitle}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <input
                name="duration"
                type="text"
                placeholder="Duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="mb-5 bg-[#dceaf7] px-4 py-3 text-lg font-bold uppercase tracking-wide text-slate-900">
              Projects
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="projectName"
                type="text"
                placeholder="Project Name"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <input
                name="projectTechStack"
                type="text"
                placeholder="Tech Stack"
                value={formData.projectTechStack}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <input
                name="projectDescription"
                type="text"
                placeholder="Short Project Description"
                value={formData.projectDescription}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100 md:col-span-2"
              />

              
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="mb-5 bg-[#dceaf7] px-4 py-3 text-lg font-bold uppercase tracking-wide text-slate-900">
              Education
            </h2>

            <div className="grid gap-5 md:grid-cols-3">
              <input
                name="degree"
                type="text"
                placeholder="Degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <input
                name="university"
                type="text"
                placeholder="Institute / University"
                value={formData.university}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <input
                name="educationYear"
                type="text"
                placeholder="Year / CGPA"
                value={formData.educationYear}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0f6db5] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </section>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0f6db5] px-5 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:scale-[1.01] hover:bg-[#095b99] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? "Uploading..." : "Create My Resume →"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default UploadForm;