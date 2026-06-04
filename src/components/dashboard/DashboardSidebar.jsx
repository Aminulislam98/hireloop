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

export function DashboardSidebar() {
  const navItems = [
    { icon: House, label: "Home", href: "/dashboard/recruiter" },
    { icon: Magnifier, label: "Jobs", href: "/dashboard/recruiter/jobs" },
    { icon: Briefcase, label: "Company", href: "/dashboard/recruiter/company" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: Person, label: "Profile", href: "#" },
    { icon: Gear, label: "Settings", href: "#" },
  ];

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
