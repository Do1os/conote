import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export type ActionButtonProps = ComponentProps<'button'>;

export const ActionButton=({className,children,...props}: ActionButtonProps)=>{
    return <button className={twMerge
        ("px-3 py-1  hover:bg-rose-400/60 transition-colors duration-100",className)}
        {...props}>{children}</button>
}