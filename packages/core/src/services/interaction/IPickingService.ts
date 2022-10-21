import { IInteractionTarget } from '../interaction/IInteractionService';
import { ILayer } from '../layer/ILayerService';
export interface IPickingService {
  pickedColors: Uint8Array | undefined;
  pickedTileLayers: ILayer[];
  init(id: string): void;
  pickFromPickingFBO(layer: ILayer, target: IInteractionTarget): boolean;
  pickBox(layer: ILayer, box: [number, number, number, number]): any[];
  boxPickLayer(
    layer: ILayer,
    box: [number, number, number, number],
    cb: (...args: any[]) => void,
  ): Promise<any>;
  destroy(): void;
}

export interface ILayerPickService {
  /**
   * 绘制拾取图层
   * @param target 触发对象
   */
  pickRender(target: IInteractionTarget): void;
  /**
   * 为图层设置选中对象
   * @param pickedColors 
   */
  selectFeature(pickedColors: Uint8Array | undefined):void
  /**
   * 为图层设置active对象
   * @param pickedColors 
   */

  highlightPickedFeature(pickedColors: Uint8Array | undefined):void
  
  /**
   * 获取选中的要素
   * @param id q
   */
  getFeatureById(id: number):any


}