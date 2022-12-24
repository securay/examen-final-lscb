export class BreadcrumbEntity {
    url: string[];
    description: string;
    enabled: boolean;

    constructor(url: string[], description: string, enabled: boolean) {
        this.description = description;
        this.url = url;
        this.enabled = enabled;
        console.log(url);
    }
}
