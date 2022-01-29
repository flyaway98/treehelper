export interface TreeItem {
    id: string;
    name: string;
    children: this[];
}
export interface FlattenedItem {
    id: string;
    name: string;
    parentId: null | string;
    depth: number;
    index: number;
    visitPath: string;
}
/**
 * @description: flatten the nested tree into a normal array
 */
export declare function flattenTree<T extends TreeItem, V extends FlattenedItem>(items: T[]): V[];
/**
 *
 * @description: convert flattened array to nested tree array
 */
export declare function buildTree<T extends TreeItem, V extends FlattenedItem>(flattenedItems: V[]): T[];
/**
 * @description traversing the tree node and  execute the action function for each tree node
 */
export declare function visitTree<T extends TreeItem>(items: T[], action: (item: T) => void): void;
/**
 * @description shallow search
*/
export declare function findItem<T extends TreeItem>(items: T[], itemId: string): T | undefined;
/**
 * @description deep search
*/
export declare function findItemDeep<T extends TreeItem>(items: T[], itemId: string): TreeItem | undefined;
/**
 * @description remove tree node then return newtree nodes which not contains param id
*/
export declare function removeItem<T extends TreeItem>(items: T[], id: string): T[];
/**
 * @description  set tree node then return newtree nodes, and not change  original tree nodes
*/
export declare function setProperty<T extends TreeItem>(items: T[], id: string, propertyName: keyof T, setter: (item: T) => any): T[];
/**
 * @description: count the number of all descendant nodes
*/
export declare function getChildCount<T extends TreeItem>(items: T[], id: string): number;
