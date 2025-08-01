import { contextBridge ,ipcRenderer} from 'electron'
import { GetNotes, ReadNote, WriteNote ,CreateNote,DeleteNote} from '@shared/types'


// Custom APIs for renderer


if(!process.contextIsolated){
  throw new Error('contextIsolation must be enabled in browsewindow')
}

try {
  contextBridge.exposeInMainWorld('context',{
    locale:navigator.language,
    getNotes:(...args:Parameters<GetNotes>)=>ipcRenderer.invoke('getNotes',...args),
    readNote:(...args:Parameters<ReadNote>)=>ipcRenderer.invoke('readNote',...args),
    writeNote:(...args:Parameters<WriteNote>)=>ipcRenderer.invoke('writeNote',...args),
    createNote:(...args:Parameters<CreateNote>)=>ipcRenderer.invoke('createNote',...args),
    deleteNote:(...args:Parameters<DeleteNote>)=>ipcRenderer.invoke('deleteNote',...args)
  })
}
catch(error)
{
  console.error('failed to expose context ',error)
}