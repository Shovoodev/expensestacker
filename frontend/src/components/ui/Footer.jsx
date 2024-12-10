import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white absolute w-full h-[190px] bottom-0 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-center bottom-0">
            &copy; {new Date().getFullYear()} Your Website Name. All rights
            reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer