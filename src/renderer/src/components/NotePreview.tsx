import React from "react";
import { ComponentProps } from "react";
import { NoteInfo } from "@shared/models";
import { cn, formatDateFromMs } from "@renderer/utils";

export type NotePrevieProps = NoteInfo &{
    isActive? :boolean
} & ComponentProps<'div'>
export const NotePreview=({
    title,
    content,
    lastEditTime,
    isActive=false,
    className,
    ...props}:NotePrevieProps)=>{
        const date=formatDateFromMs(lastEditTime)

        return(
    <div className={cn('cursor-pointer px-2.5 py-3 rounded-md transiton-colors duration-75'
        ,{'bg-rose-300/75':isActive,
          'hover:bg-rose-200/75':!isActive
        },
        className )} 
        {...props}>
            <h3 className="mb-1 font-bold truncate text-white/100">{title}</h3>
            <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span>
    </div>
        )
}