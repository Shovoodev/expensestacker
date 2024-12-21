import React from 'react'

const Footer = () => {
  return (
    <footer className="fixed bg-gray-300 text-white w-full h-[100px] bottom-0 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-center text-black bottom-0">
            &copy; {new Date().getFullYear()} Your Website Name. All rights
            reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer