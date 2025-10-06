import React, { useState, useEffect, useCallback } from 'react';
import { ApplicationFormData, Skill, ExperienceLevel } from '../types';
import { XIcon, CodeIcon, DesignIcon, HackerIcon } from './Icons';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = ["Personal Info", "Skills & Experience", "Motivation"];

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '', email: '', skill: '', experience: '', portfolioUrl: '', reason: ''
  });
  // FIX: The errors state should hold string messages for each field, not conform to ApplicationFormData types.
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = useCallback((name: keyof ApplicationFormData, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) error = 'Name is required.';
        break;
      case 'email':
        if (!value) error = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid.';
        break;
      case 'portfolioUrl':
        if (!value) error = 'URL is required.';
        else if (!/^(ftp|http|https|)\S+\.\S+$/.test(value)) error = 'URL is invalid.';
        break;
      case 'reason':
        if (!value) error = 'This field is required.';
        else if (value.length < 100) error = `Must be at least 100 characters. (${value.length}/100)`;
        break;
    }
    return error;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: keyof ApplicationFormData, value: string };
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSelectChange = (name: 'skill' | 'experience', value: Skill | ExperienceLevel) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({...prev, [name]: ''}));
  };

  const validateStep = () => {
    // FIX: The stepErrors object should hold string messages for each field.
    let stepErrors: Partial<Record<keyof ApplicationFormData, string>> = {};
    let isValid = true;
    if (currentStep === 0) {
      if (!formData.name) { stepErrors.name = 'Name is required.'; isValid = false; }
      if (!formData.email) { stepErrors.email = 'Email is required.'; isValid = false; }
      else if (!/\S+@\S+\.\S+/.test(formData.email)) { stepErrors.email = 'Email is invalid.'; isValid = false; }
    } else if (currentStep === 1) {
      if (!formData.skill) { stepErrors.skill = 'Primary skill is required.'; isValid = false; }
      if (!formData.experience) { stepErrors.experience = 'Experience level is required.'; isValid = false; }
      if (!formData.portfolioUrl) { stepErrors.portfolioUrl = 'Portfolio URL is required.'; isValid = false; }
      else if (!/^(ftp|http|https|)\S+\.\S+$/.test(formData.portfolioUrl)) { stepErrors.portfolioUrl = 'URL is invalid.'; isValid = false; }
    } else if (currentStep === 2) {
        if (!formData.reason) { stepErrors.reason = 'This field is required.'; isValid = false; }
        else if (formData.reason.length < 100) { stepErrors.reason = `Must be at least 100 characters. (${formData.reason.length}/100)`; isValid = false; }
    }
    setErrors(stepErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      console.log('Form Submitted:', formData);
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
        setFormData({ name: '', email: '', skill: '', experience: '', portfolioUrl: '', reason: '' });
        setErrors({});
        setCurrentStep(0);
        setIsSubmitted(false);
    }, 300);
  };
  
  useEffect(() => {
      if (!isOpen) {
        handleClose();
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up duration-500">
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden">
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-violet-400 transition-colors z-20">
          <XIcon className="h-6 w-6" />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 h-full relative overflow-hidden">
              {[...Array(20)].map((_, i) => (
                  <div key={i} className="absolute top-0 h-2 bg-violet-400 animate-confetti-rain" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, width: `${Math.random() * 6 + 4}px` }}/>
              ))}
            <h2 className="text-3xl font-bold text-white mb-4">Application Received!</h2>
            <p className="text-slate-300 mb-6">We will review your submission and contact you within 48 hours.</p>
            <button onClick={handleClose} className="px-6 py-2.5 bg-violet-500 text-slate-900 font-semibold rounded-md hover:bg-violet-400 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">Join Bount-X</h2>
              <p className="text-sm text-slate-400">Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</p>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mt-3">
                <div className="bg-violet-400 h-1.5 rounded-full" style={{ width: `${((currentStep + 1) / steps.length) * 100}%`, transition: 'width 0.3s ease-in-out' }}></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow">
              <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={`w-full bg-slate-900 border ${errors.name ? 'border-red-500' : 'border-slate-600'} text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none transition-colors`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`w-full bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-600'} text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none transition-colors`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Primary Skill</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[Skill.HACKER, Skill.DESIGNER, Skill.DEVELOPER].map(skill => (
                      <button type="button" key={skill} onClick={() => handleSelectChange('skill', skill)} className={`flex flex-col items-center p-3 border-2 rounded-md transition-colors ${formData.skill === skill ? 'border-violet-400 bg-violet-400/10' : 'border-slate-600 hover:border-violet-500'}`}>
                        {skill === Skill.HACKER && <HackerIcon className={`w-6 h-6 mb-1 ${formData.skill === skill ? 'text-violet-400' : 'text-slate-400'}`} />}
                        {skill === Skill.DESIGNER && <DesignIcon className={`w-6 h-6 mb-1 ${formData.skill === skill ? 'text-violet-400' : 'text-slate-400'}`} />}
                        {skill === Skill.DEVELOPER && <CodeIcon className={`w-6 h-6 mb-1 ${formData.skill === skill ? 'text-violet-400' : 'text-slate-400'}`} />}
                        <span className={`text-xs font-semibold ${formData.skill === skill ? 'text-white' : 'text-slate-300'}`}>{skill}</span>
                      </button>
                    ))}
                  </div>
                   {errors.skill && <p className="text-red-500 text-xs mt-1">{errors.skill}</p>}
                </div>
                 <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Experience Level</label>
                  <div className="grid grid-cols-3 gap-2">
                     {[ExperienceLevel.JUNIOR, ExperienceLevel.MID, ExperienceLevel.SENIOR].map(level => (
                        <button type="button" key={level} onClick={() => handleSelectChange('experience', level)} className={`p-3 border-2 rounded-md transition-colors text-sm font-semibold ${formData.experience === level ? 'border-violet-400 bg-violet-400/10 text-white' : 'border-slate-600 hover:border-violet-500 text-slate-300'}`}>
                          {level}
                        </button>
                      ))}
                  </div>
                   {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="portfolioUrl" className="block text-sm font-medium text-slate-300 mb-1">Portfolio/GitHub URL</label>
                  <input type="url" name="portfolioUrl" id="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} className={`w-full bg-slate-900 border ${errors.portfolioUrl ? 'border-red-500' : 'border-slate-600'} text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none transition-colors`} />
                  {errors.portfolioUrl && <p className="text-red-500 text-xs mt-1">{errors.portfolioUrl}</p>}
                </div>
              </div>

              <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                 <div className="mb-4">
                  <label htmlFor="reason" className="block text-sm font-medium text-slate-300 mb-1">Why do you want to join the Bount-X network?</label>
                  <textarea name="reason" id="reason" rows={5} value={formData.reason} onChange={handleChange} className={`w-full bg-slate-900 border ${errors.reason ? 'border-red-500' : 'border-slate-600'} text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none transition-colors`}></textarea>
                  <p className={`text-xs mt-1 ${formData.reason.length < 100 && errors.reason ? 'text-red-500' : 'text-slate-400'}`}>{errors.reason ? errors.reason : `${formData.reason.length}/100 characters`}</p>
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-slate-700 flex justify-between items-center bg-slate-800">
              <button type="button" onClick={handleBack} disabled={currentStep === 0} className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Back</button>
              {currentStep < steps.length - 1 ? (
                <button type="button" onClick={handleNext} className="px-6 py-2.5 bg-violet-500 text-slate-900 font-semibold rounded-md hover:bg-violet-400 transition-colors">Next</button>
              ) : (
                <button type="submit" onClick={handleSubmit} className="px-6 py-2.5 bg-violet-500 text-slate-900 font-semibold rounded-md hover:bg-violet-400 transition-colors">Submit Application</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;