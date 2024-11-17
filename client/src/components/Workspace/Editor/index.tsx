'use client'

import { memo, useRef } from 'react'
import { ConnectableElement, useDrop } from 'react-dnd'

import { Page } from './Page'
import { useDispatch, useSelector } from 'react-redux'
import { TElement, TElementDropResult, TPage } from '@/shared/types'
import { moveElement, setEditorProperties } from '@/redux/editor/editorSlice'

export interface EditorProps {
  className?: string
}

export const Editor = memo(function Editor({ className }: EditorProps) {
  const { pages, focusedPageId, editor } = useSelector(
    (state: any) => state.editor,
  )
  const dispatch = useDispatch()

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'TElement',
    drop: (item: TElement, monitor): TElementDropResult => {
      let relativeX, relativeY
      const workAreaElement = document.getElementById('workarea')
      const clientOffset = monitor.getClientOffset()

      if (workAreaElement && clientOffset) {
        const workAreaRect = workAreaElement?.getBoundingClientRect()

        relativeX = clientOffset.x - workAreaRect.left // add the distance between cursor (where I grab the image) and clientOffset
        relativeY = clientOffset.y - workAreaRect.top
      }

      const payload = {
        item,
        x: relativeX,
        y: relativeY,
      }

      dispatch(moveElement(payload))
      return payload
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }
    },
  }))

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  const page = pages?.filter((p: TPage) => p?.id === focusedPageId)[0]

  return (
    <div className={`p-4 flex align-middle justify-center ${className}`}>
      <Page drop={drop} page={page} />
    </div>
  )
})
