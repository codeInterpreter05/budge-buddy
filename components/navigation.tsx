"use client"

import { NavButton } from "./nav-button"
import { usePathname, useRouter } from "next/navigation"
import { useMedia } from "react-use"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"

const routes = [
    {
        href: "/",
        label: "Overview"
    }, 
    {
        href: "/transactions",
        label: "Transactions"
    }, 
    {
        href: "/accounts",
        label: "Accounts"
    },
    {
        href: "/categories",
        label: "Categories"
    }, 
    {
        href: "/settings",
        label: "Settings"
    }
]

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useMedia("(max-width: 1024px)", false);

    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }

    if(isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transiton"
                    >
                        <Menu className="h-4 w-4 " />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2 bg-white">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {
                            routes.map(({ href, label }, index) => (
                            <Button
                                variant={href === pathname ? "secondary": "ghost"}
                                key={href}
                                onClick={() => {onClick(href)}}
                                className="w-full justify-start"
                            >
                                {label}
                            </Button>
                            ))
                        }
                    </nav>
                </SheetContent> 
            </Sheet>
        )
    }



    return (
        <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {
                routes.map(({ href, label }, index) => (
                    <NavButton 
                    key={index} 
                    label={label}
                    href={href}
                    isActive={pathname === href}
                    />
                ))
            }
        </div>
    )
}