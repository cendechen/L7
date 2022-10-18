import { LineLayer, Scene } from '@antv/l7';
import { GaodeMapV2 } from '@antv/l7-maps';
import React, { useEffect } from 'react';

export default () => {
  useEffect(() => {
    const scene = new Scene({
      id: 'map',
      map: new GaodeMapV2({
        center: [115, 30.258134],
        pitch: 40,
        zoom: 6,
      }),
    });
    const geoData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            testOpacity: 0.8,
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [113.8623046875, 30.031055426540206],
                [116.3232421875, 30.031055426540206],
                [117, 30],
                [117, 31],
                [116, 30.5],
              ],
            ],
          },
        },
      ],
    };
    scene.addImage(
      '02',
      'https://gw.alipayobjects.com/zos/bmw-prod/ce83fc30-701f-415b-9750-4b146f4b3dd6.svg',
    );

    scene.on('loaded', () => {
      const layer = new LineLayer({})
        .source(geoData)
        //  .size(20000)
        .size(20)
        .shape('wall')
        .texture('02')
        .color('#25d8b7')
        .animate({
          interval: 1, // 间隔
          duration: 1, // 持续时间，延时
          trailLength: 2, // 流线长度
        })
        .style({
          opacity: 'testOpacity',
          lineTexture: true, // 开启线的贴图功能
          //  iconStep: 40000, // 设置贴图纹理的间距
          iconStep: 40, // 设置贴图纹理的间距
          iconStepCount: 4,
          //  heightfixed: true,
          //  textureBlend: 'replace',
          //  textureBlend: 'normal',
          sourceColor: '#f00',
          targetColor: 'rgba(0, 255, 0, 0.2)',
        })
        .active(true);

      scene.addLayer(layer);
    });
  }, []);
  return (
    <div
      id="map"
      style={{
        height: '500px',
        position: 'relative',
      }}
    />
  );
};
