import React from 'react';

const Accessibility = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Our Commitment</h2>
        <p className="mb-4">We are committed to ensuring digital accessibility for all users. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Conformance Status</h2>
        <p className="mb-4">The website is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Feedback</h2>
        <p className="mb-4">We welcome your feedback on the accessibility of our website. Please let us know if you encounter any accessibility barriers:</p>
        <ul className="list-disc pl-6">
          <li>Phone: +233 (050) 264-666</li>
          <li>Email: accessibility@optiflowai.com</li>
          <li>Mailing Address: [Kumasi-Ghana]</li>
        </ul>
      </section>
    </div>
  );
};

export default Accessibility;