import {
    FlattenedItem,
    TreeItem,
    flattenTree,
    buildTree,
    visitTree,
    findItem,
    findItemDeep,
    getChildCount,
    removeItem,
    setProperty
} from  './index';

const demoTreeData:TreeItem[] = [
    {
        id:'1',
        name:'test',
        children:[
            {
                id:'11',
                name:'test11',
                children:[]
            }
        ],
    }
]
const flattenData:FlattenedItem[] = [
    {
        id:'1',
        name:'test',
        parentId: null,
        depth:0,
        index:0,
        visitPath:'1,'
    },
    {
        id:'11',
        name:'test11',
        parentId: '1',
        depth:1,
        index:0,
        visitPath:'1,11,'
    }
]
describe("flattenTree test", ()=>{
    const fArray = flattenTree(demoTreeData);
	it('length is 2', ()=>{
		expect(fArray).toHaveLength(2);
    })
    it('root parentId is null',()=>{
		expect(fArray[0].parentId).toBeNull();
    })
    it('parentId properyty',()=>{
		expect(fArray[1]).toHaveProperty('parentId','1')
    })
    it('depth is 1',()=>{
		expect(fArray[1]).toHaveProperty('depth',1)
    })
    it('visitPath is 1,11,',()=>{
		expect(fArray[1]).toHaveProperty('visitPath','1,11,')
    })
})

describe("buildTree test", ()=>{
    const convertedTree = buildTree(flattenData);
	it('length is 1', ()=>{
		expect(convertedTree).toHaveLength(1);
    })
	it('children length is 1',()=>{
		expect(convertedTree[0].children).toHaveLength(1);
    })
    it('children[0] id is 11',()=>{
        expect(convertedTree[0].children[0].id).toBe('11');
    })
})

describe("visitTree test", ()=>{
    it('action called times 2',()=>{
        const action = jest.fn();
        visitTree(demoTreeData,action);
        expect(action).toHaveBeenCalledTimes(2);
    })
    it('name setted',()=>{
        const action = (item:TreeItem) => { item.name = `${item.name}-hello` };
        visitTree(demoTreeData,action);
        expect(demoTreeData[0].name).toContain('hello');
    })
})

describe("find test", ()=>{
    it('findItem is 1',()=>{
        expect(findItem(demoTreeData,'1')).toHaveProperty('id','1');
    })
    it('findItemDeep is 11',()=>{
        expect(findItemDeep(demoTreeData,'11')).toHaveProperty('id','11');
    })
})

describe("removeItem test", ()=>{
    const cloneTree = JSON.parse(JSON.stringify(demoTreeData)) as TreeItem[];
    cloneTree[0].children.push({
        id:'12',
        name:'test12',
        children:[]
    });
    const newTree = removeItem(cloneTree,'12');
    it('id 12 is removed',()=>{
        expect(newTree[0].children).toHaveLength(1);
    })
    it('item is deep clone',()=>{
        expect(cloneTree[0].children === newTree[0].children).toBe(false);
    })
})

describe("setProperty test", ()=>{
    const newTree = setProperty(demoTreeData,'11','name',(item:TreeItem)=> 'abc');
    it('id 11 set newname ',()=>{
        expect(newTree[0].children[0].name).toBe('abc');
    })
    it('item is deep clone',()=>{
        expect(newTree[0].children === demoTreeData[0].children).toBe(false);
    })
})

describe("getChildCount test", ()=>{
    const cloneTree = JSON.parse(JSON.stringify(demoTreeData)) as TreeItem[];
    cloneTree[0].children[0].children.push({
        id:'111',
        name:'test111',
        children:[]
    });
    it('id 1 count 2',()=>{
        expect(getChildCount(cloneTree,'1')).toBe(2);
    })
    it('id 11 count 1',()=>{
        expect(getChildCount(cloneTree,'11')).toBe(1);
    })
    it('id2 count 0',()=>{
        expect(getChildCount(cloneTree,'2')).toBe(0);
    })
})
