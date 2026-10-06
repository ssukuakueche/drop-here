import { useState, type ChangeEvent } from "react"
import axios from 'axios'
import { useFiles } from "./state/files.store";
import FileSection from "./FilesSection";

export default function App(){
    const [file, setFile] = useState<File | null>(null);
    const {files, setFiles} = useFiles();
    const [isUploading, setIsUploading] = useState(false);

    function changeFile(ev: ChangeEvent<HTMLInputElement>){
        if (ev.target.files && ev.target.files.length == 1)
            setFile(ev.target.files[0]!);
        else
            alert('Houve um problema')
    }

    async function uploadFile()
    {
        if (!file)
            return;
        setIsUploading(true);
        const response = await axios.post('/api/files', {
            file
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status == 200 || response.status == 201)
        {
            confirm('O ficheiro foi carrgado com sucesso!')
            setFiles([
                ...files, 
                {
                    name: response.data.name, 
                    size: response.data.size
                }
            ])
        }
        else
            confirm('Houve um problema em fazer o upload!')
        setIsUploading(false);
        setFile(null);
    }

    return (
        <div className='app'>
            <div className="main">
                 <h1 className="text-center">Drop Here</h1>
                <label htmlFor="input-file" className="drop-area">
                    {file ? file.name : 'Click here to drop file'}
                    <input id="input-file" type="file" disabled={isUploading} className="hidden" onChange={changeFile}/>
                </label>
                {file && (
                    <div className="item-to-upload">
                        {file.name}
                        <button disabled={isUploading}  onClick={uploadFile}>{isUploading ? 'Uploading...' : 'Upload'}</button>
                    </div>
                )}
                <div className="files">
                    <div className="title">Files</div>
                    <div>This is list files of server</div>
                    <div className="bar"></div>
                    <FileSection />
                </div>    
            </div>   
        </div>
    )
}
