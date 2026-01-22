import React from 'react'
import { Navbar } from '../components/Navbar'

const FeatureCard = ({ title, description }) => (
  <div className="bg-white rounded-2xl shadow p-6 max-w-xs mx-auto">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">📄</div>
      <h4 className="font-semibold">{title}</h4>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header>
        <Navbar />
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Built for <span className="text-indigo-600">Speed &amp; Clarity</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto">A minimal, intelligent interface that focuses on what truly matters — create, send, and track invoices effortlessly while maintaining professional excellence.</p>
        </section>

        <section id="features" className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <FeatureCard
            title="AI Invoice Parsing"
            description="Paste freeform text and let our AI extract client details, line items, and totals into a perfectly formatted draft invoice in seconds."
          />

          <FeatureCard
            title="Smart Email Reminders"
            description="Generate professional, context-aware reminder emails with one click — complete with intelligent tone selection and personalized messaging."
          />

          <FeatureCard
            title="Professional PDF Export"
            description="Generate high-quality, brand-consistent PDF invoices with reliable email delivery and comprehensive tracking of all sent communications."
          />
        </section>
      </main>
    </div>
  )
}
