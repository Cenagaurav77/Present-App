import { TAnimation, TAnimationDropResult } from '@/shared/types'
import { Tooltip } from '@chakra-ui/react'
import Image from 'next/image'
import { useDrag } from 'react-dnd'

export interface AnimationEntityProps {
  className?: string
  name: string
  css: string
  icon: string
}

export function AnimationEntity({
  className,
  name,
  css,
  icon,
}: AnimationEntityProps) {
  const item: TAnimation = {
    name,
    css,
    duration: '300ms',
  }

  const [{ isDragging }, dragAnimation] = useDrag(() => ({
    type: 'TAnimation',
    item,
    end: (item: TAnimation, monitor) => {
      const dropResult = monitor.getDropResult<TAnimationDropResult>()
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  return (
    <Tooltip label={name}>
      <div
        ref={dragAnimation}
        className={`p-2 hover:bg-slate-200 cursor-grabbing rounded-sm flex flex-col text-center ${className}`}
        data-testid="tool"
      >
        {typeof icon === 'string' ? (
          <span className="mx-auto">
            <Image
              className="mx-auto text-xs"
              src={icon}
              alt="icon"
              width={35}
              height={35}
            />
          </span>
        ) : (
          <span className="mx-auto">{icon}</span>
        )}
      </div>
    </Tooltip>
  )
}
