
### source

设置图层数据以及解析配置 `source(data, config)`。

- data { geojson | json | csv }
- config   可选   数据源配置项
  - parser 数据解析，默认是解析层 geojson
  - transforms [transform，transform ]  数据处理转换可设置多个

`parser` 和  `transforms` [见 source 文档](/api/source/source)。

```javascript
layer.source(data, {
  parser: {
    type: 'csv',
    x: 'lng',
    y: 'lat',
  },
  transforms: [
    {
      type: 'map',
      callback: function(item) {
        const [x, y] = item.coordinates;
        item.lat = item.lat * 1;
        item.lng = item.lng * 1;
        item.v = item.v * 1;
        item.coordinates = [x * 1, y * 1];
        return item;
      },
    },
    {
      type: 'hexagon',
      size: 6000,
      field: 'v',
      method: 'sum',
    },
  ],
});
```

### scale(field: string, scaleConfig: IScaleConfig)

- `field` 指定 source 中传入的数据中用于映射的字段名
- `scaleConfig` 列定义配置，对象类型

```javascript
interface IScaleConfig {
  type: ScaleTypeName;
  domain?: any[];
  ...
}

layer.color('id', ['#f00', '#ff0'])
.size('mag', [1, 80])
.scale('mag', {
  type: 'linear',
  domain: [ 1, 50]
})；
```

### ScaleTypeName

`scale` 的类型可以分为 `3` 类 `11` 种，不同 `Scale` 的差异在于 `domain->range` 的转换方法的不同。    
`range` 和 `domain` 是 `Scale` 中非常重要的两个参数。

- domain: 地图数据值的定义区间
- range：视觉值的区间定义

|  数据类型   | 度量类型  |
|  --------  | ------- |
| 连续        | linear、log、pow、time、sequential、quantize、quantile、threshold |
| 分类        | cat、time |
| 常量        | identity  |


#### Cat

Cat 指枚举类型，用于展示分类数据，比如农作物种植区分布图，水稻、玉米、大豆等不同类别需要映射为不同的颜色。

```js
// 三种作物会分别转成对应的颜色
// domain = ['corn','rice', 'soybean'];
// range = ['red','white','blue'];
const data = [
  { lng: 120, lat: 30, t: 'corn' },
  { lng: 121, lat: 30, t: 'rice' },
  { lng: 122, lat: 30, t: 'soybean' },
];
layer.source(data, {
  parser: {
    type: 'type',
    x: 'lng',
    y: 'lat'
  }
});
layer.scale('t', { type: 'cat' });
layer.color('t', ['red', 'white', 'blue']);

```


#### identify

常量度量 某个字段是不变的常量。

#### linear

线性是连续数据的映射方法，数据和视觉值是通过线性方法换算的。如数据值 1-100 线性映射到红到蓝的线下渐变色每个数字对应一个颜色

#### quantize 

相等间隔会将属性值的范围划分为若干个大小相等的子范围。相等间隔最适用于常见的数据范围，如百分比和温度。这种方法强调的是某个属性值相对于其他值的量

#### quantile

每个类都含有相等数量的要素。分位数分类非常适用于呈线性分布的数据。分位数为每个类分配数量相等的数据值。不存在空类，也不存在值过多或过少的类。
由于使用“分位数”分类将要素以同等数量分组到每个类中，因此得到的地图往往具有误导性。可能会将相似的要素置于相邻的类中，或将值差异较大的要素置于相同类中。可通过增加类的数量将这种失真降至最低。

#### threshold 

他允许将域的任意子集（非统一段）映射到范围内的离散值。输入域仍然是连续的，并根据提供给域属性的一组阈值划分为多个切片。 range 属性必须有 N+1 个元素，其中 N 是域中提供的阈值边界数

手动设置间隔 Manual interval 手动设置分级分类区间，某些数据会有相应的业界标准，或者需要进行某种特殊的显示。如空气质量数据有严格数据分段标准

```
-1   => "red"
0    => "white"
0.5  => "white"
1.0  => "blue"
1000 => "blue

```
#### diverging || Sequential
用于返回给定的颜色数组的统一非有理 B-spline 插值器函数，该数组将转换为RGB颜色。

```js
const scaleColors = d3interpolate.interpolateRgbBasis(colors);
```

#### IScaleConfig

```js
interface IScaleConfig {
  type: ScaleTypeName;
  domain?: any[];
  range?: any[];
  neutral?: number;
  field?: string;
  unknown?: string;
  ticks?: any[];
  nice?: boolean;
  clamp?: boolean;
  format?: () => any;
}
```

### cluster

我们在使用 `cluster` 配置聚合图之后就可以使用一些聚合方法来获取对应参数。
#### getClusters(zoom: number): IFeatureCollection

获取指定缩放等级的聚合数据

- `zoom` 缩放等级

#### getClustersLeaves(id: string): IFeatureCollection

根据 `id` 获取聚合节点的数据，每个聚合节点会有一个唯一 `ID`。

- `id` 聚合节点的 `id`

```javascript
const source = layer.getSource();
source.getClustersLeaves(id);
layer.on('click', (e) => {
  console.log(source.getClustersLeaves(e.feature.cluster_id));
});
```
## 视觉编码方法

可视化编码是将数据转换为可视形式的过程，L7 目前支持形状，大小，颜色 3 种视觉通道，你可以指定数据字段，为不同要素设置不同的图形属性。

<img width="100%" style="display: block;margin: 0 auto;" alt="案例" src='https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*PzoTRJnY-fIAAAAAAAAAAAAAARQnAQ'>

### size

将数据值映射到图形的大小上的方法，size 方法具体的参数使用可以查看对应图层的详细文档

```javascript
pointLayer.size(10); // 常量
pointLayer.size('type'); // 使用字段映射到大小
pointLayer.size('type', [0, 10]); // 使用字段映射到大小，并指定最大值和最小值
pointLayer.size('type', (type) => {
  // 回调函数
  if (type === 'a') {
    return 10;
  }
  return 5;
});
```

#### size(value）

传入数字常量，如  `pointLayer.size(20)`

#### size(field)

根据 field 字段的值映射大小，使用默认的`最大值 max:10`  和`最小值 min: 1`。

#### size(field, callback)

使用回调函数控制图形大小。

- `callback`: function 回调函数。

```javascript
pointLayer.size('age', (value) => {
  if (value === 1) {
    return 5;
  }
  return 10;
});
```

### color

将数据值映射到图形的颜色上的方法。

```javascript
layer.color('red'); // 常量颜色
layer.color('type'); // 对 type 字段进行映射，使用内置的颜色
layer.color('type', ['red', 'blue']); // 指定颜色
layer.color('type', (type) => {
  // 通过回调函数
  if (type === 'a') {
    return 'red';
  }
  return 'blue';
});
layer.color('type*value', (type, value) => {
  //多个参数，通过回调函数
  if (type === 'a' && value > 100) {
    return 'red';
  }
  return 'blue';
});
```

#### color(value)

参数：`value` ：string
只支持接收一个参数，value 可以是：

- 映射至颜色属性的数据源字段名，如果数据源中不存在这个字段名的话，则按照常量进行解析，这个时候会使用 L7 默认提供的颜色。

- 也可以直接指定某一个具体的颜色值 color，如 '#fff', 'white','rgba(255,0,0,0.5)' ,rgb(255,0,1) 等。

示例

```javascript
layer.color('name'); // 映射数据字段
layer.color('white'); // 指定颜色
```

#### color(field, colors)

参数：

- `field`: stringfield 为映射至颜色属性的数据源字段名，也支持指定多个参数。

- `colors`: string | array | function

colors 的参数有以下情况：  如果为空，即未指定颜色的数组，那么使用内置的全局的颜色；如果需要指定颜色，则需要以数组格式传入，那么分类的颜色按照数组中的颜色确定。

```javascript
layer.color('name'); // 使用默认的颜色
layer.color('name', ['red', 'blue']); // 使用传入的指定颜色
```

- colors 如果是回调函数，则该回调函数的参数为对应字段的数值，具体使用如下，当 color 映射为多个字段时，参数按照字段声明的顺序传入：

```javascript
layer.color('gender', (value) => {
  if (value === 1) {
    return 'red';
  }
  return 'blue';
});
layer.color('gender*age', (gender, age) => {
  if (age === 20 && gender == ' 男') {
    return 'red';
  }
  return 'blue';
});
```

### shape

通常一种图层可以有多种表现形式，shape 方法用于指定图层具体的表现形式，以 PointLayer 的 shape 为例：

```javascript
shape('circle'); // 圆形
shape('triangle'); // 三角形
shape('cylinder'); // 圆柱
```

<img width="60%" style="display: block;margin: 0 auto;" alt="案例" src='https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*iN0nTYRDd3AAAAAAAAAAAABkARQnAQ'>

**shape(shape)**

参数 `shape` string

- 只支持接收一个参数，指定几何图像对象绘制的形状。下表列出了不同的 图层 几何图形对象支持的 shape 形状

| layer 类型 | shape 类型                                                                             | 备注 |
| ---------- | -------------------------------------------------------------------------------------- | ---- |
| point      | 2d:point,circle, square, triangle,hexagon,image,text 3d:circle,triangle,hexagon,square |      |
| line       | line,arc, arc3d, greatcircle                                                           |      |
| polygon    | fill,line, extrude                                                                     |      |

**shape(field, shapes)**

- shape 根据字段指定行形状，比如根据字段指定 PointLayer/imageLayer 的 icon 类型

```javascript
scene.addImage(
  '00',
  'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
);
scene.addImage(
  '01',
  'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg',
);
scene.addImage(
  '02',
  'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg',
);
const imageLayer = new PointLayer()
  .source(data, {
    parser: {
      type: 'json',
      x: 'longitude',
      y: 'latitude',
    },
  })
  .shape('name', ['00', '01', '02'])
  .size(20);
scene.addLayer(imageLayer);
```

<img width="60%" style="display: block;margin: 0 auto;" alt="案例" src='https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*oVyHT5S3sv0AAAAAAAAAAABkARQnAQ'>

[在线案例](/examples/point/image#image)

**shape(field, callback)**

- shape 也支持回调函数的写法

```javascript
.shape('key', value => {
  if(value > 10) {
    return 'circle';
  } else {
    return 'triangle';
  }
}
```