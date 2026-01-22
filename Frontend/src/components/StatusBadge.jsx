import React from 'react'

const statusMap = {
  paid: { text: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
  unpaid: { text: 'Unpaid', color: 'bg-amber-100 text-amber-700' },
  overdue: { text: 'Overdue', color: 'bg-rose-50 text-rose-700' },
  draft: { text: 'Draft', color: 'bg-gray-100 text-gray-700' },
}

export default function StatusBadge({ status = 'Draft', size = 'default', showIcon = false }) {
  const key = String(status || '').toLowerCase();
  const info = statusMap[key] || { text: String(status || 'Unknown'), color: 'bg-gray-100 text-gray-700' };
  const padding = size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-2 rounded-full font-medium ${padding} ${info.color}`}>
      {showIcon && (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14m-7-7h14" />
        </svg>
      )}
      <span>{info.text}</span>
    </span>
  )
}
