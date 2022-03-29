import Vue from "vue";
import {
  Input,
  Form,
  FormItem,
  Button,
  Upload,
  Message,
  MessageBox,
  DatePicker,
  Table,
  TableColumn,
  Checkbox,
  CheckboxGroup,
  Icon,
  Dialog,
  Radio,
  RadioGroup,
  Badge,
  Popover,
  Carousel,
  CarouselItem,
  Divider,
  Pagination,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Tabs,
  TabPane,
  Loading,
  Progress,
  Tooltip,
  Footer,
  Cascader,
  Switch,
} from "element-ui";

//由于Message组件并没有install 方法供Vue来操作的，是直接返回的，因此按照官方文档单独引入的方法是
//会报错的，需要给 Message 添加 install 方法
Message.install = function(Vue, options) {
  Vue.prototype.$message = Message;
};

MessageBox.install = function(Vue, options) {
  Vue.prototype.$confirm = MessageBox;
};

Vue
  //输入框
  .use(Input)
  //表单
  .use(Form)
  .use(FormItem)
  //按钮
  .use(Button)
  //上传
  .use(Upload)
  //提示框
  .use(Message)
  .use(MessageBox)
  //日期选择
  .use(DatePicker)
  //表格
  .use(Table)
  .use(TableColumn)
  //多选框
  .use(Checkbox)
  .use(CheckboxGroup)
  //图标
  .use(Icon)
  //对话框
  .use(Dialog)
  //单选框
  .use(Radio)
  .use(RadioGroup)
  //标记
  .use(Badge)
  //弹出框
  .use(Popover)
  //轮播图
  .use(Carousel)
  .use(CarouselItem)
  //分割线
  .use(Divider)
  //分页
  .use(Pagination)
  //下拉菜单
  .use(Dropdown)
  .use(DropdownItem)
  .use(DropdownMenu)
  //标签选项卡
  .use(Tabs)
  .use(TabPane)
  //loading
  .use(Loading)
  //进度条
  .use(Progress)
  //文字提示
  .use(Tooltip)
  //页尾
  .use(Footer)
  // 级联选择器
  .use(Cascader)
  // 开关
  .use(Switch);
