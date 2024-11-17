import { ContextMenuState, TAnimation } from '@/shared/types'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/shadcn/ui/context-menu'
import { Input } from '@/shadcn/ui/input'
import { useState } from 'react'
import { Button } from '@/shadcn/ui/button'

export interface ContextMenuProps {
  className?: string
  initSettings?: ContextMenuState
  children: React.ReactNode
  animation: TAnimation
}

export default function ContextMenuRightClick({
  className,
  children,
  animation,
}: ContextMenuProps) {
  const [fileName, setFileName] = useState<string>('yeeh')

  // const { duration } = animation
  // console.log(animation)
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>
            Set animation duration
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <Input
              disabled={false}
              value={animation?.duration}
              onChange={(e) => setFileName(() => e.target.value)}
              placeholder="2s, 300ms, 150ms"
            />
            <Button className="mt-2">Save</Button>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem inset className="text-red-600">
          Delete element
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
