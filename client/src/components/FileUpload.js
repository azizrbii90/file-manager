import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({data : { file : { name: 'welcome.jfif' } }});
    
    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    
    const onSubmit = async e => {
        e.preventDefault(); 
        const formData = new FormData();    
        formData.append('file', file);
    
        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setUploadedFile(res);
        } catch (error) {
            console.log(error);
        }
    }

    const downloadImage = async () => {
        try {

           const file = await axios.get('http://localhost:5000/api/get/620f6200e2f5b5d8a732ea27');
           console.log(file)
           const res = await axios.get('http://localhost:5000/api/download/620f6200e2f5b5d8a732ea27', {
            responseType: 'blob'
          });
          const url = window.URL.createObjectURL(new Blob([res.data], {type: res.data.type}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', file.data.file.name);
          document.body.appendChild(link);
          link.click();
          link.remove();
            console.log("res ",res);
        } catch(error) {
            console.log(error)
        }
    }
  return (
    <Fragment>
        <form onSubmit={onSubmit} className="row">
            <div className="custom-file mb-4">
                <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                <label className="custom-file-label" htmlFor="customFile"></label>
            </div>

            <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
        </form>
        {uploadedFile ? (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{uploadedFile?.data?.file?.name}</h3>
                    <img style= {{ 'width': '100%' }} src={'http://localhost:5000/'+uploadedFile?.data?.file?.name} />
                </div>
            </div>
        ) : null }
        <div className="row">
        <button className="btn btn-primary mt-5 mb-4" onClick={downloadImage} >download</button>

        </div>
    </Fragment>
  )
}

export default FileUpload
