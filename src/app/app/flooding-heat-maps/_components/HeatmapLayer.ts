import * as L from 'leaflet'
import { createLayerComponent } from '@react-leaflet/core'

import Heatmap, { HeatmapOptions } from './Heatmap'

export type HeatmapLayerProps<Point> = HeatmapOptions<Point>

function HeatmapLayerFactory<Point>() {
  return createLayerComponent<Heatmap<Point>, HeatmapLayerProps<Point>>(
    function createHeatmapLayer(props, context) {
      const instance: Heatmap<Point> = new Heatmap(props)
      return { instance, context }
    },
    function updateHeatmapLayer(
      instance,
      {
        opacity,
        minOpacity,
        maxZoom,
        radius,
        blur,
        max,
        gradient,
        latitudeExtractor,
        longitudeExtractor,
        intensityExtractor,
        points,
        aggregateType,
        useLocalExtrema = true,
      },
    ) {
      // if (props.fitBoundsOnUpdate) {
      //   instance.fitBounds()
      // }
      instance.updateSimpleHeat({ opacity, minOpacity, maxZoom, radius, blur, max, gradient })

      L.Util.setOptions(instance, {
        latitudeExtractor,
        longitudeExtractor,
        intensityExtractor,
        points,
        aggregateType,
        useLocalExtrema,
      })

      instance.reset()
    },
  )
}

export default HeatmapLayerFactory
