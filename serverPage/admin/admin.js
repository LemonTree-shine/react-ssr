"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRouter = require("react-router");

var _axios = _interopRequireDefault(require("axios"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Admin = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Admin, _Component);

  var _super = _createSuper(Admin);

  (0, _createClass2["default"])(Admin, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          expend = _this$state.expend,
          menuList = _this$state.menuList,
          currentPath = _this$state.currentPath;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "admin_page_common_layout"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: expend ? "left_wrap_content" : "left_wrap_content unexpend"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "menu_list menu_btn",
        onClick: this.expendMenu
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "iconfont"
      }, "\uE8CC")), menuList.map(function (item, index) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: currentPath === item.linkUrl ? "menu_list active" : "menu_list",
          key: item.id // onClick={()=>{
          //     window.location.href = item.linkUrl;
          // }}

        }, /*#__PURE__*/_react["default"].createElement("a", {
          href: item.linkUrl
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "iconfont",
          dangerouslySetInnerHTML: {
            __html: item.icon
          }
        }), /*#__PURE__*/_react["default"].createElement("div", {
          className: "name"
        }, item.name)));
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "header_wrap_content"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "login_name"
      }, "admin")));
    }
  }], [{
    key: "getAdminProps",
    value: function () {
      var _getAdminProps = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].post('http://127.0.0.1:8080/api/manage/getManageMenu', {
                  admin: 1
                }, {
                  headers: {
                    'content-type': 'text/plain; charset=UTF-8'
                  }
                });

              case 2:
                result = _context.sent;
                return _context.abrupt("return", {
                  adminMenuList: result.data.data,
                  pathname: req.url.split("?")[0]
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAdminProps(_x) {
        return _getAdminProps.apply(this, arguments);
      }

      return getAdminProps;
    }()
  }]);

  function Admin(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Admin);
    _this = _super.call(this, props);

    _this.expendMenu = function () {
      var expend = _this.state.expend;

      _this.setState({
        expend: !expend
      }, function () {
        var contentLayout = document.querySelector(".manage_page_common_content");

        if (_this.state.expend) {
          contentLayout.className = "manage_page_common_content";
        } else {
          contentLayout.className = "manage_page_common_content unexpend";
        }
      });
    };

    _this.state = {
      expend: true,
      menuList: props.PAGE_DATA.adminMenuList,
      currentPath: props.PAGE_DATA.pathname
    };
    return _this;
  }

  (0, _createClass2["default"])(Admin, [{
    key: "componentDidMount",
    value: function componentDidMount() {// this.setState({
      //     currentPath:this.props.location.pathname
      // });
    } // async getManageMenu(){
    //     var result = await axios.post('/api/manage/getManageMenu',{
    //         admin:1
    //     },{
    //         headers:{
    //             'content-type': 'text/plain; charset=UTF-8'
    //         }
    //     });
    //     this.setState({
    //         menuList:result.data.data,
    //         currentPath:this.props.location.pathname
    //     });
    // }

  }]);
  return Admin;
}(_react.Component);

exports["default"] = Admin;