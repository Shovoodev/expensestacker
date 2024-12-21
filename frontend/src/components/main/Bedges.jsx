import React from 'react'
import { X } from 'lucide-react'
const Bedges = () => {
  return (
    <div className='p-3'>
    <span
      id="badge-dismiss-default"
      className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
    >
      Group Members
      <button
        type="button"
        className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
        data-dismiss-target="#badge-dismiss-default"
        aria-label="Remove"
      >
        <X />
        <span className="sr-only"></span>
      </button>
    </span>
  </div>
  )
}

export default Bedges
