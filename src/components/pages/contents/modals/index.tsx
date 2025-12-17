import { useState, Fragment } from 'react';
import { 
  SuccessModal, 
  ErrorModal, 
  WarningModal, 
  InfoModal,
  PrimaryModal 
} from '@/components/modals';
import PrimaryButton from '@/components/partials/buttons/primary';
import { Text, Email, Number, Password } from '@/components/partials/inputs';

const ModalsPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showMinimalSuccess, setShowMinimalSuccess] = useState(false);
  const [showHeaderOnly, setShowHeaderOnly] = useState(false);
  const [showBodyOnly, setShowBodyOnly] = useState(false);
  const [showFooterOnly, setShowFooterOnly] = useState(false);

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Here you could show a success message
  };

  // Validation function for the form
  const validateContactForm = (data: Record<string, any>): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    if (!data.name?.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!data.phone?.trim()) {
      errors.phone = 'Phone is required';
    }

    return errors;
  };

  // Form fields as a component (slot-like)
  const ContactFormFields = ({ data, errors, onChange }: any) => (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Container 1 */}
      <div className="flex-1 p-6 space-y-4 min-w-0">
        <Text
          label="Full Name"
          value={data.name || ''}
          onChange={onChange('name')}
          placeholder="Enter your full name"
          required
          error={errors.name}
          icon="<svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path></svg>"
        />

        <Email
          label="Email Address"
          value={data.email || ''}
          onChange={onChange('email')}
          placeholder="Enter your email address"
          required
          error={errors.email}
          icon="<svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path></svg>"
        />

        <Number
          label="Phone Number"
          value={data.phone || ''}
          onChange={onChange('phone')}
          placeholder="Enter your phone number"
          required
          error={errors.phone}
          icon="<svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'></path></svg>"
        />
      </div>

      {/* Container 2 */}
      <div className="flex-1 p-6 space-y-4 min-w-0">
        <Text
          label="Address"
          value={data.address || ''}
          onChange={onChange('address')}
          placeholder="Enter your address"
          error={errors.address}
          icon="<svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'></path><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'></path></svg>"
        />

        <Number
          label="Age"
          value={data.age || ''}
          onChange={onChange('age')}
          placeholder="Enter your age"
          error={errors.age}
          icon="<svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path></svg>"
        />

        <Text
          label="Company"
          value={data.company || ''}
          onChange={onChange('company')}
          placeholder="Enter your company name"
          error={errors.company}
          icon="<svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'></path></svg>"
        />
      </div>
    </div>
  );

  // Login form fields (another example of slot usage)
  const LoginFields = ({ data, errors, onChange }: any) => (
    <div className="p-8 space-y-4 w-full max-w-md mx-auto">
      <Email
        label="Email Address"
        value={data.email || ''}
        onChange={onChange('email')}
        placeholder="Enter your email address"
        required
        error={errors.email}
        icon="<svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path></svg>"
      />

      <Password
        label="Password"
        value={data.password || ''}
        onChange={onChange('password')}
        placeholder="Enter your password"
        required
        error={errors.password}
        icon="<svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'></path></svg>"
      />
    </div>
  );

  const validateLoginForm = (data: Record<string, any>): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!data.password?.trim()) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Modal Components
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
            Click the buttons below to preview different modal types
          </p>
        </div>

        {/* Dialog Modals Section */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Dialog Modals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <PrimaryButton 
              onClick={() => setShowSuccess(true)}
              className="text-xs md:text-sm bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Success Modal
            </PrimaryButton>
            
            <PrimaryButton 
              onClick={() => setShowError(true)}
              className="text-xs md:text-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              Error Modal
            </PrimaryButton>
            
            <PrimaryButton 
              onClick={() => setShowWarning(true)}
              className="text-xs md:text-sm bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
            >
              Warning Modal
            </PrimaryButton>
            
            <PrimaryButton 
              onClick={() => setShowInfo(true)}
              className="text-xs md:text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Info Modal
            </PrimaryButton>
          </div>
        </div>

        {/* Form Modal Section */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Form Modal with Custom Fields
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <PrimaryButton 
              onClick={() => setShowForm(true)}
              className="text-xs md:text-sm bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              Contact Form
            </PrimaryButton>
            
            <PrimaryButton 
              onClick={() => setShowLoginForm(true)}
              className="text-xs md:text-sm bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              Login Form
            </PrimaryButton>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            This modal demonstrates slot-like functionality where form fields are passed from parent component.
          </p>
        </div>

        {/* Modal Section Configuration */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Modal Section Configuration
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-6">
            Configure which sections (header, body, footer) are visible in each modal using the hasHeader, hasBody, and hasFooter props.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <PrimaryButton 
              onClick={() => setShowMinimalSuccess(true)}
              className="text-xs md:text-sm bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
            >
              Body Only
            </PrimaryButton>
            
            <PrimaryButton 
              onClick={() => setShowHeaderOnly(true)}
              className="text-xs md:text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Header Only
            </PrimaryButton>
            
            <PrimaryButton 
              onClick={() => setShowBodyOnly(true)}
              className="text-xs md:text-sm bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800"
            >
              Body & Footer
            </PrimaryButton>
            
            <PrimaryButton 
              onClick={() => setShowFooterOnly(true)}
              className="text-xs md:text-sm bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Header & Footer
            </PrimaryButton>
          </div>
        </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            This modal demonstrates the slot-like functionality where form fields are passed from the parent component.
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Modal Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Responsive Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                All modals are fully responsive and adapt to different screen sizes.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Dark Mode Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Modals automatically adapt to light/dark theme settings.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Centered Layout
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Modals are always centered both vertically and horizontally.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Backdrop Blur
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Background blur effect focuses attention on the modal content.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Form Validation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Built-in form validation with error messages and feedback.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Accessible Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Keyboard navigation and screen reader friendly components.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Section Control
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Control visibility of header, body, and footer sections independently.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Flexible Layouts
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Create minimal or full-featured modals with simple prop configuration.
              </p>
            </div>
          </div>
        </div>

      {/* Modal Components */}
      <Fragment>
        <SuccessModal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          title="Operation Successful"
          message="Your changes have been saved successfully. The operation completed without any errors."
          onConfirm={() => setShowSuccess(false)}
        />

        <ErrorModal
          isOpen={showError}
          onClose={() => setShowError(false)}
          title="Error Occurred"
          message="An error occurred while processing your request. Please try again later or contact support if problem persists."
          onConfirm={() => setShowError(false)}
        />

        <WarningModal
          isOpen={showWarning}
          onClose={() => setShowWarning(false)}
          title="Warning"
          message="This action cannot be undone. Are you sure you want to continue with this operation?"
          onConfirm={() => setShowWarning(false)}
        />

        <InfoModal
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
          title="Information"
          message="Here's some important information you should know about this feature. Please read carefully before proceeding."
          onConfirm={() => setShowInfo(false)}
        />

        <PrimaryModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title="Contact Information"
          onSubmit={handleFormSubmit}
          maxWidth="2xl"
          cancelButtonText="Close"
          submitButtonText="Save"
          validateForm={validateContactForm}
          initialData={{ name: '', email: '', phone: '', address: '', age: '', company: '' }}
        >
          {(context) => ContactFormFields(context)}
        </PrimaryModal>

        <PrimaryModal
          isOpen={showLoginForm}
          onClose={() => setShowLoginForm(false)}
          title="Login to Your Account"
          onSubmit={handleFormSubmit}
          maxWidth="md"
          cancelButtonText="Cancel"
          submitButtonText="Login"
          submitButtonClassName="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
          validateForm={validateLoginForm}
          initialData={{ email: '', password: '' }}
        >
          {(context) => LoginFields(context)}
        </PrimaryModal>

        {/* Section Configuration Examples */}
        <SuccessModal
          isOpen={showMinimalSuccess}
          onClose={() => setShowMinimalSuccess(false)}
          title="Success!"
          message="Operation completed successfully with minimal modal design (body only)."
          onConfirm={() => setShowMinimalSuccess(false)}
          hasHeader={false}
          hasBody={true}
          hasFooter={false}
        />

        <InfoModal
          isOpen={showHeaderOnly}
          onClose={() => setShowHeaderOnly(false)}
          title="Header Only Modal"
          message="This modal only shows header section."
          onConfirm={() => setShowHeaderOnly(false)}
          hasHeader={true}
          hasBody={false}
          hasFooter={false}
        />

        <WarningModal
          isOpen={showBodyOnly}
          onClose={() => setShowBodyOnly(false)}
          title="Warning"
          message="This modal shows body and footer sections only (no header)."
          onConfirm={() => setShowBodyOnly(false)}
          hasHeader={false}
          hasBody={true}
          hasFooter={true}
        />

        <ErrorModal
          isOpen={showFooterOnly}
          onClose={() => setShowFooterOnly(false)}
          title="Error"
          message="This modal demonstrates header and footer sections only."
          onConfirm={() => setShowFooterOnly(false)}
          hasHeader={true}
          hasBody={false}
          hasFooter={true}
        />
      </Fragment>
    </div>
  );
};

export default ModalsPage;