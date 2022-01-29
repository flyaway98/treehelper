(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.treeHelper = {}));
})(this, (function (exports) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  function flatten(items) {
    var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var visitPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    return items.reduce(function (acc, item, index) {
      var _item$children;

      var newItem = _objectSpread2(_objectSpread2({}, item), {}, {
        children: [],
        parentId: parentId,
        depth: depth,
        index: index,
        visitPath: "".concat(visitPath).concat(item.id, ",")
      });

      return [].concat(_toConsumableArray(acc), [newItem], _toConsumableArray(flatten((_item$children = item.children) !== null && _item$children !== void 0 ? _item$children : [], item.id, depth + 1, newItem.visitPath)));
    }, []);
  }

  function countChildren(items) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return items.reduce(function (acc, _ref) {
      var children = _ref.children;

      if (Array.isArray(children) && children.length) {
        return countChildren(children, acc + 1);
      }

      return acc + 1;
    }, count);
  }
  /**
   * @description: flatten the nested tree into a normal array
   */


  function flattenTree(items) {
    return flatten(items);
  }
  /**
   * 
   * @description: convert flattened array to nested tree array
   */

  function buildTree(flattenedItems) {
    var root = {
      id: 'root',
      name: '',
      children: []
    };

    var nodes = _defineProperty({}, root.id, root);

    var items = flattenedItems.map(function (item) {
      return _objectSpread2(_objectSpread2({}, item), {}, {
        children: []
      });
    });

    var _iterator = _createForOfIteratorHelper(items),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _item$parentId, _nodes$parentId;

        var _item = _step.value;
        var id = _item.id,
            name = _item.name,
            children = _item.children;
        var parentId = (_item$parentId = _item.parentId) !== null && _item$parentId !== void 0 ? _item$parentId : root.id;
        var parent = (_nodes$parentId = nodes[parentId]) !== null && _nodes$parentId !== void 0 ? _nodes$parentId : findItem(items, parentId);
        nodes[id] = {
          id: id,
          name: name,
          children: children
        };
        parent.children.push(_item);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return root.children;
  }
  /**
   * @description traversing the tree node and  execute the action function for each tree node
   */

  function visitTree(items, action) {
    var _iterator2 = _createForOfIteratorHelper(items),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _item2 = _step2.value;
        if (typeof action === 'function') action(_item2);
        if (Array.isArray(_item2.children) && _item2.children.length > 0) visitTree(_item2.children, action);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  /** 
   * @description shallow search
  */

  function findItem(items, itemId) {
    return items.find(function (_ref2) {
      var id = _ref2.id;
      return id === itemId;
    });
  }
  /** 
   * @description deep search
  */

  function findItemDeep(items, itemId) {
    var _iterator3 = _createForOfIteratorHelper(items),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _item3 = _step3.value;
        var id = _item3.id,
            children = _item3.children;

        if (id === itemId) {
          return _item3;
        }

        if (Array.isArray(children) && children.length) {
          var child = findItemDeep(children, itemId);

          if (child) {
            return child;
          }
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return undefined;
  }
  /** 
   * @description remove tree node then return newtree nodes which not contains param id
  */

  function removeItem(items, id) {
    var newItems = [];

    var _iterator4 = _createForOfIteratorHelper(items),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _item4 = _step4.value;

        if (_item4.id === id) {
          continue;
        }

        var newItem = _objectSpread2(_objectSpread2({}, _item4), {}, {
          children: []
        });

        newItems.push(newItem);

        if (Array.isArray(_item4.children) && _item4.children.length) {
          newItem.children = removeItem(_item4.children, id);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    return newItems;
  }
  /** 
   * @description  set tree node then return newtree nodes, and not change  original tree nodes
  */

  function setProperty(items, id, propertyName, setter) {
    var newItems = [];

    var _iterator5 = _createForOfIteratorHelper(items),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _item5 = _step5.value;

        if (_item5.id === id) {
          _item5[propertyName] = setter(_item5);
        }

        var newItem = _objectSpread2(_objectSpread2({}, _item5), {}, {
          children: []
        });

        newItems.push(newItem);

        if (Array.isArray(_item5.children) && _item5.children.length) {
          newItem.children = setProperty(_item5.children, id, propertyName, setter);
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    return newItems;
  }
  /** 
   * @description: count the number of all descendant nodes
  */

  function getChildCount(items, id) {
    if (!id) {
      return 0;
    }

    var item = findItemDeep(items, id);
    return item ? countChildren(item.children) : 0;
  }

  exports.buildTree = buildTree;
  exports.findItem = findItem;
  exports.findItemDeep = findItemDeep;
  exports.flattenTree = flattenTree;
  exports.getChildCount = getChildCount;
  exports.removeItem = removeItem;
  exports.setProperty = setProperty;
  exports.visitTree = visitTree;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
