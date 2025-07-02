import { notesMock } from "@renderer/store/mocks";
import { ComponentProps } from "react";
import { NotePreview } from "./NotePreview";
import { twMerge } from "tailwind-merge";
import { useNotesList } from "@renderer/hooks/useNotesList";
import {isEmpty} from "lodash";

export type NotesPreviewlistProps= ComponentProps<'ul'>&{
    onSelect?:()=>void
}
export const NotePreviewlist=({className,...props}:NotesPreviewlistProps)=>{
    const{notes,selectedNoteIndex,handleNoteSelect}= useNotesList({})
    if(!notes)return null
    if(isEmpty(notes)){
        return(
            <ul className={twMerge("text-center pt-4",className)} {...props}>
            <span>No notes Yet!!
            </span></ul>
        )
    }
     return(
    <ul className={className}{...props}>{notes.map((note,index)=>
    (
     <NotePreview key={note.title + note.lastEditTime}
       isActive={selectedNoteIndex===index}
       onClick={handleNoteSelect(index)}
      {...note}/>
    ))}
    </ul>
    )
}
