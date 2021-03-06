var depRelation = [{
      key: "index.js", 
      deps: ["a.js","b.js","style.css"],
      code: function(require, module, exports){
        "use strict";

var _a = _interopRequireDefault(require("./a.js"));

var _b = _interopRequireDefault(require("./b.js"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_a["default"].getB());
console.log(_b["default"].getA());
console.log(_b["default"].getC());
      }
    },{
      key: "a.js", 
      deps: ["b.js"],
      code: function(require, module, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _b = _interopRequireDefault(require("./b.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var a = {
  value: 'a',
  getB: function getB() {
    return _b["default"].value + ' from a.js';
  }
};
var _default = a;
exports["default"] = _default;
      }
    },{
      key: "b.js", 
      deps: ["a.js","233/c.js"],
      code: function(require, module, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _a = _interopRequireDefault(require("./a.js"));

var _c = _interopRequireDefault(require("./233/c.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var b = {
  value: 'b',
  getA: function getA() {
    return _a["default"].value + ' from b.js';
  },
  getC: function getC() {
    return _c["default"].value + ' from b.js';
  }
};
var _default = b;
exports["default"] = _default;
      }
    },{
      key: "233/c.js", 
      deps: [],
      code: function(require, module, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var c = {
  value: 'c - 233'
};
var _default = c;
exports["default"] = _default;
      }
    },{
      key: "style.css", 
      deps: [],
      code: function(require, module, exports){
        "use strict";

if (document) {
  var style = document.createElement('style');
  style.innerHTML = "\nconst str = \"body {\\r\\n  color: red;\\r\\n}\"\n\nexport default str\n";
  document.head.appendChild(style);
}
      }
    }];
var modules = {};
execute(depRelation[0].key)

  function execute(key) {
    if (modules[key]) { return modules[key] }
    var item = depRelation.find(i => i.key === key)
    if (!item) { throw new Error(`${item} is not found`) }
    var pathToKey = (path) => {
      var dirname = key.substring(0, key.lastIndexOf('/') + 1)
      var projectPath = (dirname + path).replace(/\.\//g, '').replace(/\/\//, '/')
      return projectPath
    }
    var require = (path) => {
      return execute(pathToKey(path))
    }
    modules[key] = { __esModule: true }
    var module = { exports: modules[key] }
    item.code(require, module, module.exports)
    return modules[key]
  }
  