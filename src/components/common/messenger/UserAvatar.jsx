import React from 'react'
import { getPartnerInitials } from '../../../lib/messages/messageUtils'

export default function UserAvatar({ partner, className = 'h-10 w-10', textClassName = 'text-sm' }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] font-bold text-[#257AFC] ${className}`}
      aria-hidden="true"
    >
      <span className={textClassName}>{getPartnerInitials(partner)}</span>
    </div>
  )
}
