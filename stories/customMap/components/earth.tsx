// @ts-ignore
import { Scene } from '@antv/l7';
import { PointLayer, EarthLayer } from '@antv/l7-layers';
import { Earth } from '@antv/l7-maps';
import * as React from 'react';

export default class ScaleComponent extends React.Component {
  private scene: Scene;

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    const scene = new Scene({
      id: 'map',
      map: new Earth({
        center: [120, 30],
        pitch: 0,
        zoom: 3,
      }),
    });

    var d = [
      { lng: 121.61865234375, lat: 25.29437116258816 },
      { lng: 121.058349609375, lat: 25.015928763367857 },
      { lng: 120.7177734375, lat: 24.587090339209634 },
      { lng: 120.28930664062499, lat: 23.936054914599815 },
      { lng: 120.12451171875, lat: 23.553916518321625 },
      { lng: 120.08056640625, lat: 23.120153621695614 },
      { lng: 120.234375, lat: 22.867317960075614 },
      { lng: 120.43212890625, lat: 22.52270570348246 },
      { lng: 120.65185546875, lat: 22.370396344320053 },
      { lng: 120.750732421875, lat: 21.922663209325922 },
      { lng: 120.948486328125, lat: 22.268764039073968 },
      { lng: 121.124267578125, lat: 22.806567100271522 },
      { lng: 121.56372070312499, lat: 23.915970370510227 },
      { lng: 121.88232421875, lat: 24.557116164309626 },
      { lng: 121.95922851562501, lat: 25.075648445630527 },
      { lng: 109.97314453125, lat: 20.076570104545173 },
      { lng: 108.896484375, lat: 19.663280219987662 },
      { lng: 108.61083984375, lat: 18.979025953255267 },
      { lng: 108.80859375, lat: 18.47960905583197 },
      { lng: 109.599609375, lat: 18.35452552912664 },
      { lng: 110.32470703125, lat: 18.771115062337024 },
      { lng: 111.005859375, lat: 19.78738018198621 },
      { lng: 110, lat: 30 },
      { lng: 127.657407, lat: 49.76027 },
      { lng: 129.397818, lat: 49.4406 },
      { lng: 130.582293, lat: 48.729687 },
      { lng: 130.987282, lat: 47.790132 },
      { lng: 132.506672, lat: 47.78897 },
      { lng: 133.373596, lat: 48.183442 },
      { lng: 135.026311, lat: 48.47823 },
      { lng: 134.500814, lat: 47.57844 },
      { lng: 134.112362, lat: 47.212467 },
      { lng: 133.769644, lat: 46.116927 },
      { lng: 133.097127, lat: 45.144066 },
      { lng: 131.883454, lat: 45.321162 },
      { lng: 131.025212, lat: 44.967953 },
      { lng: 131.288555, lat: 44.11152 },
      { lng: 131.144688, lat: 42.92999 },
      { lng: 130.633866, lat: 42.903015 },
      { lng: 130.640016, lat: 42.395009 },
      { lng: 129.994267, lat: 42.985387 },
      { lng: 129.596669, lat: 42.424982 },
      { lng: 128.052215, lat: 41.994285 },
      { lng: 128.208433, lat: 41.466772 },
      { lng: 127.343783, lat: 41.503152 },
      { lng: 126.869083, lat: 41.816569 },
      { lng: 126.182045, lat: 41.107336 },
      { lng: 125.079942, lat: 40.569824 },
      { lng: 124.265625, lat: 39.928493 },
      { lng: 122.86757, lat: 39.637788 },
      { lng: 122.131388, lat: 39.170452 },
      { lng: 121.054554, lat: 38.897471 },
      { lng: 121.585995, lat: 39.360854 },
      { lng: 121.376757, lat: 39.750261 },
      { lng: 122.168595, lat: 40.422443 },
      { lng: 121.640359, lat: 40.94639 },
      { lng: 120.768629, lat: 40.593388 },
      { lng: 119.639602, lat: 39.898056 },
      { lng: 119.023464, lat: 39.252333 },
      { lng: 118.042749, lat: 39.204274 },
      { lng: 117.532702, lat: 38.737636 },
      { lng: 118.059699, lat: 38.061476 },
      { lng: 118.87815, lat: 37.897325 },
      { lng: 118.911636, lat: 37.448464 },
      { lng: 119.702802, lat: 37.156389 },
      { lng: 120.823457, lat: 37.870428 },
      { lng: 121.711259, lat: 37.481123 },
      { lng: 122.357937, lat: 37.454484 },
      { lng: 122.519995, lat: 36.930614 },
      { lng: 121.104164, lat: 36.651329 },
      { lng: 120.637009, lat: 36.11144 },
      { lng: 119.664562, lat: 35.609791 },
      { lng: 119.151208, lat: 34.909859 },
      { lng: 120.227525, lat: 34.360332 },
      { lng: 120.620369, lat: 33.376723 },
      { lng: 121.229014, lat: 32.460319 },
      { lng: 121.908146, lat: 31.692174 },
      { lng: 121.891919, lat: 30.949352 },
      { lng: 121.264257, lat: 30.676267 },
      { lng: 121.503519, lat: 30.142915 },
      { lng: 122.092114, lat: 29.83252 },
      { lng: 121.938428, lat: 29.018022 },
      { lng: 121.684439, lat: 28.225513 },
      { lng: 121.125661, lat: 28.135673 },
      { lng: 120.395473, lat: 27.053207 },
      { lng: 119.585497, lat: 25.740781 },
      { lng: 118.656871, lat: 24.547391 },
      { lng: 117.281606, lat: 23.624501 },
      { lng: 115.890735, lat: 22.782873 },
      { lng: 114.763827, lat: 22.668074 },
      { lng: 114.152547, lat: 22.22376 },
      { lng: 113.80678, lat: 22.54834 },
      { lng: 113.241078, lat: 22.051367 },
      { lng: 111.843592, lat: 21.550494 },
      { lng: 110.785466, lat: 21.397144 },
      { lng: 110.444039, lat: 20.341033 },
      { lng: 109.889861, lat: 20.282457 },
      { lng: 109.627655, lat: 21.008227 },
      { lng: 109.864488, lat: 21.395051 },
      { lng: 108.522813, lat: 21.715212 },
      { lng: 108.05018, lat: 21.55238 },
      { lng: 107.04342, lat: 21.811899 },
      { lng: 106.567273, lat: 22.218205 },
      { lng: 106.725403, lat: 22.794268 },
      { lng: 105.811247, lat: 22.976892 },
      { lng: 105.329209, lat: 23.352063 },
      { lng: 104.476858, lat: 22.81915 },
      { lng: 103.504515, lat: 22.703757 },
      { lng: 102.706992, lat: 22.708795 },
      { lng: 102.170436, lat: 22.464753 },
      { lng: 101.652018, lat: 22.318199 },
      { lng: 101.80312, lat: 21.174367 },
      { lng: 101.270026, lat: 21.201652 },
      { lng: 101.180005, lat: 21.436573 },
      { lng: 101.150033, lat: 21.849984 },
      { lng: 100.416538, lat: 21.558839 },
      { lng: 99.983489, lat: 21.742937 },
      { lng: 99.240899, lat: 22.118314 },
      { lng: 99.531992, lat: 22.949039 },
      { lng: 98.898749, lat: 23.142722 },
      { lng: 98.660262, lat: 24.063286 },
      { lng: 97.60472, lat: 23.897405 },
      { lng: 97.724609, lat: 25.083637 },
      { lng: 98.671838, lat: 25.918703 },
      { lng: 98.712094, lat: 26.743536 },
      { lng: 98.68269, lat: 27.508812 },
      { lng: 98.246231, lat: 27.747221 },
      { lng: 97.911988, lat: 28.335945 },
      { lng: 97.327114, lat: 28.261583 },
      { lng: 96.248833, lat: 28.411031 },
      { lng: 96.586591, lat: 28.83098 },
      { lng: 96.117679, lat: 29.452802 },
      { lng: 95.404802, lat: 29.031717 },
      { lng: 94.56599, lat: 29.277438 },
      { lng: 93.413348, lat: 28.640629 },
      { lng: 92.503119, lat: 27.896876 },
      { lng: 91.696657, lat: 27.771742 },
      { lng: 91.258854, lat: 28.040614 },
      { lng: 90.730514, lat: 28.064954 },
      { lng: 90.015829, lat: 28.296439 },
      { lng: 89.47581, lat: 28.042759 },
      { lng: 88.814248, lat: 27.299316 },
      { lng: 88.730326, lat: 28.086865 },
      { lng: 88.120441, lat: 27.876542 },
      { lng: 86.954517, lat: 27.974262 },
      { lng: 85.82332, lat: 28.203576 },
      { lng: 85.011638, lat: 28.642774 },
      { lng: 84.23458, lat: 28.839894 },
      { lng: 83.898993, lat: 29.320226 },
      { lng: 83.337115, lat: 29.463732 },
      { lng: 82.327513, lat: 30.115268 },
      { lng: 81.525804, lat: 30.422717 },
      { lng: 81.111256, lat: 30.183481 },
      { lng: 79.721367, lat: 30.882715 },
      { lng: 78.738894, lat: 31.515906 },
      { lng: 78.458446, lat: 32.618164 },
      { lng: 79.176129, lat: 32.48378 },
      { lng: 79.208892, lat: 32.994395 },
      { lng: 78.811086, lat: 33.506198 },
      { lng: 78.912269, lat: 34.321936 },
      { lng: 77.837451, lat: 35.49401 },
      { lng: 76.192848, lat: 35.898403 },
      { lng: 75.896897, lat: 36.666806 },
      { lng: 75.158028, lat: 37.133031 },
      { lng: 74.980002, lat: 37.41999 },
      { lng: 74.829986, lat: 37.990007 },
      { lng: 74.864816, lat: 38.378846 },
      { lng: 74.257514, lat: 38.606507 },
      { lng: 73.928852, lat: 38.505815 },
      { lng: 73.675379, lat: 39.431237 },
      { lng: 73.960013, lat: 39.660008 },
      { lng: 73.822244, lat: 39.893973 },
      { lng: 74.776862, lat: 40.366425 },
      { lng: 75.467828, lat: 40.562072 },
      { lng: 76.526368, lat: 40.427946 },
      { lng: 76.904484, lat: 41.066486 },
      { lng: 78.187197, lat: 41.185316 },
      { lng: 78.543661, lat: 41.582243 },
      { lng: 80.11943, lat: 42.123941 },
      { lng: 80.25999, lat: 42.349999 },
      { lng: 80.18015, lat: 42.920068 },
      { lng: 80.866206, lat: 43.180362 },
      { lng: 79.966106, lat: 44.917517 },
      { lng: 81.947071, lat: 45.317027 },
      { lng: 82.458926, lat: 45.53965 },
      { lng: 83.180484, lat: 47.330031 },
      { lng: 85.16429, lat: 47.000956 },
      { lng: 85.720484, lat: 47.452969 },
      { lng: 85.768233, lat: 48.455751 },
      { lng: 86.598776, lat: 48.549182 },
      { lng: 87.35997, lat: 49.214981 },
      { lng: 87.751264, lat: 49.297198 },
      { lng: 88.013832, lat: 48.599463 },
      { lng: 88.854298, lat: 48.069082 },
      { lng: 90.280826, lat: 47.693549 },
      { lng: 90.970809, lat: 46.888146 },
      { lng: 90.585768, lat: 45.719716 },
      { lng: 90.94554, lat: 45.286073 },
      { lng: 92.133891, lat: 45.115076 },
      { lng: 93.480734, lat: 44.975472 },
      { lng: 94.688929, lat: 44.352332 },
      { lng: 95.306875, lat: 44.241331 },
      { lng: 95.762455, lat: 43.319449 },
      { lng: 96.349396, lat: 42.725635 },
      { lng: 97.451757, lat: 42.74889 },
      { lng: 99.515817, lat: 42.524691 },
      { lng: 100.845866, lat: 42.663804 },
      { lng: 101.83304, lat: 42.514873 },
      { lng: 103.312278, lat: 41.907468 },
      { lng: 104.522282, lat: 41.908347 },
      { lng: 104.964994, lat: 41.59741 },
      { lng: 106.129316, lat: 42.134328 },
      { lng: 107.744773, lat: 42.481516 },
      { lng: 109.243596, lat: 42.519446 },
      { lng: 110.412103, lat: 42.871234 },
      { lng: 111.129682, lat: 43.406834 },
      { lng: 111.829588, lat: 43.743118 },
      { lng: 111.667737, lat: 44.073176 },
      { lng: 111.348377, lat: 44.457442 },
      { lng: 111.873306, lat: 45.102079 },
      { lng: 112.436062, lat: 45.011646 },
      { lng: 113.463907, lat: 44.808893 },
      { lng: 114.460332, lat: 45.339817 },
      { lng: 115.985096, lat: 45.727235 },
      { lng: 116.717868, lat: 46.388202 },
      { lng: 117.421701, lat: 46.672733 },
      { lng: 118.874326, lat: 46.805412 },
      { lng: 119.66327, lat: 46.69268 },
      { lng: 119.772824, lat: 47.048059 },
      { lng: 118.866574, lat: 47.74706 },
      { lng: 118.064143, lat: 48.06673 },
      { lng: 117.295507, lat: 47.697709 },
      { lng: 116.308953, lat: 47.85341 },
      { lng: 115.742837, lat: 47.726545 },
      { lng: 115.485282, lat: 48.135383 },
      { lng: 116.191802, lat: 49.134598 },
      { lng: 116.678801, lat: 49.888531 },
      { lng: 117.879244, lat: 49.510983 },
      { lng: 119.288461, lat: 50.142883 },
      { lng: 119.279366, lat: 50.582908 },
      { lng: 120.18205, lat: 51.643566 },
      { lng: 120.738191, lat: 51.964115 },
      { lng: 120.725789, lat: 52.516226 },
      { lng: 120.177089, lat: 52.753886 },
      { lng: 121.003085, lat: 53.251401 },
      { lng: 122.245748, lat: 53.431726 },
      { lng: 123.571507, lat: 53.458804 },
      { lng: 125.068211, lat: 53.161045 },
      { lng: 125.946349, lat: 52.792799 },
      { lng: 126.564399, lat: 51.784255 },
      { lng: 126.939157, lat: 51.353894 },
      { lng: 127.287456, lat: 50.739797 },
      { lng: 127.657407, lat: 49.76027 },
    ];

    let pointlayer = new PointLayer()
      .source(
        d,
        // [
        //   {"lng":120,"lat":30}
        // ],
        //   [
        //     {"lng":10,"lat":0},
        //     {"lng":20,"lat":0},
        //     {"lng":30,"lat":0},
        //     {"lng":40,"lat":0},
        //     {"lng":50,"lat":0},
        //     {"lng":60,"lat":0},
        //     {"lng":70,"lat":0},
        //     {"lng":80,"lat":0},
        //     {"lng":90,"lat":0},

        //     {"lng":100,"lat":0},
        //     {"lng":110,"lat":0},
        //     {"lng":120,"lat":0},
        //     {"lng":130,"lat":0},
        //     {"lng":140,"lat":0},
        //     {"lng":150,"lat":0},
        //     {"lng":160,"lat":0},
        //     {"lng":170,"lat":0},
        //     {"lng":180,"lat":0},

        //     {"lng":190,"lat":0},
        //     {"lng":200,"lat":0},
        //     {"lng":210,"lat":0},
        //     {"lng":220,"lat":0},
        //     {"lng":230,"lat":0},
        //     {"lng":240,"lat":0},
        //     {"lng":250,"lat":0},
        //     {"lng":260,"lat":0},
        //     {"lng":270,"lat":0},

        //     {"lng":280,"lat":0},
        //     {"lng":290,"lat":0},
        //     {"lng":300,"lat":0},
        //     {"lng":310,"lat":0},
        //     {"lng":320,"lat":0},
        //     {"lng":330,"lat":0},
        //     {"lng":340,"lat":0},
        //     {"lng":350,"lat":0},
        //     {"lng":360,"lat":0},

        //     {"lng":0,"lat":0},

        //     {"lng":0,"lat":10},
        //     {"lng":0,"lat":20},
        //     {"lng":0,"lat":30},
        //     {"lng":0,"lat":40},
        //     {"lng":0,"lat":50},
        //     {"lng":0,"lat":60},
        //     {"lng":0,"lat":70},
        //     {"lng":0,"lat":80},
        //     {"lng":0,"lat":90},

        //     {"lng":0,"lat":100},
        //     {"lng":0,"lat":110},
        //     {"lng":0,"lat":120},
        //     {"lng":0,"lat":130},
        //     {"lng":0,"lat":140},
        //     {"lng":0,"lat":150},
        //     {"lng":0,"lat":160},
        //     {"lng":0,"lat":170},
        //     {"lng":0,"lat":180},

        //     {"lng":0,"lat":190},
        //     {"lng":0,"lat":200},
        //     {"lng":0,"lat":210},
        //     {"lng":0,"lat":220},
        //     {"lng":0,"lat":230},
        //     {"lng":0,"lat":240},
        //     {"lng":0,"lat":250},
        //     {"lng":0,"lat":260},
        //     {"lng":0,"lat":270},

        //     {"lng":0,"lat":-10},
        //     {"lng":0,"lat":-20},
        //     {"lng":0,"lat":-30},
        //     {"lng":0,"lat":-40},
        //     {"lng":0,"lat":-50},
        //     {"lng":0,"lat":-60},
        //     {"lng":0,"lat":-70},
        //     {"lng":0,"lat":-80},
        //     {"lng":0,"lat":-90},
        // ],
        {
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
        },
      )
      .shape('circle')
      // .shape('cylinder')
      .color('#f00')
      // .size('', () => [1, 1, 10])
      .size(20)
      .style({
        // opacity: 0.6,
      })
      // .animate(true)
      .active(true);

    const earthlayer = new EarthLayer()
      .source(
        'https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*3-3NSpqRqUoAAAAAAAAAAAAAARQnAQ',
        {
          parser: {
            type: 'image',
          },
        },
      )
      .shape('base')
      .style({
        globelOtions: {
          ambientRatio: 0.6, // 环境光
          diffuseRatio: 0.4, // 漫反射
          specularRatio: 0.1, // 高光反射
          // earthTime: 4.0
          earthTime: 0.1,
        },
      })
      .animate(true);
    // earthlayer.setEarthTime(4.0)

    const atomLayer = new EarthLayer()
      .color('#2E8AE6')
      .shape('atomSphere')
      .style({
        opacity: 1,
      });

    const bloomLayer = new EarthLayer().color('#fff').shape('bloomSphere');

    scene.on('loaded', () => {
      scene.addLayer(earthlayer);
      scene.addLayer(pointlayer);

      scene.addLayer(atomLayer);
      scene.addLayer(bloomLayer);

      earthlayer.setEarthTime(4.0);
    });
  }

  public render() {
    return (
      <div
        id="map"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    );
  }
}