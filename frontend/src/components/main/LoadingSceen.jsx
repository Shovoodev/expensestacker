import React from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

const LoadingSceen = () => {
  return (
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" integrity="sha512-PgQMlq+nqFLV4ylk1gwUOgm6CtIIXkKwaIHp/PAIWHzig/lKZSEGKEysh0TCVbHJXCLN7WetD8TFecIky75ZfQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Log In </h2>
          <form >
            <Input
              type="email"
              label="Enter email"
              
            />
            <Input
              type="password"
              label="Enter Password"
              
            />
            <Button
              className="w-[50%] ml-[25%] mt-4 bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600  "
              type="submit"
            >
              SignIn
            </Button>
          </form>
        </div>
        </div>
<div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
  <div className="flex justify-center items-center mt-[50vh]">
    <div className="fas fa-circle-notch fa-spin fa-5x text-violet-600"></div>
  </div>
</div>
    </div>
  )
}

export default LoadingSceen