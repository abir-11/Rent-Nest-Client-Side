"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  LogOut,
 
  User,
  Search,
  Map,
  Menu,
  X,
} from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/app/(auth)/_actions/loginAction";

const navItems = [
  { label: "Find Property", href: "/properties", icon: Search },
  { label: "Categories", href: "/categories", icon: Map },
  { label: "About Us", href: "/about", icon: Home },
];
const getDashboardPath = (role?: string) => {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin";
    case "LANDLORD":
      return "/dashboard/landlord";
    case "TENANT":
      return "/dashboard/tenant";
    default:
      return "/dashboard"; 
  }
};

export function Navbar({ user }: any) {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = user?.success && !!user?.data?.user;

  const userName = user?.data?.user?.name || "User Name";
  const userEmail = user?.data?.user?.email || "user@email.com";
  const userMenuItems = [
  { 
    label: "My Profile", 
    icon: User, 
    action: `/dashboard/${getDashboardPath(user?.role)}/profile` // বা /profile
  },
  { 
    label: "Dashboard", 
    icon: LayoutDashboard, 
    action: `/dashboard/${getDashboardPath(user?.role)}`
  },
];


  const handleAction = async (action: string) => {
    if (action === "logout") {
      const res = await logoutAction();

      if (res.success) {
        toast.success(res.message);
        router.push("/login");
        router.refresh();
      }

      return;
    }

    router.push(action);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-2xl font-bold text-white"
            >
              <Home className="h-7 w-7 text-emerald-400" />
              Rent<span className="text-emerald-400">Nest</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center gap-2 group"
              >
                <item.icon className="h-4 w-4 text-emerald-400" />

                <span className="text-sm font-medium text-white/80 group-hover:text-white">
                  {item.label}
                </span>

                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-5 left-0 right-0 h-[2px] bg-emerald-500"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Desktop User */}
            <div className="hidden md:flex items-center">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="cursor-pointer"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-500/50 bg-black/40">
                        <User className="h-5 w-5 text-emerald-400" />
                      </div>
                    </motion.div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-56 border-emerald-900 bg-[#0B1C14] text-white"
                  >
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{userName}</span>
                        <span className="text-xs text-emerald-400">
                          {userEmail}
                        </span>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {userMenuItems.map((item) => (
                      <DropdownMenuItem
                        key={item.action}
                        onClick={() => handleAction(item.action)}
                        className="cursor-pointer"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => handleAction("logout")}
                      className="cursor-pointer text-red-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/login">
                    <span className="text-sm text-white hover:text-emerald-400">
                      Sign In
                    </span>
                  </Link>

                  <Link href="/register">
                    <Button className="rounded-full bg-emerald-600 hover:bg-emerald-500">
                      Register Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-white md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.25 }}
            className="border-t border-emerald-900 bg-[#07140E]/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col py-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 ${
                    pathname === item.href
                      ? "bg-emerald-600 text-white"
                      : "text-gray-300 hover:bg-emerald-900/40"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 border-t border-emerald-900 pt-3">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        router.push("/profile");
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-5 py-4 text-white hover:bg-emerald-900/40"
                    >
                      <User className="h-5 w-5" />
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        router.push("/settings");
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-5 py-4 text-white hover:bg-emerald-900/40"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        handleAction("logout");
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-5 py-4 text-red-400 hover:bg-red-500/20"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-3 px-5 py-3">
                    <Link href="/login">
                      <Button
                        onClick={() => setMobileMenuOpen(false)}
                        variant="outline"
                        className="w-full mb-1"
                      >
                        Sign In
                      </Button>
                    </Link>

                    <Link href="/register">
                      <Button
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full bg-emerald-600 hover:bg-emerald-500"
                      >
                        Register Free
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}