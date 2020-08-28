"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("../../../component/button/index"));

var _antd = require("antd");

var _form = _interopRequireDefault(require("../../../component/form/form"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Index = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Index, _Component);

  var _super = _createSuper(Index);

  (0, _createClass2["default"])(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var menuList = this.state.menuList;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "home_page"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "MB_15"
      }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
        onClick: this.addMenu
      }, "\u6DFB\u52A0")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "table_div"
      }, /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", {
        width: "40px"
      }, "ID"), /*#__PURE__*/_react["default"].createElement("th", null, "\u540D\u79F0"), /*#__PURE__*/_react["default"].createElement("th", null, "\u5730\u5740"), /*#__PURE__*/_react["default"].createElement("th", null, "\u9605\u8BFB\u6B21\u6570"), /*#__PURE__*/_react["default"].createElement("th", null, "\u64CD\u4F5C"))), /*#__PURE__*/_react["default"].createElement("tbody", null, menuList.map(function (item, index) {
        return /*#__PURE__*/_react["default"].createElement("tr", {
          key: item.id
        }, /*#__PURE__*/_react["default"].createElement("td", null, item.id), /*#__PURE__*/_react["default"].createElement("td", null, item.name), /*#__PURE__*/_react["default"].createElement("td", null, item.linkUrl), /*#__PURE__*/_react["default"].createElement("td", null, item.read_num), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("span", {
          className: "opration_btn",
          onClick: _this2.editMenu.bind(_this2, item)
        }, "\u7F16\u8F91"), "\xA0\xA0", /*#__PURE__*/_react["default"].createElement("span", {
          className: "opration_btn",
          onClick: _this2.deleteMenu.bind(_this2, item)
        }, "\u5220\u9664")));
      })))), /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: this.state.dialogTitle,
        visible: this.state.visible,
        onOk: this.handleOk,
        onCancel: this.handleCancel,
        width: "auto",
        wrapClassName: "form_ant_modal"
      }, /*#__PURE__*/_react["default"].createElement(_form["default"], {
        ref: function ref(el) {
          _this2.inputForm = el;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "form_table_group"
      }, this.state.currentMenu.id ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "from_label_group"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "label"
      }, "id\uFF1A"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "input_wrap"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        name: "id",
        value: this.state.currentMenu.id,
        disabled: true
      }))) : "", /*#__PURE__*/_react["default"].createElement("div", {
        className: "from_label_group"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "label"
      }, "\u540D\u79F0\uFF1A"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "input_wrap"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        name: "name",
        value: this.state.currentMenu.name,
        onChange: function onChange(e) {
          _this2.changeInputValue("name", e);
        }
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "from_label_group"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "label"
      }, "\u8FDE\u63A5\u5730\u5740\uFF1A"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "input_wrap"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        name: "linkUrl",
        value: this.state.currentMenu.linkUrl,
        onChange: function onChange(e) {
          _this2.changeInputValue("linkUrl", e);
        }
      })))))));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].post('http://127.0.0.1:8080/api/manage/getManageMenu', {
                  type: "recommend"
                }, {
                  headers: {
                    'content-type': 'text/plain; charset=UTF-8',
                    "cookie": req.headers.cookie || ""
                  }
                });

              case 2:
                result = _context.sent;
                return _context.abrupt("return", {
                  menuList: result.data.data
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  function Index(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Index);
    _this = _super.call(this, props);

    _this.changeInputValue = function (key, e) {
      var currentMenu = _this.state.currentMenu;
      currentMenu[key] = e.target.value;

      _this.setState({
        currentMenu: currentMenu
      });
    };

    _this.getMenu = function () {
      _axios["default"].post('/api/manage/getManageMenu', {
        type: "recommend"
      }, {
        headers: {
          'content-type': 'text/plain; charset=UTF-8'
        }
      }).then(function (result) {
        _this.setState({
          menuList: result.data.data
        });
      });
    };

    _this.addMenu = function () {
      _this.setState({
        visible: true,
        dialogTitle: "添加菜单",
        currentMenu: {}
      });
    };

    _this.handleOk = function () {
      if (_this.inputForm.value.id) {
        _axios["default"].post('/api/manage/editManageMenu', _objectSpread({
          type: "recommend"
        }, _this.inputForm.value), {
          headers: {
            'content-type': 'text/plain; charset=UTF-8'
          }
        }).then(function (result) {
          _this.setState({
            visible: false
          }, function () {
            _this.getMenu();
          });

          _antd.notification.success({
            message: result.data.message
          });
        });

        return;
      }

      _axios["default"].post('/api/manage/addManageMenu', _objectSpread({
        type: "recommend"
      }, _this.inputForm.value), {
        headers: {
          'content-type': 'text/plain; charset=UTF-8'
        }
      }).then(function (result) {
        _this.setState({
          visible: false
        }, function () {
          _this.getMenu();
        });

        _antd.notification.success({
          message: result.data.message
        });
      });
    };

    _this.editMenu = function (item) {
      _this.setState({
        visible: true,
        dialogTitle: "编辑菜单",
        currentMenu: item
      });
    };

    _this.deleteMenu = function (item) {
      _antd.Modal.confirm({
        title: "确认删除？",
        onOk: function onOk() {
          _axios["default"].post('/api/manage/deleteManageMenu', {
            id: item.id,
            type: "recommend"
          }, {
            headers: {
              'content-type': 'text/plain; charset=UTF-8'
            }
          }).then(function (result) {
            _antd.notification.success({
              message: result.data.message
            });

            _this.getMenu();
          });
        }
      });
    };

    _this.handleCancel = function () {
      _this.setState({
        visible: false
      });
    };

    _this.state = {
      menuList: props.PAGE_DATA.menuList || [],
      visible: false,
      dialogTitle: "添加菜单",
      currentMenu: {}
    };
    return _this;
  }

  (0, _createClass2["default"])(Index, [{
    key: "componenthidMount",
    value: function componenthidMount() {}
  }]);
  return Index;
}(_react.Component);

exports["default"] = Index;