// app/privacy/page.tsx
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Basic usage data (page views, interactions)</li>
          <li>Content generated through our tools</li>
          <li>Analytics data for service improvement</li>
          <li>No personal data is collected without consent</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>To provide and improve our services</li>
          <li>To analyze service usage patterns</li>
          <li>To detect and prevent fraud</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
        <p className="mb-4">We implement appropriate security measures to protect your information.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Encrypted data transmission</li>
          <li>Regular security audits</li>
          <li>Access controls and monitoring</li>
          <li>Data breach response procedures</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Access to your data</li>
          <li>Correction of inaccurate data</li>
          <li>Deletion of your data</li>
          <li>Right to object to processing</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
      </section>
    </div>
  );
}