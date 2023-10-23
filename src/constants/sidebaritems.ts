export interface SideBarItemInterface {
  title: string;
  icon: string;
  link: string;
}

export const items : SideBarItemInterface[] = [
    {
        title: 'Dashboard',
        icon: '📊',
        link: '/app/dashboard'
       },
  {
    title: 'Reports',
    icon: '📄',
    link: '/app/reports'
   },
   {
    title: 'Messages',
    icon: '💬',
    link: '/app/messages',
   },
   {
    title: 'Website',
    icon: '🌐',
    link: '/app/website',
   },
   {
    title: 'Donations',
    icon: '💰',
    link: '/app/donations',
   },
]