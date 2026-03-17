import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const ApplicationForm = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be under 5MB. Please compress your PDF and try again.');
        e.target.value = '';
        setFileName('');
        return;
      }
      setFileName(file.name);
    }
  };

  return (
    <motion.div
      className="application-glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="app-header">
        <h1 className="app-title">
          Apply for the <span className="text-gradient">DiagnoSphere X</span><br />
          Founding Internship Program
        </h1>
      </div>

      {/*
        Uses a NATIVE HTML POST to formsubmit.co — this is required because
        FormSubmit's AJAX/fetch API does NOT support file attachments.
        The native POST is the only way to transmit actual PDF resumes as email attachments.
        FormSubmit redirects to the _next URL (/apply-success) after submission.
      */}
      <form
        className="application-form"
        action="https://formsubmit.co/diagnospherex@gmail.com"
        method="POST"
        encType="multipart/form-data"
      >
        {/* FormSubmit hidden configuration */}
        <input type="hidden" name="_subject" value="New Internship Application - DiagnoSphere X" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={`${window.location.origin}/apply-success`} />
        <input type="hidden" name="_cc" value="tejtharuntej7@gmail.com" />

        {/* Personal Information */}
        <div className="form-section">
          <h3 className="section-heading">Personal Information</h3>
          <div className="input-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="Name" required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="Email" required placeholder="john@university.edu" />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="Phone" required placeholder="+91 9876543210" />
            </div>
            <div className="form-group">
              <label>City and Country *</label>
              <input type="text" name="Location" required placeholder="Hyderabad, India" />
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="form-section">
          <h3 className="section-heading">Education</h3>
          <div className="input-grid">
            <div className="form-group full-width">
              <label>University or College *</label>
              <input type="text" name="University" required placeholder="State University" />
            </div>
            <div className="form-group">
              <label>Degree or Course *</label>
              <input type="text" name="Degree" required placeholder="B.Tech Computer Science" />
            </div>
            <div className="form-group">
              <label>Year of Study *</label>
              <select name="Year" required defaultValue="">
                <option value="" disabled>Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
                <option value="Recent Graduate">Recent Graduate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Professional Profiles */}
        <div className="form-section">
          <h3 className="section-heading">Professional Profiles</h3>
          <div className="input-grid">
            <div className="form-group">
              <label>LinkedIn Profile (optional)</label>
              <input type="url" name="LinkedIn" placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="form-group">
              <label>Portfolio or GitHub (optional)</label>
              <input type="url" name="Portfolio" placeholder="https://github.com/..." />
            </div>
          </div>
        </div>

        {/* Role & Interest */}
        <div className="form-section">
          <h3 className="section-heading">Role & Interest</h3>
          <div className="form-group full-width">
            <label>Which internship role are you applying for? *</label>
            <select name="Role" required defaultValue="">
              <option value="" disabled>Select a role...</option>
              <option value="AI Research Intern">AI Research Intern</option>
              <option value="Biomedical Engineering Intern">Biomedical Engineering Intern</option>
              <option value="Frontend Development Intern">Frontend Development Intern</option>
              <option value="Product Research Intern">Product Research Intern</option>
              <option value="Technical Exploration Intern">Technical Exploration Intern</option>
            </select>
          </div>

          <div className="form-group full-width mt-4">
            <label>Why are you interested in this internship? *</label>
            <textarea
              name="Why_Interested"
              required
              rows={5}
              placeholder="Tell us about your passion for healthcare technology and what you hope to explore..."
            />
          </div>

          <div className="form-group full-width mt-4">
            <label>How did you hear about us?</label>
            <select name="Referral_Source" defaultValue="">
              <option value="">Select an option (Optional)</option>
              <option value="Instagram">Instagram</option>
              <option value="Friend or Colleague">Friend or Colleague</option>
              <option value="College / University">College / University</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Search Engine">Search Engine</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="form-section">
          <h3 className="section-heading">Resume Upload</h3>
          <div className="upload-container">
            <input
              type="file"
              id="resume-upload"
              name="attachment"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              required
              className="hidden-upload"
            />
            <label htmlFor="resume-upload" className="upload-label">
              <Upload size={24} className="upload-icon" />
              <span className="upload-text">
                {fileName ? fileName : 'Click to upload your resume'}
              </span>
              <span className="upload-hint">PDF only, maximum 5MB</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <motion.button
            type="submit"
            className="btn-primary ripple-btn glow-effect submit-btn"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Application
          </motion.button>
        </div>

        <div className="program-notes">
          <p className="note-text">
            * This internship program is part of the early exploration phase of the DiagnoSphere X platform.
            Selected participants will collaborate on research, ideas, and early concepts related to AI-powered healthcare technology.
          </p>
          <p className="note-text highlight-note">
            Interns who actively contribute during the program will receive an official Certificate of Internship from DiagnoSphere X.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default ApplicationForm;
