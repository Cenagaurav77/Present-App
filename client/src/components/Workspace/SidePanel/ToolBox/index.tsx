import { TabPanel } from '@chakra-ui/react'
import Image from 'next/image'
import { Tool } from './Tool'
import { Button } from '@/shadcn/ui/button'
import { Input } from '@/shadcn/ui/input'
import { Label } from '@/shadcn/ui/label'

export interface ToolBoxProps {
  className?: string
}

export default function ToolBox({ className }: ToolBoxProps) {
  return (
    <div className="flex flex-col justify-start h-full">
      <div className={`grid grid-cols-4 ${className}`}>
        <Tool
          name={`Cat`}
          icon={`/huh_cat.jpg`}
        />
        <Tool
          name={`Ryan`}
          icon={`/ryan.jpg`}
        />
        <Tool
          name={`Michael - I am beyonce`}
          icon={`/i_am_beyonce.jpeg`}
        />
        <Tool
          name={`Jim peeking`}
          icon={`/jim_peeking.jpeg`}
        />
        <Tool
          name={`Michael Noooo`}
          icon={`/michel_noooo.jpg`}
        />
        <Tool
          name={`Stanley`}
          icon={`/stanley.jpg`}
        />
        <Tool
          name={`Dwight`}
          icon={`/dwight.jpg`}
        />
        <Tool
          name={`Text`}
          icon={`/letter_t.svg`}
        />
        <Tool
          name={`Sales graph`}
          icon={`/sample_graph.jpg`}
        />
        <Tool
          name={`Graph One`}
          icon={`/graph1.png`}
        />
        <Tool
          name={`Graph Two`}
          icon={`/graph2.png`}
        />
        <Tool
          name={`Graph Three`}
          icon={`/graph3.png`}
        />
        <Tool
          name={`Graph Four`}
          icon={`/graph4.png`}
        />
        <Tool
          name={`Graph Five`}
          icon={`/graph5.png`}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>
      <Button className="w-full">Upload an image</Button>
    </div>
  )
}

export { Tool } from './Tool'
