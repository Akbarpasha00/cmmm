"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, Download, Edit, Trash2, Eye, MapPin, Globe, Users } from "lucide-react"

// Mock data for companies
const mockCompanies = [
  {
    id: "1",
    name: "Tech Innovations Inc.",
    industry: "Software Development",
    location: "San Francisco, CA",
    website: "https://techinnovations.example.com",
    employees: "1000+",
    openPositions: 12,
    status: "Active",
  },
  {
    id: "2",
    name: "Global Systems Ltd.",
    industry: "IT Services",
    location: "New York, NY",
    website: "https://globalsystems.example.com",
    employees: "500-1000",
    openPositions: 8,
    status: "Active",
  },
  {
    id: "3",
    name: "Data Solutions Corp.",
    industry: "Data Analytics",
    location: "Boston, MA",
    website: "https://datasolutions.example.com",
    employees: "100-500",
    openPositions: 5,
    status: "Inactive",
  },
  {
    id: "4",
    name: "Cloud Services Inc.",
    industry: "Cloud Computing",
    location: "Seattle, WA",
    website: "https://cloudservices.example.com",
    employees: "500-1000",
    openPositions: 10,
    status: "Active",
  },
  {
    id: "5",
    name: "Innovate Technologies",
    industry: "AI & Machine Learning",
    location: "Austin, TX",
    website: "https://innovatetech.example.com",
    employees: "100-500",
    openPositions: 7,
    status: "Active",
  },
]

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(mockCompanies)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would add the company to the database
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>Enter the company details below to add them to the system.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCompany}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input id="name" placeholder="Tech Innovations Inc." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" placeholder="Software Development" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="San Francisco, CA" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="https://example.com" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employees">Employee Count</Label>
                    <Input id="employees" placeholder="1000+" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="openPositions">Open Positions</Label>
                    <Input id="openPositions" type="number" placeholder="10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea id="description" placeholder="Brief description of the company..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Company</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Company Management</CardTitle>
          <CardDescription>View and manage all partner companies in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search companies..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-10">No companies found.</div>
            ) : (
              filteredCompanies.map((company) => (
                <Card key={company.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <CardDescription>{company.industry}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {company.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Globe className="mr-2 h-4 w-4" />
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Website
                        </a>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="mr-2 h-4 w-4" />
                        {company.employees} employees
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <Badge variant="outline" className="bg-primary/10">
                          {company.openPositions} open positions
                        </Badge>
                        <Badge
                          className={company.status === "Active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"}
                        >
                          {company.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

