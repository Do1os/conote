import { ComponentProps, forwardRef } from "react"    //infer props from aside element
import { twMerge } from "tailwind-merge"


export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {   //deconstruncting props ,childern and classname 
  return (
    <main
      className={twMerge("flex flex-row h-screen", className)}  //merging tailwind classes
      {...props}    //props passed
    >
      {children}   
    </main>  //render children 
  );
};


export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={twMerge("flex-1 overflow-auto", className)} {...props}>
      {children}
    </div>
  )
);
Content.displayName = "Content";  

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {   //deconstruncting props ,childern and classname 
  return (
    <aside
      className={twMerge("w-[250px]  h-full overflow-auto", className)}  //merging tailwind classes
      {...props}    //props passed
    >
      {children}   
    </aside>  //render children 
  );
};




    