export class Navigation {
    treeViewData: Element;

    constructor(data?) {
        this.treeViewData = new Element();
        if (data) {
            this.parse(data);
        }
    }

    parse(data) {
        this.treeViewData = new Element({
            id: data.id,
            name: data.name,
            type: data.type,
            children: data.children
        });
    }
}

export class Element {
    id: string;
    name: string;
    parentName: string;
    parentType: string;
    type: string;
    children: Array<Element> = [];

    constructor(params: any = {}) {
        this.id = params.id;
        this.name = params.name;
        this.parentName = params.parentName;
        this.parentType = params.parentType;
        this.type = params.type;
        if (params.children) {
            params.children.forEach(child => {
                this.children.push(new Element(child));
            });
        }
    }
}
