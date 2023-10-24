export interface SideBarItemInterface {
  title: string;
  icon: string;
  link: string;
}

export const items: SideBarItemInterface[] = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/app/dashboard",
  },
  {
    title: "Reports",
    icon: "description",
    link: "/app/reports",
  },
  {
    title: "Messages",
    icon: "mail",
    link: "/app/messages",
  },
  {
    title: "Website",
    icon: "domain_add",
    link: "/app/website",
  },
  {
    title: "Donations",
    icon: "volunteer_activism",
    link: "/app/donations",
  },
];
