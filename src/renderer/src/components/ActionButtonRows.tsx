import { NewNoteButton , DeleteNoteButton } from "./button";
import { ComponentProps } from "react";
export const ActionButtonRows=({...props}:ComponentProps<'div'>)=>{
    return(
    <div {...props}>
        <NewNoteButton/>
        <DeleteNoteButton/>

    </div>
    )

}