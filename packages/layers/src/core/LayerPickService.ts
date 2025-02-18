import {
  IInteractionTarget,
  ILayer,
  ILayerPickService,
  IMapService,
  IPickingService,
  TYPES,
} from '@antv/l7-core';
import { lngLatInExtent } from '@antv/l7-utils';
export default class BaseLayerPickService implements ILayerPickService {
  private layer: ILayer;
  constructor(layer: ILayer) {
    this.layer = layer;
  }
  public pickRender(target: IInteractionTarget): void {
    const layer = this.layer;

    // 瓦片图层的拾取绘制
    if (layer.tileLayer) {
      return layer.tileLayer.pickRender(target);
    }

    layer.hooks.beforePickingEncode.call();

    if (layer.masks.length > 0) {
      // 若存在 mask，则在 pick 阶段的绘制也启用
      layer.masks
        .filter((mask) => mask.inited)
        .forEach(async (m: ILayer) => {
          m.render();
        });
    }
    layer.renderModels(true);
    layer.hooks.afterPickingEncode.call();
  }

  public pick(layer: ILayer, target: IInteractionTarget) {
    const container = this.layer.getContainer();
    const pickingService = container.get<IPickingService>(
      TYPES.IPickingService,
    );
    if (layer.type === 'RasterLayer') {
      return this.pickRasterLayer(layer, target);
    }

    this.pickRender(target);

    return pickingService.pickFromPickingFBO(layer, target);
  }

  public pickRasterLayer(
    layer: ILayer,
    target: IInteractionTarget,
    parent?: ILayer,
  ) {
    const container = this.layer.getContainer();
    const pickingService = container.get<IPickingService>(
      TYPES.IPickingService,
    );
    const mapService = container.get<IMapService>(TYPES.IMapService);
    const extent = this.layer.getSource().extent;
    const isPick = lngLatInExtent(target.lngLat, extent);
    const layerTarget = {
      x: target.x,
      y: target.y,
      type: target.type,
      lngLat: target.lngLat,
      target,
      rasterValue: null,
    };
    const adviceTarget = parent ? parent : layer;
    if (isPick) {
      const rasterValue = this.readRasterValue(
        layer,
        extent,
        mapService,
        target.x,
        target.y,
      );
      layerTarget.rasterValue = rasterValue;
      pickingService.triggerHoverOnLayer(adviceTarget, layerTarget);
      return true;
    } else {
      layerTarget.type =
        target.type === 'mousemove' ? 'mouseout' : 'un' + target.type;
      pickingService.triggerHoverOnLayer(adviceTarget, {
        ...layerTarget,
        type: 'unpick',
      });
      pickingService.triggerHoverOnLayer(adviceTarget, layerTarget);
      return false;
    }
  }

  public readRasterValue(
    layer: ILayer,
    bbox: number[],
    mapService: IMapService,
    x: number,
    y: number,
  ) {
    const rasterData = layer.getSource().data.dataArray[0];
    const [minLng = 0, minLat = 0, maxLng = 10, maxLat = -10] = bbox;

    const tileXY = mapService.lngLatToContainer([minLng, minLat]);
    const tileMaxXY = mapService.lngLatToContainer([maxLng, maxLat]);

    const tilePixelWidth = tileMaxXY.x - tileXY.x;
    const tilePixelHeight = tileXY.y - tileMaxXY.y;
    const pos = [
      (x - tileXY.x) / tilePixelWidth, // x
      (y - tileMaxXY.y) / tilePixelHeight, // y
    ];

    const tileWidth = rasterData.width || 1;
    const tileHeight = rasterData.height || 1;

    const indexX = Math.floor(pos[0] * tileWidth);
    const indexY = Math.floor(pos[1] * tileHeight);
    const index = Math.max(0, indexY - 1) * tileWidth + indexX;

    const data = rasterData.data[index];
    return data;
  }

  public selectFeature(pickedColors: Uint8Array | undefined): void {
    const layer = this.layer;
    // @ts-ignore
    const [r, g, b] = pickedColors;
    layer.hooks.beforeSelect.call([r, g, b]);
  }
  public highlightPickedFeature(pickedColors: Uint8Array | undefined): void {
    // @ts-ignore
    const [r, g, b] = pickedColors;
    this.layer.hooks.beforeHighlight.call([r, g, b]);
  }
  public getFeatureById(pickedFeatureIdx: number): any {
    return this.layer.getSource().getFeatureById(pickedFeatureIdx);
  }
}
