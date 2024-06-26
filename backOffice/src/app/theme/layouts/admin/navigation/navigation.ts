export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
}
export const NavigationItemsAdmin: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'elements',
    title: 'UI Components',
    type: 'group',
    icon: 'icon-navigation',
    children: [


      {
        id: 'list-reclamation',
        title: 'Reclamations',
        type: 'item',
        classes: 'nav-item',
        url: '/list-reclamation',
        icon: 'fas fa-book-medical'
      },

      {
        id: 'user',
        title: 'User',
        type: 'item',
        classes: 'nav-item',
        url: '/user',
        icon: 'ti ti-loader'
      },


    ]
  }


];
export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'elements',
    title: 'UI Components',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'products',
        title: 'Product',
        type: 'item',
        classes: 'nav-item',
        url: '/products',
        icon: 'ti ti-typography'
      },
      {
        id: 'productsPayed',
        title: 'products Payed',
        type: 'item',
        classes: 'nav-item',
        url: "/products-payed",
        icon: 'ti ti-credit-card'
      },
      {
        id: 'categories',
        title: 'Category',
        type: 'item',
        classes: 'nav-item',
        url: '/categories',
        icon: 'ti ti-credit-card'
      },
      {
        id: 'Assistante',
        title: 'AssistanteClientelle',
        type: 'item',
        classes: 'nav-item',
        url: '/Assistante',
        icon: 'ti ti-user'
      },
      {
        id: 'list-reclamation',
        title: 'Reclamations',
        type: 'item',
        classes: 'nav-item',
        url: '/list-reclamation',
        icon: 'fas fa-book-medical'
      },
      {
        id: 'orders',
        title: 'Order',
        type: 'item',
        classes: 'nav-item',
        url: '/orders',
        icon: 'ti ti-hierarchy-2'
      },
      {
        id: 'user',
        title: 'User',
        type: 'item',
        classes: 'nav-item',
        url: '/user',
        icon: 'ti ti-loader'
      },
      {
        id: 'color',
        title: 'Roulette',
        type: 'item',
        classes: 'nav-item',
        url: '/color',
        icon: 'ti ti-brush'
      },
      {
        id: 'pack',
        title: 'Pack',
        type: 'item',
        classes: 'nav-item',
        url: '/pack',
        icon: 'ti ti-leaf',

      },
      {
        id: 'whellMangement',
        title: 'whellMangement',
        type: 'item',
        classes: 'nav-item',
        url: '/whellMangement',
        icon: 'ti ti-letter-w',

      },
      {
        id: 'blog',
        title: 'BlogMangement',
        type: 'item',
        classes: 'nav-item',
        url: '/article',
        icon: 'ti ti-lego',

      }
    ]
  },


];
