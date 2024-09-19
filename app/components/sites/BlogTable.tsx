import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { BadgeAlertIcon, Edit2Icon, MoreHorizontal, Trash2Icon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { SubmitButton } from "../dashboard/SubmitButton";
import { Input } from "@/components/ui/input";
import { DeletePost } from "@/app/actions";

interface Post {
    id: string;
    title: string;
    image: string;
    createdAt: Date;
  }
  
  interface PostDataProps {
    posts: Post[];
    siteId : string
  }
  
export default function BlogTable({ posts, siteId }: PostDataProps, post: Post) {
    return (
        <div>
        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
            <CardDescription>
              Manage your Articles here. Click on action button to see article options.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead className="font-semibold">Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.image}
                        width={64}
                        height={64}
                        alt="Article Cover Image"
                        className="size-16 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-500"
                      >
                        Published
                      </Badge>
                    </TableCell>
                    <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-end">
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/sites/${siteId}/${item.id}`}
                            >
                              <Edit2Icon className="mr-3 size-4"/> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DialogTrigger asChild>
                          <DropdownMenuItem asChild>
                            <div className="bg-red-600 rounded-lg w-full" >
                             <Trash2Icon className="mr-3 size-4"/>Delete
                            </div>
                          </DropdownMenuItem>
                          </DialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center"><BadgeAlertIcon className="size-6 mr-3"/> Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. Are you sure you want to permanently
                          delete this file from our servers?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                        <form action={DeletePost}>
                          <Input type="hidden" name="articleId" value={item.id}/>
                          <Input type="hidden" name="siteId" value={siteId}/>
                        <SubmitButton text="Delete" icon={<Trash2Icon/>} variant={"destructive"} />
                        </form>
                        </DialogFooter>
                      </DialogContent> 
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }
  