import { appDirectoryName, fileEncoding, welcomeNoteFileName } from "@shared/constants"
import { homedir } from "os"
import {ensureDir, readdir, readFile,  remove, stat, writeFile} from "fs-extra"
import { NoteInfo } from "@shared/models"
import { CreateNote, DeleteNote, GetNotes,ReadNote, WriteNote} from "@shared/types"
import { dialog } from "electron"
import path from "path"
import{isEmpty} from "lodash"
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return path.join(homedir(), appDirectoryName);
}


export const getNotes:GetNotes = async()=>{
    const rootDir = getRootDir()
    await ensureDir(rootDir)
    const notesFileNames = await readdir(rootDir,
        {
            encoding : fileEncoding,
            withFileTypes: false
        }
    )

    const notes = notesFileNames.filter((fileName)=>fileName.endsWith(".md"))
    if(isEmpty(notes)){
        console.info('no notes found creating welcome note')
        const content = await readFile(welcomeNoteFile,{encoding:fileEncoding})
        //create welcome note
        await writeFile(`${rootDir}/${welcomeNoteFileName}`,content,{encoding:fileEncoding})
        notes.push(welcomeNoteFileName)
    }
    return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName =
async(filename:string ):Promise<NoteInfo>=>{
    const fileStats =await stat(`${getRootDir()}/${filename}`)
    return{
        title:filename.replace(/\.md$/,''),
        lastEditTime:fileStats.mtimeMs
    }
}

export const readNote:ReadNote = async(filename)=>{
    const rootDir = getRootDir()
    return readFile(`${rootDir}/${filename}.md`,{encoding:fileEncoding})
}

export const writeNote:WriteNote = async(filename,content)=>{
    const rootDir = getRootDir()
    console.log(`writing note ${filename}`)
    return writeFile(`${rootDir}/${filename}.md`,content,{encoding:fileEncoding})
}

export const createNote:CreateNote= async()=>{
    const rootDir= getRootDir()
    await ensureDir(rootDir)
   const {filePath,canceled} =await dialog.showSaveDialog({
        title:'New Note',
        defaultPath:'${rootDir}/Untitle.md',
        buttonLabel:'Create Note',
        properties:['showOverwriteConfirmation'],
        showsTagField:false,
        filters:[{
            name:'Markdown files',
            extensions:['md']
        }]
    })
    if(canceled||!filePath){
        console.info('note creation canceled')
        return false
    }

    const{name:filename ,dir: parentDir}=path.parse(filePath)
    if(parentDir!==rootDir){
        await dialog.showMessageBox({
            type:'error',
            title:'Creation failed',
            message:`All notes must be saved under ${rootDir}
                    Avoid Using Other Directories.`
        })
        return false
    }
    console.info(`creating note :${filePath}`)
    await writeFile(filePath,'')

    return filename
}

export const deleteNote:DeleteNote=async(filename)=>{
    const rootDir = getRootDir()
   const{response}= await dialog.showMessageBox({
        type:'warning',
        title:'Delete Note',
        message:'Are you sure you want to delete this note?',
        buttons:['Delete','Cancel'], //0 is delete, 1 is cancel
        defaultId:1,
        cancelId:1,
    })
    if(response ===1 )
    {
        console.info('note deletion canceled')
        return false
    }

    console.info(`deleting note ${filename}`)
    await remove(`${rootDir}/${filename}.md`)
    return true
}