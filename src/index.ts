export interface TreeItem {
    id: string;
    name: string;
    children: this[];
}

export interface FlattenedItem {
    id: string;
    name: string;
    parentId: null | string;
    // first is 0
    depth: number;
    index: number;
    visitPath: string;
}

function flatten<T extends TreeItem,V extends FlattenedItem>(items: T[], parentId: string | null = null, depth = 0,visitPath = ''): V[] {
  return items.reduce<V[]>((acc, item, index) => {
    const newItem = { ...item, parentId, depth, index,visitPath:`${visitPath}${item.id},`};
    return [...acc, newItem, ...flatten(item.children ?? [], item.id, depth + 1,newItem.visitPath)] as V[];
  }, []);
}

function countChildren<T extends TreeItem>(items: T[], count = 0): number {
  return items.reduce((acc, { children }) => {
    if (Array.isArray(children) && children.length) {
      return countChildren(children, acc + 1);
    }
    return acc + 1;
  }, count);
}

export function flattenTree<T extends TreeItem,V extends FlattenedItem>(items: T[]) {
  return flatten<T,V>(items);
}

export function buildTree<T extends TreeItem,V extends FlattenedItem>(flattenedItems: V[]): T[] {
  const root = { id: 'root', name: '', children: [] };
  const nodes: Record<string, TreeItem> = { [root.id]: root };
  const items = flattenedItems.map((item) => ({ ...item, children: [] }));
  for (const item of items) {
    const { id, name, children } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);
    nodes[id] = { id, name, children };
    parent.children.push(item);
  }
  return root.children;
}

export function visitTree<T extends TreeItem>(items: T[], action: (item: T) => void) {
  for (let item of items) {
    action(item);
    if (Array.isArray(item.children) && item.children.length > 0) visitTree(item.children as T[], action);
  }
}

export function findItem<T extends TreeItem>(items: T[], itemId: string) {
  return items.find(({ id }) => id === itemId);
}

export function findItemDeep<T extends TreeItem>(items: T[], itemId: string): TreeItem | undefined {
  for (const item of items) {
    const { id, children } = item;
    if (id === itemId) {
      return item;
    }
    if (Array.isArray(children) && children.length) {
      const child = findItemDeep(children, itemId);
      if (child) {
        return child;
      }
    }
  }
  return undefined;
}

export function removeItem<T extends TreeItem>(items: T[], id: string): T[] {
  const newItems = [];
  for (const item of items) {
    if (item.id === id) {
      continue;
    }
    if(!Array.isArray(item.children)) item.children = [];
    else if (item.children.length) {
      item.children = removeItem(item.children, id);
    }
    newItems.push(item);
  }
  return newItems;
}

export function setProperty<T extends TreeItem>(
  items: T[],
  id: string,
  propertyName: keyof T,
  setter: (item:T) => any,
) {
  for (const item of items) {
    if (item.id === id) {
      item[propertyName] = setter(item);
    }
    if(!Array.isArray(item.children)){
        item.children = [];
    }
    else if (item.children.length) {
      item.children = setProperty(item.children, id, propertyName, setter);
    }
  }
  return [...items];
}


export function getChildCount<T extends TreeItem>(items: T[], id: string) {
  if (!id) {
    return 0;
  }
  const item = findItemDeep(items, id);
  return item ? countChildren(item.children) : 0;
}
