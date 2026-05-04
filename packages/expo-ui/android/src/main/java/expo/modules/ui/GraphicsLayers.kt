package expo.modules.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.GraphicsContext
import androidx.compose.ui.graphics.layer.GraphicsLayer
import androidx.compose.ui.platform.LocalGraphicsContext

/**
 * Holds [GraphicsLayer]s keyed by user-provided names so that sibling
 * composables can share a layer through the `recordLayer` and `drawLayer`
 * modifiers.
 *
 * Layers are created lazily on first lookup and released together when the
 * owning composition leaves the tree.
 */
internal class NamedGraphicsLayerStore(private val graphicsContext: GraphicsContext) {
  private val layers = mutableMapOf<String, GraphicsLayer>()

  fun getOrCreate(name: String): GraphicsLayer =
    layers.getOrPut(name) { graphicsContext.createGraphicsLayer() }

  fun get(name: String): GraphicsLayer? = layers[name]

  fun releaseAll() {
    layers.values.forEach { graphicsContext.releaseGraphicsLayer(it) }
    layers.clear()
  }
}

internal val LocalNamedGraphicsLayers = compositionLocalOf<NamedGraphicsLayerStore?> { null }

/**
 * Installs a [NamedGraphicsLayerStore] for the lifetime of [content]. The
 * store is released when this composable leaves the composition.
 */
@Composable
internal fun ProvideNamedGraphicsLayers(content: @Composable () -> Unit) {
  val graphicsContext = LocalGraphicsContext.current
  val store = remember(graphicsContext) { NamedGraphicsLayerStore(graphicsContext) }
  DisposableEffect(store) {
    onDispose { store.releaseAll() }
  }
  CompositionLocalProvider(LocalNamedGraphicsLayers provides store) {
    content()
  }
}
