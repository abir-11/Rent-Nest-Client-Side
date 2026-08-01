"use client";

import { motion } from "framer-motion";
import { Home, LogOut, Settings, User, Search, Map } from "lucide-react";
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
  { label: "Find Rooms", href: "/rooms", icon: Search },
  { label: "Categories", href: "/categories", icon: Map },
  { label: "About Us", href: "/about", icon: Home },
];

const userMenuItems = [
  { label: "My Profile", icon: User, action: "/profile" },
  { label: "Settings", icon: Settings, action: "/settings" },
];

export function Navbar({ user }: any) {
  const router = useRouter();
  const pathname = usePathname();
  console.log("Navbar user:", user); // Debugging line to check the user object

const isLoggedIn = user?.success && !!user?.data?.user;

const userName = user?.data?.user?.name || "User Name";
const userEmail = user?.data?.user?.email || "user@email.com";

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
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-extrabold text-white flex items-center gap-2 tracking-wide"
            >
              <Home className="text-emerald-400 w-7 h-7" />
              Rent<span className="text-emerald-400">Nest</span>
            </motion.div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="relative group flex items-center gap-2">
                <item.icon className="w-4 h-4 text-emerald-400/80 group-hover:text-emerald-400 transition-colors" />
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  {item.label}
                </span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-7 left-0 right-0 h-[2px] bg-emerald-500"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-500/50 flex items-center justify-center bg-black/40 overflow-hidden">
                      <User className="w-5 h-5 text-emerald-400" />
                    </div>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#0B1C14] border-emerald-900 text-white mt-2 shadow-2xl">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-emerald-400/70">{userEmail}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-emerald-900/50" />
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() => handleAction(item.action)}
                      className="hover:bg-emerald-900/80 focus:bg-emerald-900/80 cursor-pointer"
                    >
                      <item.icon className="w-4 h-4 mr-2 text-emerald-400" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-emerald-900/50" />
                  <DropdownMenuItem onClick={() => handleAction("logout")} className="text-red-400 hover:text-white focus:bg-red-600  cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-3 items-center">
                <Link href="/login" className="text-white hover:text-emerald-400 text-sm font-medium transition-colors hidden sm:block">
                  Sign In
                </Link>
                <Link href="/register">
                  <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                    Register Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}