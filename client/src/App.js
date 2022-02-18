import React from 'react'
import FileUpload from './components/FileUpload';

const App = () => {
  return (
    <div className="container"> 
      <h5 className="display-4 text-center text-primary mt-2">
         File Manager
      </h5>
      <FileUpload />
    </div>
  )
}

export default App



