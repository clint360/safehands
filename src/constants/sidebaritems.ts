import { User } from "@supabase/auth-helpers-nextjs";

export interface SideBarItemInterface {
  title: string;
  icon: string;
  link: string;
  adminItem: boolean;
  user?: User
}

export const items: SideBarItemInterface[] = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/app/dashboard",
    adminItem: true
  },
  {
    title: "Reports",
    icon: "description",
    link: "/app/reports",
    adminItem: false
  },
  // {
  //   title: "Messages",
  //   icon: "mail",
  //   link: "/app/messages",
  //   adminItem: false
  // },
  {
    title: "Website",
    icon: "domain_add",
    link: "/app/website",
    adminItem: true
  }
];
