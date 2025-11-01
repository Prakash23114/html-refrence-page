import React, { useState, useEffect, useId } from 'react';

// --- SVG Icons ---
const EditIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
  </svg>
);

const CloseIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PlusIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const ChevronDownIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const SunIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const GitHubIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);


// --- Custom Hook for Theme ---
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
};

// --- Reusable Components ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ title, onAdd, onEdit, editButtonAriaLabel }) => (
  <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
    <div className="flex items-center gap-3">
      {onAdd && (
        <button 
          onClick={onAdd}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white" 
          aria-label={`Add new ${title}`}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      )}
      {onEdit && (
        <button 
          onClick={onEdit} 
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white" 
          aria-label={editButtonAriaLabel || `Edit ${title}`}
        >
          <EditIcon />
        </button>
      )}
    </div>
  </div>
);

const FormButtons = ({ onSave, onCancel }) => (
  <div className="flex gap-2 mt-4">
    <button 
      onClick={onSave}
      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
    >
      Save
    </button>
    <button 
      onClick={onCancel}
      className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm"
    >
      Cancel
    </button>
  </div>
);

const ThemeToggleButton = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2"
    aria-label="Toggle dark mode"
  >
    {theme === 'light' ? <MoonIcon /> : <SunIcon />}
  </button>
);

// --- COMPONENT: ProfileSetupPage ---
// This is the form page for initial user setup.

const ProfileSetupPage = ({ onSave }) => {
  const [formData, setFormData] = useState({
    header: {
      name: 'Prakash Mandal',
      headline: 'Software Developer & Student at TCET',
      location: 'Mumbai, India',
    },
    about: "I'm a passionate software developer focused on building scalable web applications using modern technologies. Currently studying at TCET while exploring full-stack development, cloud technologies, and open-source contributions. I'm eager to learn and collaborate on meaningful projects.",
    experiences: [
      { id: 1, title: 'Junior Web Developer', company: 'TechStart Solutions', dates: 'Jan 2024 - Present', description: 'Building responsive web applications using React, Node.js, and MongoDB. Collaborating with cross-functional teams to deliver high-quality features.' }
    ],
    education: [
      { id: 1, degree: 'Bachelor of Technology', school: 'TCET (Thakur College of Engineering & Technology)', dates: '2023 - 2027', field: 'Computer Science and Engineering' }
    ]
  });

  // --- Header & About Handlers ---
  const handleHeaderChange = (e) => {
    setFormData(prev => ({ ...prev, header: { ...prev.header, [e.target.name]: e.target.value }}));
  };
  const handleAboutChange = (e) => {
    setFormData(prev => ({ ...prev, about: e.target.value }));
  };

  // --- Experience Handlers ---
  const handleExperienceChange = (id, e) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [e.target.name]: e.target.value } : exp
      )
    }));
  };
  const addExperience = () => {
    const newId = Math.max(0, ...formData.experiences.map(e => e.id)) + 1;
    setFormData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: newId, title: '', company: '', dates: '', description: '' }
      ]
    }));
  };
  const removeExperience = (id) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  // --- Education Handlers ---
  const handleEducationChange = (id, e) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [e.target.name]: e.target.value } : edu
      )
    }));
  };
  const addEducation = () => {
    const newId = Math.max(0, ...formData.education.map(e => e.id)) + 1;
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: newId, degree: '', school: '', dates: '', field: '' }
      ]
    }));
  };
  const removeEducation = (id) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the complete state up to the App
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Create Your Profile</h1>
        
        {/* Header Info */}
        <Card className="mb-6">
          <CardHeader title="Your Details" />
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name <span className="text-red-500">*</span></label>
              <input type="text" name="name" value={formData.header.name} onChange={handleHeaderChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Headline <span className="text-red-500">*</span></label>
              <input type="text" name="headline" value={formData.header.headline} onChange={handleHeaderChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location <span className="text-red-500">*</span></label>
              <input type="text" name="location" value={formData.header.location} onChange={handleHeaderChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required />
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card className="mb-6">
          <CardHeader title="About" />
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Write a bit about yourself <span className="text-red-500">*</span></label>
            <textarea name="about" value={formData.about} onChange={handleAboutChange} rows="5" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required></textarea>
          </div>
        </Card>

        {/* Experience Section */}
        <Card className="mb-6">
          <CardHeader title="Experience" onAdd={addExperience} />
          <div className="p-6 space-y-6">
            {formData.experiences.map((exp) => (
              <div key={exp.id} className="p-4 border rounded-lg dark:border-gray-700 relative">
                <button type="button" onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-red-500 hover:text-red-700 dark:hover:text-red-400">
                  <TrashIcon />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title <span className="text-red-500">*</span></label>
                    <input type="text" name="title" value={exp.title} onChange={(e) => handleExperienceChange(exp.id, e)} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company <span className="text-red-500">*</span></label>
                    <input type="text" name="company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, e)} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dates <span className="text-red-500">*</span></label>
                    <input type="text" name="dates" value={exp.dates} onChange={(e) => handleExperienceChange(exp.id, e)} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea name="description" value={exp.description} onChange={(e) => handleExperienceChange(exp.id, e)} rows="3" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2"></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Education Section */}
        <Card className="mb-6">
          <CardHeader title="Education" onAdd={addEducation} />
          <div className="p-6 space-y-6">
            {formData.education.map((edu) => (
              <div key={edu.id} className="p-4 border rounded-lg dark:border-gray-700 relative">
                <button type="button" onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-red-500 hover:text-red-700 dark:hover:text-red-400">
                  <TrashIcon />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Degree <span className="text-red-500">*</span></label>
                    <input type="text" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, e)} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">School <span className="text-red-500">*</span></label>
                    <input type="text" name="school" value={edu.school} onChange={(e) => handleEducationChange(edu.id, e)} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dates <span className="text-red-500">*</span></label>
                    <input type="text" name="dates" value={edu.dates} onChange={(e) => handleEducationChange(edu.id, e)} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Field of Study <span className="text-red-500">*</span></label>
                    <input type="text" name="field" value={edu.field} onChange={(e) => handleEducationChange(edu.id, e)} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" required />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-200 text-lg">
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
};



// --- COMPONENT: MainProfilePage ---
// This is the main profile display page. It receives data from the App controller.

// ProfileHeaderCard, AboutCard, etc. are defined here, but now they
// receive their initial data from props passed by MainProfilePage.

const ProfileHeaderCard = ({ headerData, onAddProfileClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(headerData); 
  const [formData, setFormData] = useState(headerData);

  const nameId = useId();
  const headlineId = useId();
  const locationId = useId();

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };
  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };
  const handleCancel = () => setIsEditing(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <div className="h-48 bg-gray-200 dark:bg-gray-700">
        <img src="https://placehold.co/1000x300/E0E7FF/4F46E5?text=Banner+Image" alt="Banner Image" className="w-full h-full object-cover opacity-80 dark:opacity-60" />
      </div>
      <div className="p-6 relative">
        <img src="https://placehold.co/150x150/4F46E5/FFFFFF?text=P" alt="Profile Picture" className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 -mt-20 shadow-lg" />
        <div className="flex justify-between items-start mt-4">
          {isEditing ? (
            <div className="w-full">
              {/* Edit Form */}
              <div className="flex flex-col gap-3">
                <div>
                  <label htmlFor={nameId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input type="text" id={nameId} name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2 text-lg" />
                </div>
                <div>
                  <label htmlFor={headlineId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Headline</label>
                  <input type="text" id={headlineId} name="headline" value={formData.headline} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label htmlFor={locationId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                  <input type="text" id={locationId} name="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
                </div>
              </div>
              <FormButtons onSave={handleSave} onCancel={handleCancel} />
            </div>
          ) : (
            <div>
              {/* Display View */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">{profile.headline}</p>
              <p className="text-md text-gray-500 dark:text-gray-400 mt-1">{profile.location}</p>
            </div>
          )}
          {!isEditing && (
            <button onClick={handleEdit} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex-shrink-0 ml-4" aria-label="Edit profile intro">
              <EditIcon />
            </button>
          )}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200">Open to Work</button>
          <button onClick={onAddProfileClick} className="bg-white text-blue-600 border border-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 transition duration-200">
            Add Profile Section
          </button>
        </div>
      </div>
    </Card>
  );
};

const AboutCard = ({ aboutData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(aboutData); 
  const [editContent, setEditContent] = useState(aboutData);
  const aboutId = useId();

  const handleSave = () => {
    setAbout(editContent);
    setIsEditing(false);
  };
  const handleEdit = () => {
    setEditContent(about);
    setIsEditing(true);
  };

  return (
    <Card>
      <CardHeader title="About" onEdit={handleEdit} editButtonAriaLabel="Edit about section" />
      <div className="p-6 pt-4">
        {isEditing ? (
          <div>
            <label htmlFor={aboutId} className="sr-only">About</label>
            <textarea id={aboutId} value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full h-40 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-3" rows="5"></textarea>
            <FormButtons onSave={handleSave} onCancel={() => setIsEditing(false)} />
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{about}</p>
        )}
      </div>
    </Card>
  );
};

// ... (ExperienceDisplay & ExperienceEditForm are defined above in ProfilePage)
const ExperienceDisplay = ({ exp, onEdit }) => (
  <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0 last:mb-0">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{exp.title}</h3>
        <p className="text-md text-gray-600 dark:text-gray-300">{exp.company}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{exp.dates}</p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
      </div>
      <button onClick={onEdit} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex-shrink-0 ml-4" aria-label={`Edit ${exp.title}`}>
        <EditIcon />
      </button>
    </div>
  </div>
);

const ExperienceEditForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const titleId = useId();
  const companyId = useId();
  const datesId = useId();
  const descId = useId();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSave = () => onSave(formData);

  return (
    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor={titleId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input type="text" id={titleId} name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor={companyId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
          <input type="text" id={companyId} name="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor={datesId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dates</label>
          <input type="text" id={datesId} name="dates" value={formData.dates} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor={descId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea id={descId} name="description" value={formData.description} onChange={handleChange} className="w-full h-24 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" rows="3"></textarea>
        </div>
        <FormButtons onSave={handleSave} onCancel={onCancel} />
      </div>
    </div>
  );
};


const ExperienceCard = ({ experiencesData }) => {
  const [experiences, setExperiences] = useState(experiencesData); 
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (id) => {
    setIsAdding(false);
    setEditingId(id);
  };
  const handleSave = (editedExp) => {
    setExperiences(experiences.map(exp => (exp.id === editedExp.id ? editedExp : exp)));
    setEditingId(null);
  };
  const handleAddNew = (newExp) => {
    const newId = Math.max(0, ...experiences.map(e => e.id)) + 1;
    setExperiences([...experiences, { ...newExp, id: newId }]);
    setIsAdding(false);
  };

  return (
    <Card>
      <CardHeader title="Experience" onAdd={() => { setIsAdding(true); setEditingId(null); }} />
      <div className="p-6 pt-4">
        {isAdding && (
          <ExperienceEditForm
            initialData={{ title: '', company: '', dates: '', description: '' }}
            onSave={handleAddNew}
            onCancel={() => setIsAdding(false)}
          />
        )}
        {experiences.map((exp) =>
          editingId === exp.id ? (
            <ExperienceEditForm key={exp.id} initialData={exp} onSave={handleSave} onCancel={() => setEditingId(null)} />
          ) : (
            <ExperienceDisplay key={exp.id} exp={exp} onEdit={() => handleEdit(exp.id)} />
          )
        )}
      </div>
    </Card>
  );
};

// ... (EducationDisplay & EducationEditForm are defined above in ProfilePage)
const EducationDisplay = ({ edu, onEdit }) => (
  <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0 last:mb-0">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{edu.degree}</h3>
        <p className="text-md text-gray-600 dark:text-gray-300">{edu.school}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{edu.dates}</p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{edu.field}</p>
      </div>
      <button onClick={onEdit} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex-shrink-0 ml-4" aria-label={`Edit ${edu.degree}`}>
        <EditIcon />
      </button>
    </div>
  </div>
);

const EducationEditForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const degreeId = useId();
  const schoolId = useId();
  const datesId = useId();
  const fieldId = useId();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSave = () => onSave(formData);

  return (
    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor={degreeId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Degree</label>
          <input type="text" id={degreeId} name="degree" value={formData.degree} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor={schoolId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">School</label>
          <input type="text" id={schoolId} name="school" value={formData.school} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor={datesId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dates</label>
          <input type="text" id={datesId} name="dates" value={formData.dates} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Field of Study</label>
          <input type="text" id={fieldId} name="field" value={formData.field} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
        </div>
        <FormButtons onSave={handleSave} onCancel={onCancel} />
      </div>
    </div>
  );
};

const EducationCard = ({ educationData }) => {
  const [educations, setEducations] = useState(educationData); 
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (id) => {
    setIsAdding(false);
    setEditingId(id);
  };
  const handleSave = (editedEdu) => {
    setEducations(educations.map(edu => (edu.id === editedEdu.id ? editedEdu : edu)));
    setEditingId(null);
  };
  const handleAddNew = (newEdu) => {
    const newId = Math.max(0, ...educations.map(e => e.id)) + 1;
    setEducations([...educations, { ...newEdu, id: newId }]);
    setIsAdding(false);
  };

  return (
    <Card>
      <CardHeader title="Education" onAdd={() => { setIsAdding(true); setEditingId(null); }} />
      <div className="p-6 pt-4">
        {isAdding && (
          <EducationEditForm initialData={{ degree: '', school: '', dates: '', field: '' }} onSave={handleAddNew} onCancel={() => setIsAdding(false)} />
        )}
        {educations.map((edu) =>
          editingId === edu.id ? (
            <EducationEditForm key={edu.id} initialData={edu} onSave={handleSave} onCancel={() => setEditingId(null)} />
          ) : (
            <EducationDisplay key={edu.id} edu={edu} onEdit={() => handleEdit(edu.id)} />
          )
        )}
      </div>
    </Card>
  );
};

// ... (ActivityGrid is defined above in ProfilePage)
const ActivityGrid = ({ activeYear }) => {
  const [cells, setCells] = useState([]);
  useEffect(() => {
    const daysToGenerate = 26 * 7;
    const newCells = [];
    const activityColors = [
      'bg-gray-100 dark:bg-gray-700', 'bg-green-200 dark:bg-green-900',
      'bg-green-400 dark:bg-green-700', 'bg-green-600 dark:bg-green-500'
    ];
    for (let i = 0; i < daysToGenerate; i++) {
      let colorClass = activityColors[0];
      const randomThreshold = activeYear === 2025 ? 0.3 : 0.5;
      if (Math.random() > randomThreshold) {
        colorClass = activityColors[Math.floor(Math.random() * (activityColors.length - 1)) + 1];
      }
      newCells.push(<div key={i} className={`w-full h-3 rounded-sm ${colorClass}`} title={`Activity on date ${i}`}></div>);
    }
    setCells(newCells);
  }, [activeYear]);
  return <div className="grid grid-flow-col grid-rows-7 gap-1 w-full" style={{ gridTemplateColumns: 'repeat(26, minmax(0, 1fr))' }}>{cells}</div>;
};

const ActivityCard = () => {
  const [activeYear, setActiveYear] = useState(2025);
  const setYear = (year) => (e) => {
    e.preventDefault();
    setActiveYear(year);
  };
  const getYearClasses = (year) => {
    const base = "text-sm hover:underline";
    return activeYear === year
      ? `${base} text-blue-600 dark:text-blue-400 font-medium`
      : `${base} text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400`;
  };
  return (
    <Card>
      <CardHeader title="Activity" />
      <div className="p-6 pt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Contributions</h3>
          <div className="flex gap-3">
            <a href="#" onClick={setYear(2025)} className={getYearClasses(2025)}>2025</a>
            <a href="#" onClick={setYear(2024)} className={getYearClasses(2024)}>2024</a>
          </div>
        </div>
        <div className="flex justify-end text-xs text-gray-400 dark:text-gray-500 gap-6 mb-1 pr-2">
          <span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1 text-xs text-gray-400 dark:text-gray-500" style={{ paddingTop: '1px' }}>
            <span className="h-3 w-6 text-right">Mon</span><span className="h-3 w-6"></span>
            <span className="h-3 w-6 text-right">Wed</span><span className="h-3 w-6"></span>
            <span className="h-3 w-6 text-right">Fri</span><span className="h-3 w-6"></span>
            <span className="h-3 w-6"></span>
          </div>
          <ActivityGrid activeYear={activeYear} />
        </div>
      </div>
    </Card>
  );
};

// ... (ConnectCard is defined above in ProfilePage)
const ConnectCard = () => (
  <Card>
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Connect</h2>
      <div className="flex gap-4">
        <a href="https://github.com/Prakash23114" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" aria-label="GitHub Profile">
          <GitHubIcon />
        </a>
        <a href="https://www.linkedin.com/in/prakash-mandal-337090339" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" aria-label="LinkedIn Profile">
          <LinkedInIcon />
        </a>
      </div>
    </div>
  </Card>
);

// ... (AddProfileModal is defined above in ProfilePage)
const AccordionItem = ({ title, description, links, isOpen, onToggle }) => (
  <details className="group" open={isOpen} onToggle={onToggle}>
    <summary className="flex justify-between items-center cursor-pointer list-none py-3 border-t border-gray-200 dark:border-gray-700 first:border-t-0">
      <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</span>
      <span className={`arrow text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
        <ChevronDownIcon />
      </span>
    </summary>
    {description && <p className="text-sm text-gray-600 dark:text-gray-400 pt-1 pb-3 px-1">{description}</p>}
    <div className="flex flex-col gap-1 pl-1 pb-2">
      {links.map((link) => (
        <a key={link} href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md">
          {link}
        </a>
      ))}
    </div>
  </details>
);

const AddProfileModal = ({ isOpen, onClose }) => {
  const [openSection, setOpenSection] = useState('core');
  if (!isOpen) return null;
  const sections = [
    { id: 'core', title: 'Core', description: 'Start with the basics...', links: ['Add about', 'Add education', 'Add position', 'Add services', 'Add career break', 'Add skills'] },
    { id: 'recommended', title: 'Recommended', links: ['Add projects', 'Add recommendations', 'Add licenses & certifications'] },
    { id: 'additional', title: 'Additional', links: ['Add courses', 'Add publications', 'Add volunteer experience'] },
  ];
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 z-40" onClick={onClose} aria-hidden="true"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 w-[90%] sm:w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add to profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white" aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {sections.map((section) => (
              <AccordionItem
                key={section.id}
                title={section.title}
                description={section.description}
                links={section.links}
                isOpen={openSection === section.id}
                onToggle={(e) => {
                  if (e.target.open) setOpenSection(section.id);
                  else if (openSection === section.id) setOpenSection(null);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};


function MainProfilePage({ initialData, onAddProfileClick, onEditProfile }) {
  // This component renders the layout.
  // State is managed by its children, initialized by `initialData`.
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left/Main Column */}
      <div className="md:col-span-2 flex flex-col gap-6">
        <ProfileHeaderCard headerData={initialData.header} onAddProfileClick={onAddProfileClick} />
        <AboutCard aboutData={initialData.about} />
        <ExperienceCard experiencesData={initialData.experiences} />
        <ActivityCard />
      </div>
      
      {/* Right Sidebar */}
      <div className="md:col-span-1 flex flex-col gap-6">
         <button 
           onClick={onEditProfile} 
           className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
         >
           Edit Full Profile
         </button>
        <ConnectCard />
        <EducationCard educationData={initialData.education} />
      </div>
    </div>
  );
}


// --- NEW Main App Component (Controller) ---
export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // This is the master state. 
  // `null` means the user needs to go through setup.
  const [profileData, setProfileData] = useState(null);

  const handleSaveProfile = (data) => {
    setProfileData(data);
  };
  
  // This function allows the user to go back to the main setup form
  const handleEditProfile = () => {
    // This will re-render the Setup Page
    setProfileData(null); 
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 font-sans antialiased transition-colors duration-200 min-h-screen">
      <div className="container mx-auto max-w-7xl p-4 md:p-8">
        
        <div className="flex justify-end mb-4">
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* This is the new page-switching logic */}
        {!profileData ? (
          // If no profile data, show the setup form
          <ProfileSetupPage onSave={handleSaveProfile} />
        ) : (
          // Otherwise, show the main profile
          <MainProfilePage 
            initialData={profileData} 
            onAddProfileClick={() => setIsModalOpen(true)} 
            onEditProfile={handleEditProfile} // Pass the function to go back
          />
        )}

      </div>
      
      {/* The modal is always available, but hidden by default */}
      <AddProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}