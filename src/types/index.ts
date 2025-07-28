// Общие типы для приложения

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  title?: string;
  navItems?: NavItem[];
}

export interface PageProps {
  title?: string;
} 