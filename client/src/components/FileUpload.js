import React, { Fragment, useState } from 'react';

import { uploadFile, downloadFile } from '../api/index';
import { URL } from '../constants/index';
import './styles.css';

const FileUpload = () => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState(null);
    
    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    
    const onSubmit = async e => {
        e.preventDefault(); 

        const formData = new FormData();    
        formData.append('file', file);
    
        try {
            const res = await uploadFile(formData);
            setUploadedFile(res);
        } catch (error) {
            console.log(error);
        }
    }

    const downloadImage = async () => {
        
        try {
          const res = await downloadFile(uploadedFile.data.file._id);
        
          const url = window.URL.createObjectURL(new Blob([res.data], {type: res.data.type}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', uploadedFile.data.file._id);
          document.body.appendChild(link);
          link.click();
          link.remove();
        
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit} className="row">
                <div>
                    <label htmlFor="formFile" className="form-label" ></label>
                    <input className="form-control" type="file" id="formFile" accept="image/*,.pdf" onChange={onChange}/>
                </div>
                <input type="submit" value="UPLOAD" className="btn btn-primary btn-block mt-4" />
            </form>
            
            {uploadedFile ? (
            <div className="row mt-5">   
                <div className="parent col-md-6 m-auto">
                    { uploadedFile.data.file.mimetype.split('/')[0] === "image" ? 
                        <img 
                        src={URL+uploadedFile?.data?.file?.name} /> :  
                        <iframe
                            src={URL+uploadedFile?.data?.file?.name}
                        ></iframe>  }
                </div>
            </div>
            ) : null }
            <div className="row">
                <button className="btn btn-primary mt-4" disabled={!uploadedFile} onClick={downloadImage} >DOWNLOAD</button>
            </div>
        </Fragment>
    )
}

export default FileUpload
