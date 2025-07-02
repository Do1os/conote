import {
  RootLayout,
  Sidebar,
  Content,
  ActionButtonRows,
  NotePreviewlist,
  Markdowneditor,
  FloatingNoteTitle,
} from '@/components';
import { useRef } from 'react';



const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = ()=>
  {
    contentContainerRef.current?.scrollTo(0,0)
  }
  
  return (
    <RootLayout>
      <Sidebar className="bg-rose-300/50 text-white">
        <ActionButtonRows className="flex justify-between" />
        <NotePreviewlist className="ml-1 mt-4 space-y-1" onSelect={resetScroll}/>
      </Sidebar>
      <Content ref={contentContainerRef} className="border-l bg-[url('@/assets/1688701221698956.jpg')] bg-cover bg-center border-l-white/20">
        <FloatingNoteTitle />
        <Markdowneditor />
      </Content>
    </RootLayout>
  );
};

export default App;
