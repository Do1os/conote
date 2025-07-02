import { saveNoteAtom, selectedNoteAtom } from "@renderer/store"
import { useAtomValue, useSetAtom } from "jotai"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { useRef } from "react"
import {throttle} from 'lodash'
import { NoteContent } from "@shared/models"
import { AutoSavingTime } from "@shared/constants"
export const useMarkdownEditor =()=>{
    const selectedNote = useAtomValue(selectedNoteAtom)
    const saveNote = useSetAtom(saveNoteAtom)
    const editorRef = useRef<MDXEditorMethods>(null)

    const handleAutoSave=throttle(async(content:NoteContent)=>{
        if(!selectedNote)return;
        console.info('autosaving note ',selectedNote.title)
        await saveNote(content)
    
        
    },AutoSavingTime,{
        leading:false,
        trailing:true
    })
    const handleBlur =async ()=>{
        if(!selectedNote) return
        handleAutoSave.cancel()
        const content = editorRef.current?.getMarkdown()
        if(content!=null){
            await saveNote(content)
        }
       
    }
    return{
        selectedNote,
        editorRef,
        handleAutoSave,
        handleBlur
    }
}