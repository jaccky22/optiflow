import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing or using our website, you agree to be bound by these Terms of Service.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. User Conduct</h2>
        <p className="mb-4">You agree not to:</p>
        <ul className="list-disc pl-6">
          <li>Use our services for illegal purposes</li>
          <li>Violate any intellectual property rights</li>
          <li>Interfere with our services</li>
          <li>Engage in abusive behavior</li>
        </ul>
      </section>

      {/* Add the rest of the sections we discussed earlier */}
    </div>
  );
};

export default TermsOfService;