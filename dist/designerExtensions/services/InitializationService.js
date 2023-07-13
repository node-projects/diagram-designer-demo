export class IntitializationService {
    init(designItem) {
        const id = Date.now().toString(36);
        designItem.id = id;
    }
}
