export const sideBarItemActive = (link: string) => {
   if (window.location.href === link) return true
   else return false
}