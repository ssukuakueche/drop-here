import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { getFiles } from './src/upload.service'
import fs from 'fs/promises'
import type { AppFile } from './src/types/app-file'

const app = express()

app.use(express.json())
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(cors());

const router = express.Router();
app.use('/api', router);

router.get('/health', (req, res) => {
    res.json({
        message: 'Server is running...'
    })
});

router.post('/files', multer({ dest: 'uploads'}).single('file'), async(req, res)=>{
    if (!req.file)
    {
        res.status(400).json({
            message: 'No file uploaded'
        })
        return
    }
    await fs.rename(req.file.path, `uploads/${req.file.originalname}`);
    res.json({
        message: 'File uploaded successfully',
        data: {
            name: req.file.originalname,
            size: req.file.size,
        }
    })
});


router.get('/files', async (req, res) => {
    const files = await getFiles();
    res.json(files.map((file: AppFile)=>{
        return {
            name: file.name, 
            size: file.size
        }
    }))
})

app.listen(3003, () =>{
    console.log('Server is running on port 3003')
})