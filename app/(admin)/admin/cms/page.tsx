"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Eye, Trash2, MoreHorizontal, FileText } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const blogPosts = [
  { id: "1", title: "10 Best Anniversary Gift Ideas for 2025", category: "Gift Ideas", status: "Published", date: "28 May 2025", views: 1250 },
  { id: "2", title: "Fresh vs Dried Bouquets — Which Lasts Longer?", category: "Flower Trends", status: "Published", date: "25 May 2025", views: 830 },
  { id: "3", title: "The Ultimate Valentine's Day Gift Guide", category: "Holiday Collections", status: "Draft", date: "20 May 2025", views: 0 },
];

const pages = [
  { id: "1", title: "About Us", slug: "/about", lastEdited: "15 May 2025" },
  { id: "2", title: "Terms & Conditions", slug: "/terms", lastEdited: "10 May 2025" },
  { id: "3", title: "Privacy Policy", slug: "/privacy", lastEdited: "10 May 2025" },
  { id: "4", title: "Returns & Refunds", slug: "/returns", lastEdited: "10 May 2025" },
];

export default function AdminCMSPage() {
  const [tab, setTab] = useState("blog");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Content Management</h1>
          <p className="text-muted-foreground mt-1">Manage blog posts and static pages</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> New Post
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">{post.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{post.category}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === "Published" ? "default" : "secondary"}>{post.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{post.views.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{post.date}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                            <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> Preview</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Static Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Last Edited</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{page.slug}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{page.lastEdited}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
