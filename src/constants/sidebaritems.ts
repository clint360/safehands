export interface SideBarItemInterface {
  title: string;
  icon: string;
  link: string;
}

export const items : SideBarItemInterface[] = [
    {
        title: 'Dashboard',
        icon: '📊',
        link: ''
       },
  {
    title: 'Reports',
    icon: '📄',
    link: ''
   },
   {
    title: 'Messages',
    icon: '💬',
    link: '',
   },
   {
    title: 'Website',
    icon: '🌐',
    link: '',
   },
   {
    title: 'Donations',
    icon: '💰',
    link: '',
   },
]