export interface SidebarProps {
    collapsed: boolean;
    currentPage: string;
    onPageChange: (pageId: string) => void;
    onToggle: () => void;
}
