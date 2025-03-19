"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, Filter, Download, Edit, Trash2, Eye } from "lucide-react"

const mockCandidates = []

const statusColors: Record<string, string> = {
  Active: "bg-blue-500",
  Placed: "bg-green-500",
  Interviewing: "bg-yellow-500",
  Inactive: "bg-gray-500",
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState(mockCandidates)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || candidate.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Candidates</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>Enter the candidate details below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCandidate}>
              <div className="grid gap-4 py-4 grid-cols-2">
                <div><Label>Name</Label><Input required /></div>
                <div><Label>Email</Label><Input type="email" required /></div>
                <div><Label>Mobile</Label><Input required /></div>
                <div><Label>Gender</Label><Input required /></div>
                <div><Label>SSC %</Label><Input type="number" step="0.01" required /></div>
                <div><Label>Inter/Diploma %</Label><Input type="number" step="0.01" required /></div>
                <div><Label>B.Tech %</Label><Input type="number" step="0.01" required /></div>
                <div><Label>PG % (Optional)</Label><Input type="number" step="0.01" /></div>
                <div><Label>Branch</Label><Input required /></div>
                <div><Label>College Name</Label><Input required /></div>
                <div><Label>Offer Status</Label><Input required /></div>
                <div><Label>Company Name</Label><Input required /></div>
                <div><Label>CTC</Label><Input required /></div>
                <div><Label>Reference</Label><Input /></div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Add Candidate</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Candidate Management</CardTitle>
          <CardDescription>View and manage all candidates in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search candidates..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("All")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Placed")}>Placed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Interviewing")}>Interviewing</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Inactive")}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          <div className="mt-6 rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>SSC %</TableHead>
                  <TableHead>Inter/Diploma %</TableHead>
                  <TableHead>B.Tech %</TableHead>
                  <TableHead>PG %</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Offer</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>CTC</TableHead>
                  <TableHead>Ref</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={15} className="h-24 text-center">
                      No candidates found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>{candidate.name}</TableCell>
                      <TableCell>{candidate.email}</TableCell>
                      <TableCell>{candidate.phone}</TableCell>
                      <TableCell>{candidate.gender}</TableCell>
                      <TableCell>{candidate.ssc}</TableCell>
                      <TableCell>{candidate.inter}</TableCell>
                      <TableCell>{candidate.btech}</TableCell>
                      <TableCell>{candidate.pg}</TableCell>
                      <TableCell>{candidate.branch}</TableCell>
                      <TableCell>{candidate.college}</TableCell>
                      <TableCell>{candidate.offer}</TableCell>
                      <TableCell>{candidate.company}</TableCell>
                      <TableCell>{candidate.ctc}</TableCell>
                      <TableCell>{candidate.reference}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

