import store from 'store2'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Button } from '@/shadcn/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table'
import { FilePlusIcon } from '@radix-ui/react-icons'

import { useEffect, useState } from 'react'
import { AlertDialogBox } from '@/components/utils/AlertDialogue'
import { DialogBox } from '@/components/utils/Dialogue'
import { useRouter } from 'next/router'
import { Input } from '@chakra-ui/react'

export default function MyStuff() {
  const [newPresentationName, setNewPresentationName] = useState<string>('')
  const [presentations, setPresentations] = useState<any>([])
  const [names, setNames] = useState<any>([])

  const toast = useToast()
  const router = useRouter()
  const userID = store('user_id')

  const SERVER_DOMAIN =
    process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`

  async function populatePresentations() {
    const res = await fetch(
      `/api/presentation/user/${userID}`,
    ) // cache this in the future
    const data = await res.json()

    setPresentations(() => data?.body)

    setNames(() =>
      data?.body?.map((p: any) => {
        return {
          id: p?._id,
          name: p?.name,
        }
      }),
    )
  }

  function handleEditClick(pid: string) {
    window.open(`/work/${pid}`)
  }

  function handlePreviewClick(pid: string) {
    window.open(`/play/${pid}`)
  }

  useEffect(() => {
    populatePresentations()
  }, [])

  const dateOpts: any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  async function handleUpdateName(pid: string, name: string) {
    const res = await fetch(
      `/api/presentation/update-name`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid,
          user_uid: userID,
          name,
        }),
      },
    )
    const data = await res.json()

    toast({
      title: 'Name updated',
      colorScheme: 'linkedin',
      position: 'bottom-right',
    })

    populatePresentations()
  }

  async function handleAddNewPresentation() {
    const res = await fetch(
      `/api/presentation/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_uid: userID,
          name:
            newPresentationName?.length === 0
              ? `Untitled - ${new Intl.DateTimeFormat('en-US', dateOpts).format(
                  new Date(),
                )}`
              : newPresentationName,
          pages: [],
        }),
      },
    )
    const data = await res.json()

    populatePresentations()
  }

  async function handleRemove(pid: string) {
    const res = await fetch(`/api/presentation/${pid}`, {
      method: 'DELETE',
    })

    populatePresentations()
  }

  function handleLogout() {
    store.remove('user_id')
    store.remove('user_name')

    router.push('/login')
  }

  const userName = store('user_name')
  const yeeh = 'yeeh'
  return (
    <section className="w-full h-screen flex flex-col bg-stone-900">
      <nav className="text-white w-full flex justify-between p-3 border-b-2 border-stone-200">
        <h2 className="my-auto font-heading">PRESENT</h2>
        <Stack spacing={4} direction="row" align="center" className="my-auto">
          {/* <ModeToggle /> */}
          <Button
            variant="link"
            onClick={() => router.push('/home')}
            className="text-stone-200"
          >
            Home
          </Button>
          {/* <Button variant="link">Settings</Button> */}
          <Button
            variant="link"
            className="text-stone-200"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Stack>
      </nav>
      <Card
        className="my-10 mx-auto h-5/6 md:w-2/4 w-11/12"
        style={{ borderRadius: '3px' }}
      >
        <CardHeader className="flex justify-between">
          <Text className=" text-stone-900">My presentations</Text>
          <DialogBox
            onAgree={handleAddNewPresentation}
            opts={{
              userId: store('user_id'),
              newPresentationName,
              setNewPresentationName,
            }}
          >
            <Button variant="ghost">
              <FilePlusIcon />
            </Button>
          </DialogBox>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead className="text-right">No. of slides</TableHead>
                <TableHead className="text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {presentations?.map((p: any) => {
                const name = names.filter((e: any) => e?.id === p?._id)[0]?.name

                return (
                  <TableRow key={p?.name}>
                    <TableCell className="font-medium">
                      <Input
                        value={name}
                        size={'xs'}
                        onChange={(e) => {
                          setNames((prev: any) => {
                            const tmpName = prev.filter(
                              (e: any) => e?.id !== p?._id,
                            )
                            tmpName.push({ id: p?._id, name: e.target.value })

                            return tmpName
                          })
                        }}
                        onBlur={async () =>
                          p?.name !== name
                            ? await handleUpdateName(p?._id, name)
                            : null
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      {p?.pages.length}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-5">
                      <Button
                        className="hover:scale-105 transition duration-150"
                        onClick={() => handleEditClick(p?._id)}
                      >
                        Make changes
                      </Button>
                      <Button
                        className="hover:scale-105 transition duration-150"
                        variant="secondary"
                        onClick={() => handlePreviewClick(p?._id)}
                      >
                        Preview
                      </Button>
                      <AlertDialogBox
                        onAgree={handleRemove}
                        opts={{ id: p?._id }}
                      >
                        <Button
                          className="hover:scale-105 transition duration-150 text-red-700"
                          variant="link"
                        >
                          Remove
                        </Button>
                      </AlertDialogBox>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </section>
  )
}
