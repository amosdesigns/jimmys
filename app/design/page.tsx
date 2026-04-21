import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ShoppingCart,
  Search,
  Coffee,
  UtensilsCrossed,
  Salad,
  Beer,
  Star,
  Package,
  Users,
  ClipboardList,
  TrendingUp,
  Plus,
  Bell,
  Settings,
} from "lucide-react";

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-16">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Jimmy&apos;s Cafe — Design System
        </h1>
        <p className="text-muted-foreground mt-1">
          Component showcase and visual reference
        </p>
      </div>

      <Separator />

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Background",
              hex: "#FDFBF2",
              cls: "bg-background border border-border",
            },
            { name: "Primary (Navy)", hex: "#1E3A5F", cls: "bg-primary" },
            { name: "Accent (Yellow)", hex: "#F5C518", cls: "bg-accent" },
            { name: "Foreground", hex: "#2C1A0E", cls: "bg-foreground" },
            {
              name: "Muted",
              hex: "#F0EDD8",
              cls: "bg-muted border border-border",
            },
            { name: "Muted Text", hex: "#6B5B45", cls: "bg-muted-foreground" },
            { name: "Border", hex: "#E5DFC8", cls: "bg-border" },
            { name: "Destructive", hex: "#DC2626", cls: "bg-destructive" },
          ].map((color) => (
            <div key={color.name} className="space-y-2">
              <div className={`h-16 rounded-lg ${color.cls}`} />
              <p className="text-sm font-medium">{color.name}</p>
              <p className="text-xs text-muted-foreground font-mono">
                {color.hex}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Typography */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Typography</h2>
        <div className="space-y-4">
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-muted-foreground w-24 shrink-0">
              Page Title
            </span>
            <p className="text-2xl font-bold">Jimmy&apos;s Cafe Dashboard</p>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-muted-foreground w-24 shrink-0">
              Section
            </span>
            <p className="text-lg font-semibold">Featured Items</p>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-muted-foreground w-24 shrink-0">
              Body
            </span>
            <p className="text-sm">
              Ultimate breakfast burrito with eggs, cheese, and salsa
            </p>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-muted-foreground w-24 shrink-0">
              Label
            </span>
            <p className="text-sm font-medium">Order Number</p>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-muted-foreground w-24 shrink-0">
              Caption
            </span>
            <p className="text-xs text-muted-foreground">Today at 9:41 AM</p>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-muted-foreground w-24 shrink-0">
              Price
            </span>
            <p className="text-xl font-bold">$12.99</p>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-muted-foreground w-24 shrink-0">
              Order #
            </span>
            <p className="text-sm font-medium font-mono">ORD-2026-0042</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground h-12 px-8"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Checkout
          </Button>
          <Button variant="default">Place Order</Button>
          <Button variant="outline">View Details</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="ghost">Skip</Button>
          <Button size="sm">Small</Button>
          <Button
            size="icon"
            className="bg-accent text-accent-foreground rounded-full"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </section>

      <Separator />

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Badges</h2>

        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            Order Status
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
              PENDING
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              CONFIRMED
            </Badge>
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              PREPARING
            </Badge>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              READY
            </Badge>
            <Badge className="bg-gray-100 text-gray-700 border-gray-200">
              COMPLETED
            </Badge>
            <Badge className="bg-red-100 text-red-800 border-red-200">
              CANCELLED
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              REFUNDED
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            User Roles
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              SUPER ADMIN
            </Badge>
            <Badge className="bg-red-100 text-red-800 border-red-200">
              ADMIN
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              STAFF
            </Badge>
            <Badge className="bg-gray-100 text-gray-700 border-gray-200">
              USER
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            Order Type
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Dine In</Badge>
            <Badge variant="outline">Takeout</Badge>
            <Badge variant="outline">Delivery</Badge>
            <Badge variant="outline">Online</Badge>
          </div>
        </div>
      </section>

      <Separator />

      {/* Stat Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Stat Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "Pending Orders",
              value: "12",
              icon: ClipboardList,
              color: "text-amber-500",
            },
            {
              label: "Completed Today",
              value: "48",
              icon: Package,
              color: "text-green-500",
            },
            {
              label: "Revenue Today",
              value: "$1,284",
              icon: TrendingUp,
              color: "text-blue-500",
            },
            {
              label: "Active Products",
              value: "36",
              icon: Star,
              color: "text-accent",
            },
          ].map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-sm">
                  {stat.label}
                </CardDescription>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Product Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Product Cards</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Ultimate Breakfast Burrito",
              desc: "Short on breakfast with ultimate breakfast burrito",
              price: "$12.99",
            },
            {
              name: "Grilled Chicken Sandwich",
              desc: "Grilled chicken sandwich with chicken and burrito",
              price: "$14.50",
            },
            {
              name: "Classic Pancakes",
              desc: "Fluffy buttermilk pancakes with maple syrup",
              price: "$9.99",
            },
            {
              name: "Cafe Latte",
              desc: "Espresso with steamed whole milk and light foam",
              price: "$5.50",
            },
          ].map((product) => (
            <Card
              key={product.name}
              className="overflow-hidden border-border p-0"
            >
              <div className="h-36 bg-muted flex items-center justify-center">
                <Coffee className="w-12 h-12 text-muted-foreground" />
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-semibold leading-tight line-clamp-1">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {product.desc}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-base font-bold">{product.price}</p>
                  <button className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Category Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Category Icons</h2>
        <div className="flex gap-6">
          {[
            { label: "Breakfast", icon: Coffee, color: "text-amber-700" },
            { label: "Lunch", icon: UtensilsCrossed, color: "text-green-700" },
            { label: "Sides", icon: Salad, color: "text-orange-600" },
            { label: "Drinks", icon: Beer, color: "text-blue-700" },
            { label: "Specials", icon: Star, color: "text-yellow-600" },
          ].map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                <cat.icon
                  className={`w-6 h-6 ${cat.color}`}
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-xs text-center font-medium">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Search Bar */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Search</h2>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search menu..."
            className="pl-9 rounded-full bg-muted border-transparent focus-visible:border-primary"
          />
        </div>
      </section>

      <Separator />

      {/* Form Elements */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
          <div className="space-y-2">
            <Label>Customer Name</Label>
            <Input placeholder="Enter name..." />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input placeholder="+1 (555) 000-0000" type="tel" />
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Input placeholder="Special instructions..." />
          </div>
        </div>
      </section>

      <Separator />

      {/* Avatars */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Avatars</h2>
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              JA
            </AvatarFallback>
          </Avatar>
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
              MR
            </AvatarFallback>
          </Avatar>
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
              TK
            </AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              SA
            </AvatarFallback>
          </Avatar>
        </div>
      </section>

      <Separator />

      {/* Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Orders Table</h2>
        <Card className="border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Order #</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">
                  Customer
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "ORD-2026-0042",
                  type: "Dine In",
                  customer: "Jerome A.",
                  status: "PREPARING",
                  statusCls: "bg-orange-100 text-orange-800",
                  total: "$34.50",
                },
                {
                  id: "ORD-2026-0041",
                  type: "Takeout",
                  customer: "Walk-in",
                  status: "READY",
                  statusCls: "bg-green-100 text-green-800",
                  total: "$12.99",
                },
                {
                  id: "ORD-2026-0040",
                  type: "Delivery",
                  customer: "Maria R.",
                  status: "CONFIRMED",
                  statusCls: "bg-blue-100 text-blue-800",
                  total: "$28.00",
                },
                {
                  id: "ORD-2026-0039",
                  type: "Dine In",
                  customer: "Tom K.",
                  status: "COMPLETED",
                  statusCls: "bg-gray-100 text-gray-700",
                  total: "$19.75",
                },
                {
                  id: "ORD-2026-0038",
                  type: "Online",
                  customer: "Sara J.",
                  status: "PENDING",
                  statusCls: "bg-amber-100 text-amber-800",
                  total: "$45.20",
                },
              ].map((order) => (
                <TableRow key={order.id} className="border-border">
                  <TableCell className="font-mono text-sm font-medium">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-sm">{order.type}</TableCell>
                  <TableCell className="text-sm">{order.customer}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${order.statusCls} border-0`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {order.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      <Separator />

      {/* Skeletons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Loading States</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-border p-4 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </Card>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </section>

      <Separator />

      {/* Nav Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Navigation (Admin)</h2>
        <div className="bg-primary text-primary-foreground rounded-xl overflow-hidden max-w-2xl">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-bold text-lg">
                <Coffee className="w-5 h-5 text-accent" />
                Jimmy&apos;s Orders
              </div>
              <nav className="flex items-center gap-1 text-sm">
                {[
                  { label: "Dashboard", icon: TrendingUp, active: true },
                  { label: "Orders", icon: ClipboardList, active: false },
                  { label: "Products", icon: Package, active: false },
                  { label: "Customers", icon: Users, active: false },
                  { label: "Team", icon: Settings, active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors ${
                      item.active
                        ? "bg-accent text-accent-foreground font-semibold"
                        : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </div>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary-foreground/70" />
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold">
                JA
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
