import React from 'react'

const DeleteButton = ( {onClick}) => {
  return (
    <button onClick={onClick} className='text-white bg-red-700 hover:bg-red-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700  dark:red:ring-green-800'>
        Delete
    </button>
  )
}

export default DeleteButton