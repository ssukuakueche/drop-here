import { useEffect } from "react";
import { useFiles } from "./state/files.store"
import axios from "axios";

export default function FileSection ()
{
    const {files, setFiles} = useFiles();

    async function fetchFiles()
    {
       const response = await axios.get('/api/files');
       setFiles(response.data);
    }
    
    useEffect(()=>{
        fetchFiles();
    }, []);
    return (
        <div className="file-items">
            {files.map((file, idx)=>(
                <a target="_blank" href={'/uploads/' + file.name} className="file-item">
                    <span>{idx + 1}. </span>
                    <span>{file.name} - </span>
                    <span className="file-item-bytes">{file.size} bytes</span>
                </a>
            ))}
        </div>
    )
}