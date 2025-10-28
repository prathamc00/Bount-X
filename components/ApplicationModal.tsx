import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ApplicationFormData, Skill, ExperienceLevel } from '../types';
import { XIcon, CodeIcon, DesignIcon, HackerIcon } from './Icons';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (formData: ApplicationFormData) => void;
}

const steps = ["Personal Info", "Skills & Experience", "Motivation"];

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '', email: '', phone: '', skill: '', experience: '', portfolioUrl: '', reason: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
      case 'phone':
        if (!value) error = 'Phone number is required.';
        else if (!/^[+]?[0-9\s-()]{10,20}$/.test(value)) error = 'Phone number is invalid.';
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
    let stepErrors: Partial<Record<keyof ApplicationFormData, string>> = {};
    let isValid = true;
    if (currentStep === 0) {
      if (!formData.name) { stepErrors.name = 'Name is required.'; isValid = false; }
      if (!formData.email) { stepErrors.email = 'Email is required.'; isValid = false; }
      else if (!/\S+@\S+\.\S+/.test(formData.email)) { stepErrors.email = 'Email is invalid.'; isValid = false; }
      if (!formData.phone) { stepErrors.phone = 'Phone number is required.'; isValid = false; }
      else if (!/^[+]?[0-9\s-()]{10,20}$/.test(formData.phone)) { stepErrors.phone = 'Phone number is invalid.'; isValid = false; }
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
      setIsSubmitted(true);
      setTimeout(() => {
        onSubmitSuccess(formData);
      }, 2500); // Wait for confetti animation
    }
  };

  const resetState = useCallback(() => {
    setFormData({ name: '', email: '', phone: '', skill: '', experience: '', portfolioUrl: '', reason: '' });
    setErrors({});
    setCurrentStep(0);
    setIsSubmitted(false);
  }, []);
  
  const handleClose = useCallback(() => {
    onClose();
    setTimeout(resetState, 300); // Delay reset to allow for closing animation
  }, [onClose, resetState]);
  
  useEffect(() => {
      if (!isOpen && (currentStep !== 0 || isSubmitted)) {
         setTimeout(resetState, 300);
      }
  }, [isOpen, currentStep, isSubmitted, resetState]);

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusableElements || focusableElements.length === 0) return;
  
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
  
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };
      
      setTimeout(() => {
        modalRef.current?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )?.focus();
      }, 100);

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleClose]);


  if (!isOpen) return null;
  
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up duration-500">
      <div 
        ref={modalRef}
        className="bordered-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-fuchsia-400 transition-colors z-20 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400">
          <span className="sr-only">Close application form</span>
          <XIcon className="h-6 w-6" />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 h-full relative overflow-hidden">
              {[...Array(30)].map((_, i) => (
                  <div key={i} aria-hidden="true" className="absolute top-0 h-2 bg-fuchsia-400 animate-confetti-rain" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, width: `${Math.random() * 6 + 4}px` }}/>
              ))}
            <h2 className="text-3xl font-bold text-white mb-4">Application Received!</h2>
            <p className="text-slate-300 mb-6">Redirecting you to your application status page...</p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-slate-800">
              <h2 id="modal-title" className="text-2xl font-bold font-mono text-white">Join Bount-X</h2>
              <p className="text-sm text-slate-400">Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</p>
              <div 
                className="w-full bg-slate-700 rounded-full h-1.5 mt-3"
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep]}`}
              >
                <div className="bg-fuchsia-500 h-1.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.3s ease-in-out' }}></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow">
              <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={`w-full bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-colors`} />
                  {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={`w-full bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-colors`} />
                  {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                 <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder="+91" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} className={`w-full bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-colors`} />
                  {errors.phone && <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                <div className="mb-4">
                  <label id="skill-label" className="block text-sm font-medium text-slate-300 mb-2">Primary Skill</label>
                  <div role="radiogroup" aria-labelledby="skill-label" className="grid grid-cols-3 gap-2">
                    {[Skill.HACKER, Skill.DESIGNER, Skill.DEVELOPER].map(skill => (
                      <button type="button" key={skill} role="radio" aria-checked={formData.skill === skill} onClick={() => handleSelectChange('skill', skill)} className={`flex flex-col items-center p-3 border-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 ${formData.skill === skill ? 'border-fuchsia-500 bg-fuchsia-500/10' : 'border-slate-600 hover:border-fuchsia-500/50'}`}>
                        {skill === Skill.HACKER && <HackerIcon className={`w-6 h-6 mb-1 ${formData.skill === skill ? 'text-fuchsia-400' : 'text-slate-400'}`} />}
                        {skill === Skill.DESIGNER && <DesignIcon className={`w-6 h-6 mb-1 ${formData.skill === skill ? 'text-fuchsia-400' : 'text-slate-400'}`} />}
                        {skill === Skill.DEVELOPER && <CodeIcon className={`w-6 h-6 mb-1 ${formData.skill === skill ? 'text-fuchsia-400' : 'text-slate-400'}`} />}
                        <span className={`text-xs font-semibold ${formData.skill === skill ? 'text-white' : 'text-slate-300'}`}>{skill}</span>
                      </button>
                    ))}
                  </div>
                   {errors.skill && <p className="text-red-500 text-xs mt-1">{errors.skill}</p>}
                </div>
                 <div className="mb-4">
                  <label id="experience-label" className="block text-sm font-medium text-slate-300 mb-2">Experience Level</label>
                  <div role="radiogroup" aria-labelledby="experience-label" className="grid grid-cols-3 gap-2">
                     {[ExperienceLevel.JUNIOR, ExperienceLevel.MID, ExperienceLevel.SENIOR].map(level => (
                        <button type="button" key={level} role="radio" aria-checked={formData.experience === level} onClick={() => handleSelectChange('experience', level)} className={`p-3 border-2 rounded-lg transition-colors text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 ${formData.experience === level ? 'border-fuchsia-500 bg-fuchsia-500/10 text-white' : 'border-slate-600 hover:border-fuchsia-500/50 text-slate-300'}`}>
                          {level}
                        </button>
                      ))}
                  </div>
                   {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="portfolioUrl" className="block text-sm font-medium text-slate-300 mb-1">Portfolio/GitHub URL</label>
                  <input type="url" name="portfolioUrl" id="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} aria-invalid={!!errors.portfolioUrl} aria-describedby={errors.portfolioUrl ? 'portfolio-error' : undefined} className={`w-full bg-slate-800 border ${errors.portfolioUrl ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-colors`} />
                  {errors.portfolioUrl && <p id="portfolio-error" className="text-red-500 text-xs mt-1">{errors.portfolioUrl}</p>}
                </div>
              </div>

              <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                 <div className="mb-4">
                  <label htmlFor="reason" className="block text-sm font-medium text-slate-300 mb-1">Why do you want to join Bount-X?</label>
                  <textarea name="reason" id="reason" rows={5} value={formData.reason} onChange={handleChange} aria-invalid={!!errors.reason} aria-describedby={errors.reason ? 'reason-error' : undefined} className={`w-full bg-slate-800 border ${errors.reason ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-colors`}></textarea>
                  <p id="reason-error" className={`text-xs mt-1 ${formData.reason.length < 100 && errors.reason ? 'text-red-500' : 'text-slate-400'}`}>{errors.reason ? errors.reason : `${formData.reason.length}/100 characters`}</p>
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-slate-800 flex justify-between items-center bg-slate-900/50">
              <button type="button" onClick={handleBack} disabled={currentStep === 0} className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-slate-800">Back</button>
              {currentStep < steps.length - 1 ? (
                <button type="button" onClick={handleNext} className="px-6 py-2.5 text-white font-semibold rounded-lg btn-gradient transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-slate-800">Next</button>
              ) : (
                <button type="submit" onClick={handleSubmit} className="px-6 py-2.5 text-white font-semibold rounded-lg btn-gradient transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-slate-800">Submit Application</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;