import { IAttributeAndElements } from '@antv/l7-core';
import BaseLayer from '../core/BaseLayer';
import { IHeatMapLayerStyleOptions } from '../core/interface';
import HeatMapModels, { HeatMapModelType } from './models';
export default class HeatMapLayer extends BaseLayer<IHeatMapLayerStyleOptions> {
  public type: string = 'HeatMapLayer';

  public async buildModels() {
    const shape = this.getModelType();
    this.layerModel = new HeatMapModels[shape](this);
    await this.initLayerModels();
  }

  public renderModels() {
    const shape = this.getModelType();
    if (shape === 'heatmap') {
      if (this.layerModel) {
        this.layerModel.render(); // 独立的渲染流程
      }

      return this;
    }
    if (this.layerModelNeedUpdate) {
      // TODO 渲染流程修改
      this.layerModel.buildModels().then((models) => {
        this.models = models;
        this.layerModelNeedUpdate = false;
      });
    }
    this.models.forEach((model) =>
      model.draw({
        uniforms: this.layerModel.getUninforms(),
      }),
    );
    return this;
  }

  public updateModelData(data: IAttributeAndElements) {
    if (data.attributes && data.elements) {
      this.models[0].updateAttributesAndElements(
        data.attributes,
        data.elements,
      );
    } else {
      console.warn('data error');
    }
  }

  public getModelType(): HeatMapModelType {
    const shapeAttribute =
      this.styleAttributeService.getLayerStyleAttribute('shape');
    const { shape3d } = this.getLayerConfig();
    const source = this.getSource();
    const sourceType = source.data.type;
    const shape =
      (shapeAttribute?.scale?.field as HeatMapModelType) || 'heatmap';
    if (shape === 'heatmap' || shape === 'heatmap3d') {
      return 'heatmap';
    }
    if (sourceType === 'hexagon') {
      return shape3d?.indexOf(shape) === -1 ? 'hexagon' : 'grid3d';
    }
    if (sourceType === 'grid') {
      return shape3d?.indexOf(shape) === -1 ? 'grid' : 'grid3d';
    }
    return 'heatmap';
  }
}
