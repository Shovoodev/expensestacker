import React from 'react'
import { Apple , Smartphone } from 'lucide-react'
const MobileAdd = () => {
  return (
<div className="w-full h-72 p-4 text-center bg-white border-gray-200 rounded-lg shadow sm:p-8">
    <h5 className="mb-2 text-3xl font-bold text-gray-900 ">Work fast from anywhere</h5>
    <p className="mb-5 text-base text-gray-500 sm:text-lg ">Stay up to date and move work forward with us on iOS & Android. Download the app today.</p>
    <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <a href="#" className="w-full gap-3 sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
             <Apple size={40} strokeWidth={2.25} absoluteStrokeWidth />
             <div className="text-left rtl:text-right">
                <div className="mb-1 text-xs">Download on the</div>
                <div className="-mt-1 font-sans text-sm font-semibold">Mac App Store</div>
            </div>
        </a>
        <a href="#" className="w-full sm:w-auto gap-2 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
        <Smartphone size={40} strokeWidth={2.25} absoluteStrokeWidth />
              <div className="text-left rtl:text-right">
                <div className="mb-1 text-xs">Get in on</div>
                <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>
            </div>
        </a>
    </div>
</div>

  )
}

export default MobileAdd
