import { IDesignItem, IIntializationService } from "@node-projects/web-component-designer";

export class IntitializationService implements IIntializationService {
    init(designItem: IDesignItem): void {
        const id = Date.now().toString(36);
        designItem.id = id;
    }
}