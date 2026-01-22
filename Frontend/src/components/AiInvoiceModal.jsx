import React, { useState } from 'react'
import { aiInvoiceModalStyles } from '../assets/dummyStyles'

export default function AiInvoiceModal({ open = false, onClose = () => {}, onGenerate = async () => {}, initialText = '' }) {
  const [text, setText] = useState(initialText)
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const handleGenerate = async () => {
    try {
      setLoading(true)
      await onGenerate(text)
    } catch (e) {
      console.error('AI generate failed', e)
      throw e
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={aiInvoiceModalStyles.overlay} role="dialog" aria-modal="true">
      <div className={aiInvoiceModalStyles.backdrop} onClick={onClose} />
      <div className={aiInvoiceModalStyles.modal}>
        <div className={aiInvoiceModalStyles.title}>Generate Invoice from Text</div>
        <p className={aiInvoiceModalStyles.description}>Paste notes, chat logs or invoice text and let AI create a draft invoice.</p>

        <label className={aiInvoiceModalStyles.label}>Input</label>
        <textarea
          className={aiInvoiceModalStyles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="Enter invoice details or paste a receipt..."
        />

        <div className={aiInvoiceModalStyles.actions}>
          <button type="button" className={aiInvoiceModalStyles.cancelButton} onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button type="button" className={aiInvoiceModalStyles.generateButton} onClick={handleGenerate} disabled={loading || !text.trim()}>
            {loading ? 'Generating…' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  )
}
