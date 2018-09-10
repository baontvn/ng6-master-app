export interface SideBarItem {
    id: any;
    name: string;
    route: string;
    isShow?: boolean;
    icon?: any;
    parentId?: any;
    children?: SideBarItem[];
}
