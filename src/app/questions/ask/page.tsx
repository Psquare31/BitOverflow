import React from 'react'
import QuestionForm from '@/components/QuestionForm'

const page = () => {
  return (
    <div className="page-shell py-20">
      <div className="glass-panel-strong rounded-[32px] p-6 md:p-8">
        <div className="mb-8">
          <p className="mono-label">New discussion</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-[var(--text)]">
            Ask a Question
          </h1>
        </div>
        <QuestionForm />
      </div>
    </div>
  )
}

export default page
