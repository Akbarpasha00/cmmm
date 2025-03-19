import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Building2, Briefcase, Calendar, TrendingUp, CheckCircle } from "lucide-react"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartGrid,
  ChartLine,
  ChartArea,
  ChartXAxis,
  ChartYAxis,
  ChartBar,
} from "@/components/ui/chart"

const stats = [
  {
    title: "Total Candidates",
    value: "2,543",
    description: "Active candidates in the system",
    icon: Users,
    trend: "+12.5%",
    trendUp: true,
  },
  {
    title: "Companies",
    value: "45",
    description: "Partnered companies",
    icon: Building2,
    trend: "+3.2%",
    trendUp: true,
  },
  {
    title: "Open Offers",
    value: "128",
    description: "Available positions",
    icon: Briefcase,
    trend: "+28.4%",
    trendUp: true,
  },
  {
    title: "Upcoming Drives",
    value: "12",
    description: "Scheduled in next 30 days",
    icon: Calendar,
    trend: "-4.3%",
    trendUp: false,
  },
]

const placementData = [
  { month: "Jan", placements: 65 },
  { month: "Feb", placements: 59 },
  { month: "Mar", placements: 80 },
  { month: "Apr", placements: 81 },
  { month: "May", placements: 56 },
  { month: "Jun", placements: 55 },
  { month: "Jul", placements: 40 },
  { month: "Aug", placements: 70 },
  { month: "Sep", placements: 90 },
  { month: "Oct", placements: 110 },
  { month: "Nov", placements: 95 },
  { month: "Dec", placements: 120 },
]

const offersByCompany = [
  { name: "Tech Corp", offers: 45 },
  { name: "Global Systems", offers: 32 },
  { name: "Innovate Inc", offers: 28 },
  { name: "Data Solutions", offers: 22 },
  { name: "Cloud Services", offers: 18 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className={`mt-2 flex items-center text-xs ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                {stat.trendUp ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingUp className="mr-1 h-3 w-3 rotate-180" />
                )}
                {stat.trend} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Placements Overview</CardTitle>
                <CardDescription>Monthly placement statistics for the current year</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer>
                  <Chart className="h-[300px]">
                    <ChartTooltip />
                    <ChartGrid />
                    <ChartXAxis dataKey="month" />
                    <ChartYAxis />
                    <ChartLine dataKey="placements" data={placementData} stroke="#6366f1" strokeWidth={2} />
                    <ChartArea
                      dataKey="placements"
                      data={placementData}
                      fill="url(#colorPlacements)"
                      fillOpacity={0.2}
                    />
                    <defs>
                      <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </Chart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Offers by Company</CardTitle>
                <CardDescription>Top companies with open positions</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer>
                  <Chart className="h-[300px]">
                    <ChartTooltip />
                    <ChartGrid horizontal={true} />
                    <ChartXAxis dataKey="offers" />
                    <ChartYAxis dataKey="name" type="category" width={100} />
                    <ChartBar dataKey="offers" data={offersByCompany} fill="#6366f1" radius={[0, 4, 4, 0]} />
                  </Chart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Placements</CardTitle>
                <CardDescription>Latest successful placements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Candidate {i}</p>
                        <p className="text-xs text-muted-foreground">Placed at Company {i}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">Today</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Drives</CardTitle>
                <CardDescription>Scheduled in the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Company {i} Drive</p>
                        <p className="text-xs text-muted-foreground">March {10 + i}, 2025</p>
                      </div>
                      <div className="text-xs text-muted-foreground">{i} days</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Skills in Demand</CardTitle>
                <CardDescription>Most requested skills by companies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "React.js", count: 45 },
                    { skill: "Python", count: 38 },
                    { skill: "Data Analysis", count: 32 },
                    { skill: "Machine Learning", count: 28 },
                    { skill: "Cloud Computing", count: 25 },
                  ].map((item) => (
                    <div key={item.skill} className="flex items-center justify-between">
                      <span className="text-sm">{item.skill}</span>
                      <span className="text-xs font-medium text-muted-foreground">{item.count} positions</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>In-depth analysis of placement data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Analytics content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Download and view reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Reports content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

