"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Editor } from "./Editor";
import { SidePanel } from "./SidePanel";

export interface WorkspaceProps {
  className?: string;
}

export function Workspace({ className }: WorkspaceProps) {
  return (
    <section className={`flex min-h-screen ${className}`}>
      <DndProvider backend={HTML5Backend}>
        <SidePanel className="w-1/6" />
        <Editor className="w-5/6" />
      </DndProvider>
    </section>
  );
}
