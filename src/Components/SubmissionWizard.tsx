// import { useState } from 'react'

// interface SubmissionWizardProps {
//   onClose: () => void
// }

// const SubmissionWizard = ({ onClose }: SubmissionWizardProps) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitError, setSubmitError] = useState('')
//   const [formData, setFormData] = useState({
//     title: '',
//     authors: '',
//     institution: '',
//     keywords: '',
//     submissionLink: ''
//   })

//   const steps = [
//     { number: 1, title: 'Paper Details' },
//     { number: 2, title: 'Submission Link' },
//     { number: 3, title: 'Review & Submit' }
//   ]

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//   }

//   const validateLink = (link: string) => {
//     // Basic URL validation
//     try {
//       new URL(link)
//       return true
//     } catch {
//       return false
//     }
//   }

//   const handleContinue = async () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1)
//     } else {
//       // Handle final submission
//       setIsSubmitting(true)
//       setSubmitError('')

//       try {
//         const token = localStorage.getItem('authToken') // Assuming you store JWT token in localStorage

//         if (!token) {
//           setSubmitError('Authentication required. Please log in.')
//           setIsSubmitting(false)
//           return
//         }

//         const response = await fetch('/api/submit', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             title: formData.title,
//             authors: formData.authors,
//             institution: formData.institution,
//             keywords: formData.keywords,
//             submissionLink: formData.submissionLink
//           })
//         })

//         if (response.ok) {
//           console.log('Submission successful!')
//           onClose()
//           // You might want to show a success message or redirect
//         } else {
//           const errorData = await response.json().catch(() => ({ message: 'Submission failed' }))
//           setSubmitError(errorData.message || 'Submission failed. Please try again.')
//         }
//       } catch (error) {
//         console.error('Error submitting:', error)
//         setSubmitError('Network error. Please check your connection and try again.')
//       } finally {
//         setIsSubmitting(false)
//       }
//     }
//   }

//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   return (
//     <div style={{
//       padding: '2rem',
//       backgroundColor: '#F8FAFC',
//       minHeight: '100vh',
//       fontFamily: 'system-ui, -apple-system, sans-serif'
//     }}>
//       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//         {/* Header Card */}
//         <div style={{
//           backgroundColor: 'white',
//           borderRadius: '12px',
//           padding: '1.5rem',
//           marginBottom: '1.5rem',
//           boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//         }}>
//           <h1 style={{
//             fontSize: '1.5rem',
//             fontWeight: 'bold',
//             color: '#2563EB',
//             margin: '0 0 1rem 0'
//           }}>
//             Submission Wizard
//           </h1>

//           {/* Progress Bar */}
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '0.5rem'
//           }}>
//             {steps.map((step) => (
//               <div key={step.number} style={{ flex: 1 }}>
//                 <div style={{
//                   height: '8px',
//                   backgroundColor: step.number <= currentStep ? '#2563EB' : '#E2E8F0',
//                   borderRadius: '4px',
//                   transition: 'background-color 0.3s'
//                 }} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Main Form Card */}
//         <div style={{
//           backgroundColor: 'white',
//           borderRadius: '12px',
//           padding: '2rem',
//           boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//         }}>
//           <h2 style={{
//             fontSize: '1.25rem',
//             fontWeight: 'bold',
//             color: '#2563EB',
//             margin: '0 0 1.5rem 0'
//           }}>
//             Step {currentStep}: {steps[currentStep - 1].title}
//           </h2>

//           {/* Step 1: Paper Details */}
//           {currentStep === 1 && (
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//               <div>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '0.5rem',
//                   color: '#374151',
//                   fontWeight: '500'
//                 }}>
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => handleInputChange('title', e.target.value)}
//                   placeholder="Title"
//                   style={{
//                     width: '100%',
//                     padding: '0.75rem',
//                     border: '1px solid #D1D5DB',
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     outline: 'none',
//                     transition: 'border-color 0.2s'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#2563EB'}
//                   onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
//                 />
//               </div>

//               <div>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '0.5rem',
//                   color: '#374151',
//                   fontWeight: '500'
//                 }}>
//                   Authors
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.authors}
//                   onChange={(e) => handleInputChange('authors', e.target.value)}
//                   placeholder="Authors"
//                   style={{
//                     width: '100%',
//                     padding: '0.75rem',
//                     border: '1px solid #D1D5DB',
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     outline: 'none',
//                     transition: 'border-color 0.2s'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#2563EB'}
//                   onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
//                 />
//               </div>

//               <div>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '0.5rem',
//                   color: '#374151',
//                   fontWeight: '500'
//                 }}>
//                   Institution
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.institution}
//                   onChange={(e) => handleInputChange('institution', e.target.value)}
//                   placeholder="Institution"
//                   style={{
//                     width: '100%',
//                     padding: '0.75rem',
//                     border: '1px solid #D1D5DB',
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     outline: 'none',
//                     transition: 'border-color 0.2s'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#2563EB'}
//                   onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
//                 />
//               </div>

//               <div>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '0.5rem',
//                   color: '#374151',
//                   fontWeight: '500'
//                 }}>
//                   Keywords
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.keywords}
//                   onChange={(e) => handleInputChange('keywords', e.target.value)}
//                   placeholder="Keywords (comma-separated)"
//                   style={{
//                     width: '100%',
//                     padding: '0.75rem',
//                     border: '1px solid #D1D5DB',
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     outline: 'none',
//                     transition: 'border-color 0.2s'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#2563EB'}
//                   onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Step 2: Submission Link */}
//           {currentStep === 2 && (
//             <div>
//               <div style={{ marginBottom: '1rem' }}>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '0.5rem',
//                   color: '#374151',
//                   fontWeight: '500'
//                 }}>
//                   Submission Link
//                 </label>
//                 <input
//                   type="url"
//                   value={formData.submissionLink}
//                   onChange={(e) => handleInputChange('submissionLink', e.target.value)}
//                   placeholder="https://drive.google.com/file/d/... or https://meet.google.com/..."
//                   style={{
//                     width: '100%',
//                     padding: '0.75rem',
//                     border: '1px solid #D1D5DB',
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     outline: 'none',
//                     transition: 'border-color 0.2s'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#2563EB'}
//                   onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
//                 />
//               </div>

//               <div style={{
//                 backgroundColor: '#F0F9FF',
//                 border: '1px solid #BAE6FD',
//                 borderRadius: '8px',
//                 padding: '1rem',
//                 marginBottom: '1rem'
//               }}>
//                 <h4 style={{
//                   color: '#0369A1',
//                   fontSize: '0.875rem',
//                   fontWeight: '600',
//                   margin: '0 0 0.5rem 0'
//                 }}>
//                   Supported Link Types:
//                 </h4>
//                 <ul style={{
//                   color: '#0369A1',
//                   fontSize: '0.875rem',
//                   margin: 0,
//                   paddingLeft: '1.25rem'
//                 }}>
//                   <li>Google Drive (make sure sharing is enabled)</li>
//                   <li>Google Meet recordings</li>
//                   <li>OneDrive links</li>
//                   <li>Dropbox links</li>
//                   <li>Any other shareable document link</li>
//                 </ul>
//               </div>

//               {formData.submissionLink && !validateLink(formData.submissionLink) && (
//                 <div style={{
//                   backgroundColor: '#FEF2F2',
//                   border: '1px solid #FECACA',
//                   borderRadius: '8px',
//                   padding: '0.75rem',
//                   color: '#DC2626',
//                   fontSize: '0.875rem'
//                 }}>
//                   Please enter a valid URL (starting with http:// or https://)
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Step 3: Review & Submit */}
//           {currentStep === 3 && (
//             <div>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
//                 Review Your Submission
//               </h3>
//               <div style={{
//                 backgroundColor: '#F9FAFB',
//                 padding: '1.5rem',
//                 borderRadius: '8px',
//                 marginBottom: '1rem'
//               }}>
//                 <div style={{ marginBottom: '0.75rem' }}>
//                   <strong>Title:</strong> {formData.title}
//                 </div>
//                 <div style={{ marginBottom: '0.75rem' }}>
//                   <strong>Authors:</strong> {formData.authors}
//                 </div>
//                 <div style={{ marginBottom: '0.75rem' }}>
//                   <strong>Institution:</strong> {formData.institution}
//                 </div>
//                 <div style={{ marginBottom: '0.75rem' }}>
//                   <strong>Keywords:</strong> {formData.keywords}
//                 </div>
//                 <div>
//                   <strong>Submission Link:</strong> {formData.submissionLink || 'No link provided'}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Error Display */}
//           {submitError && (
//             <div style={{
//               backgroundColor: '#FEF2F2',
//               border: '1px solid #FECACA',
//               borderRadius: '8px',
//               padding: '0.75rem',
//               color: '#DC2626',
//               fontSize: '0.875rem',
//               marginTop: '1rem'
//             }}>
//               {submitError}
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginTop: '2rem'
//           }}>
//             <button
//               onClick={currentStep === 1 ? onClose : handleBack}
//               style={{
//                 backgroundColor: 'transparent',
//                 color: '#6B7280',
//                 border: '1px solid #D1D5DB',
//                 padding: '0.75rem 1.5rem',
//                 borderRadius: '8px',
//                 fontSize: '1rem',
//                 fontWeight: '500',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s'
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.backgroundColor = '#F9FAFB'
//                 e.currentTarget.style.borderColor = '#9CA3AF'
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.backgroundColor = 'transparent'
//                 e.currentTarget.style.borderColor = '#D1D5DB'
//               }}
//             >
//               {currentStep === 1 ? 'Cancel' : 'Back'}
//             </button>

//             <button
//               onClick={handleContinue}
//               disabled={isSubmitting}
//               style={{
//                 backgroundColor: isSubmitting ? '#9CA3AF' : '#2563EB',
//                 color: 'white',
//                 border: 'none',
//                 padding: '0.75rem 1.5rem',
//                 borderRadius: '8px',
//                 fontSize: '1rem',
//                 fontWeight: '500',
//                 cursor: isSubmitting ? 'not-allowed' : 'pointer',
//                 transition: 'background-color 0.2s',
//                 opacity: isSubmitting ? 0.7 : 1
//               }}
//               onMouseOver={(e) => {
//                 if (!isSubmitting) {
//                   e.currentTarget.style.backgroundColor = '#1D4ED8'
//                 }
//               }}
//               onMouseOut={(e) => {
//                 if (!isSubmitting) {
//                   e.currentTarget.style.backgroundColor = '#2563EB'
//                 }
//               }}
//             >
//               {isSubmitting ? 'Submitting...' : (currentStep === 3 ? 'Submit' : 'Continue')}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SubmissionWizard
import { useState } from "react";

interface SubmissionWizardProps {
  onClose: () => void;
  onSubmissionSuccess: () => void;
}

const SubmissionWizard = ({
  onClose,
  onSubmissionSuccess,
}: SubmissionWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    authors: "",
    institution: "",
    keywords: "",
    submissionLink: "",
  });

  const steps = [
    { number: 1, title: "Paper Details" },
    { number: 2, title: "Submission Link" },
    { number: 3, title: "Review & Submit" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateLink = (link: string) => {
    // Basic URL validation
    try {
      new URL(link);
      return true;
    } catch {
      return false;
    }
  };

  const handleContinue = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      setIsSubmitting(true);
      setSubmitError("");

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setSubmitError("Authentication required. Please log in.");
          setIsSubmitting(false);
          return;
        }

        // Prepare data for backend
        const submissionData = {
          title: formData.title,
          abstract: formData.abstract,
          contentUrl: formData.submissionLink, // Using submissionLink as contentUrl
          submissionLink: formData.submissionLink,
          authors: formData.authors,
          institution: formData.institution,
          keywords: formData.keywords,
        };

        const response = await fetch(
          "https://yrs-api-8.onrender.com/api/papers/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(submissionData),
          }
        );

        if (response.ok) {
          console.log("Submission successful!");
          onSubmissionSuccess();
        } else {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Submission failed" }));
          setSubmitError(
            errorData.error || "Submission failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Error submitting:", error);
        setSubmitError(
          "Network error. Please check your connection and try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if current step is valid to continue
  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.title.trim() &&
          formData.authors.trim() &&
          formData.institution.trim()
        );
      case 2:
        return (
          formData.submissionLink.trim() &&
          validateLink(formData.submissionLink)
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#2563EB",
              margin: "0 0 1rem 0",
            }}
          >
            Submission Wizard
          </h1>

          {/* Progress Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {steps.map((step) => (
              <div key={step.number} style={{ flex: 1 }}>
                <div
                  style={{
                    height: "8px",
                    backgroundColor:
                      step.number <= currentStep ? "#2563EB" : "#E2E8F0",
                    borderRadius: "4px",
                    transition: "background-color 0.3s",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#2563EB",
              margin: "0 0 1.5rem 0",
            }}
          >
            Step {currentStep}: {steps[currentStep - 1].title}
          </h2>

          {/* Step 1: Paper Details */}
          {currentStep === 1 && (
            <div style={{ display: "grid", gap: "1rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#374151",
                    fontWeight: "500",
                  }}
                >
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Research paper title"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                    color: "#000000", // Black text color
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
                  onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#374151",
                    fontWeight: "500",
                  }}
                >
                  Abstract
                </label>
                <textarea
                  value={formData.abstract}
                  onChange={(e) =>
                    handleInputChange("abstract", e.target.value)
                  }
                  placeholder="Brief abstract of your research"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                    resize: "vertical",
                    color: "#000000", // Black text color
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
                  onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    Authors *
                  </label>
                  <input
                    type="text"
                    value={formData.authors}
                    onChange={(e) =>
                      handleInputChange("authors", e.target.value)
                    }
                    placeholder="Author names"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                      color: "#000000", // Black text color
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
                    onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) =>
                      handleInputChange("institution", e.target.value)
                    }
                    placeholder="Your institution"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                      color: "#000000", // Black text color
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
                    onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#374151",
                    fontWeight: "500",
                  }}
                >
                  Keywords
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) =>
                    handleInputChange("keywords", e.target.value)
                  }
                  placeholder="Keywords (comma-separated)"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                    color: "#000000", // Black text color
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
                  onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                />
              </div>
            </div>
          )}

          {/* Step 2: Submission Link */}
          {currentStep === 2 && (
            <div>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#374151",
                    fontWeight: "500",
                  }}
                >
                  Submission Link *
                </label>
                <input
                  type="url"
                  value={formData.submissionLink}
                  onChange={(e) =>
                    handleInputChange("submissionLink", e.target.value)
                  }
                  placeholder="https://drive.google.com/file/d/... or https://meet.google.com/..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                    color: "#000000", // Black text color
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
                  onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                />
              </div>

              <div
                style={{
                  backgroundColor: "#F0F9FF",
                  border: "1px solid #BAE6FD",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <h4
                  style={{
                    color: "#0369A1",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Supported Link Types:
                </h4>
                <ul
                  style={{
                    color: "#0369A1",
                    fontSize: "0.875rem",
                    margin: 0,
                    paddingLeft: "1.25rem",
                  }}
                >
                  <li>Google Drive (make sure sharing is enabled)</li>
                  <li>Google Meet recordings</li>
                  <li>OneDrive links</li>
                  <li>Dropbox links</li>
                  <li>Any other shareable document link</li>
                </ul>
              </div>

              {formData.submissionLink &&
                !validateLink(formData.submissionLink) && (
                  <div
                    style={{
                      backgroundColor: "#FEF2F2",
                      border: "1px solid #FECACA",
                      borderRadius: "8px",
                      padding: "0.75rem",
                      color: "#DC2626",
                      fontSize: "0.875rem",
                    }}
                  >
                    Please enter a valid URL (starting with http:// or https://)
                  </div>
                )}
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "1rem",
                }}
              >
                Review Your Submission
              </h3>
              <div
                style={{
                  backgroundColor: "#F9FAFB",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ marginBottom: "0.75rem", color: "#000000" }}>
                  <strong>Title:</strong> {formData.title || "Not provided"}
                </div>
                <div style={{ marginBottom: "0.75rem", color: "#000000" }}>
                  <strong>Abstract:</strong>{" "}
                  {formData.abstract || "Not provided"}
                </div>
                <div style={{ marginBottom: "0.75rem", color: "#000000" }}>
                  <strong>Authors:</strong> {formData.authors || "Not provided"}
                </div>
                <div style={{ marginBottom: "0.75rem", color: "#000000" }}>
                  <strong>Institution:</strong>{" "}
                  {formData.institution || "Not provided"}
                </div>
                <div style={{ marginBottom: "0.75rem", color: "#000000" }}>
                  <strong>Keywords:</strong>{" "}
                  {formData.keywords || "Not provided"}
                </div>
                <div style={{ color: "#000000" }}>
                  <strong>Submission Link:</strong>{" "}
                  {formData.submissionLink || "Not provided"}
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {submitError && (
            <div
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "8px",
                padding: "0.75rem",
                color: "#DC2626",
                fontSize: "0.875rem",
                marginTop: "1rem",
              }}
            >
              {submitError}
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            <button
              onClick={currentStep === 1 ? onClose : handleBack}
              style={{
                backgroundColor: "transparent",
                color: "#6B7280",
                border: "1px solid #D1D5DB",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#F9FAFB";
                e.currentTarget.style.borderColor = "#9CA3AF";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "#D1D5DB";
              }}
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>

            <button
              onClick={handleContinue}
              disabled={isSubmitting || !canContinue()}
              style={{
                backgroundColor:
                  isSubmitting || !canContinue() ? "#9CA3AF" : "#2563EB",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "500",
                cursor:
                  isSubmitting || !canContinue() ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
                opacity: isSubmitting || !canContinue() ? 0.7 : 1,
              }}
              onMouseOver={(e) => {
                if (!isSubmitting && canContinue()) {
                  e.currentTarget.style.backgroundColor = "#1D4ED8";
                }
              }}
              onMouseOut={(e) => {
                if (!isSubmitting && canContinue()) {
                  e.currentTarget.style.backgroundColor = "#2563EB";
                }
              }}
            >
              {isSubmitting
                ? "Submitting..."
                : currentStep === 3
                ? "Submit"
                : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionWizard;
