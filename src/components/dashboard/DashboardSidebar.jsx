import {
  LayoutSideContent,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Briefcase,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import {
  LayoutDashboard,
  Search,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
} from "lucide-react";
import { getUserSession } from "@/lib/core/session";

export async function DashboardSidebar() {
  const user = await getUserSession();
  const recruiterNavLinks = [
    { icon: House, label: "Home", href: "/dashboard/recruiter" },
    { icon: Magnifier, label: "Jobs", href: "/dashboard/recruiter/jobs" },
    { icon: Briefcase, label: "Company", href: "/dashboard/recruiter/company" },
    { icon: Bell, label: "Post a Job", href: "/dashboard/recruiter/jobs/new" },
    { icon: Person, label: "Profile", href: "#" },
    { icon: Gear, label: "Settings", href: "#" },
  ];
  const seekerNavLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/seeker" },
    { icon: Search, label: "Jobs", href: "/dashboard/seeker/jobs" },
    {
      icon: Bookmark,
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
    },
    {
      icon: FileText,
      label: "Applications",
      href: "/dashboard/seeker/applications",
    },
    { icon: CreditCard, label: "Billing", href: "/dashboard/seeker/billing" },
    { icon: Settings, label: "Settings", href: "/dashboard/seeker/settings" },
  ];
  const navLinksMap = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
  };
  const navItems = navLinksMap[user?.role || "seeker"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64  border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button variant="secondary" className="md:hidden">
          <LayoutSideContent />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
