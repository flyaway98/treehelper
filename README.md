# tree-util

some useful tree functions

## 1. data structure

Each tree node must have three fields: id,name and children。eg:

```javascript
[
  {
    id: '1',
    name: 'menuA',
    children: [
      { id: '21', name: 'menuA-1', menuCode: '21', children: [] },
      { id: '22', name: 'menuA-2', menuCode: '22', children: [] },
    ]
  },
  {
    id: '2',
    name: 'menuB',
    children: []
  }
]

```
## 2.install

method1:

```javascript
npm i @3mcode/tree-helper -S

```

method2:

```javascript
<script src='dist/index-browser.js'></script>
<script>
 treeHelper.methodXXX(); 
</script>

```

Note: if you want to use it in IE browser, the version should be > = 9

## 3. methods



### function flattenTree(items);

```
@description: flatten the nested tree into a normal array
@param:
[{id:'1',name:'1',children:[{id:'1-1',name:'1-1',children:[]}]}]
@returns:
[{id:'1',name:'1',parentId:null,depth:0,index:0,visitPath:'1,'},{id:'1-1',name:'1-1',parentId:'1',depth:1,index:0,visitPath:'1,1-1,'}]

```

### function buildTree(flattenedItems);
```
@description: convert flattened array to nested tree array
@param:[{id:'1',name:'1',parentId:null,depth:0,index:0,visitPath:'1,'},{id:'1-1',name:'1-1',parentId:'1',depth:1,index:0,visitPath:'1,1-1,'}]
@returns [{id:'1',name:'1',children:[{id:'1-1',name:'1-1',children:[]}]}]

```

### function visitTree(items, action);
```
@description: traversing the tree node
@param: 
items: tree nodes
action: This function is called when traversing the tree node, and the tree node can be operated in the function

```

### function findItem(items, itemId);
```
@description: shallow search
@params:
  items:tree nodes,
  itemId:node id to search
@returns: treeNode or undefined

```

### function findItemDeep(items, itemId);
```
@description: deep search
@params:
  items:tree nodes,
  itemId:node id to search
@returns: treeNode or undefined
```

### function removeItem(items, id);

```
@description: remove treeNode
@params:
  items:tree nodes,
  id:node id to remove
@returns: use deep copy to return new treeNodes
```

### function setProperty(items, id, propertyName, setter);
```
@description: set tree node
@params:
  items:tree nodes,
  id:node id to search,
  propertyName: property name
  setter: (treeNode) => newValue
@returns: use deep copy to return new treeNodes
```
### function getChildCount(items, id);

```
@description: set tree node
@params:
  items:tree nodes,
  id:node id to search,
@returns: number of all descendant nodes
```

