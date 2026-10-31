/*
 * Optical equations adapted from dashersw/liquid-glass-js, container.js.
 * Upstream: 78cb6ccb0b9987bb60a88b14ccbd13a9e6e8ab2a (MIT).
 * See LICENSE and README.md in this directory for provenance and changes.
 */

export const DISPLACEMENT_SCALE = 20;

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

/** The signed rounded rectangle distance used by the upstream fragment shader. */
export function roundedRectDistance(x, y, width, height, radius) {
  const cornerX = Math.abs(x - width / 2) - (width / 2 - radius);
  const cornerY = Math.abs(y - height / 2) - (height / 2 - radius);
  return (
    Math.hypot(Math.max(cornerX, 0), Math.max(cornerY, 0)) +
    Math.min(Math.max(cornerX, cornerY), 0) -
    radius
  );
}

/**
 * Translate the upstream shape normals, exponential edge/rim falloff, corner
 * enhancement, and perpendicular ripple into an SVG displacement texture.
 * SVG filters sample the live backdrop, so no page screenshot is necessary.
 */
export function createOpticalMap(width, height, borderRadius) {
  const mapWidth = Math.max(24, Math.round(160 * Math.min(1, width / height)));
  const mapHeight = Math.max(24, Math.round(160 * Math.min(1, height / width)));
  const canvas = document.createElement('canvas');
  canvas.width = mapWidth;
  canvas.height = mapHeight;
  const context = canvas.getContext('2d');
  if (!context) return null;

  const pixels = context.createImageData(mapWidth, mapHeight);
  const minimumSize = Math.min(width, height);
  const radius = clamp(borderRadius, 0, minimumSize / 2);
  const opticalSize = clamp(minimumSize, 40, 76);

  for (let mapY = 0; mapY < mapHeight; mapY += 1) {
    for (let mapX = 0; mapX < mapWidth; mapX += 1) {
      const x = ((mapX + 0.5) / mapWidth) * width;
      const y = ((mapY + 0.5) / mapHeight) * height;
      const distance = Math.max(-roundedRectDistance(x, y, width, height, radius), 0);
      const edge = Math.exp(-distance * 0.15);
      const rim = Math.exp(-distance * 0.8);
      const intensity = edge * 0.018 + rim * 0.055;
      const cornerDistance = Math.max(Math.min(x, width - x), Math.min(y, height - y));
      const cornerBoost = Math.exp(-cornerDistance * 0.3) * 0.025;
      const ripple = Math.sin((distance / minimumSize) * 25) * 0.08 * rim;
      const normalX = x / width - 0.5;
      const normalY = y / height - 0.5;
      const normalLength = Math.hypot(normalX, normalY) || 1;
      const directionX = normalX / normalLength;
      const directionY = normalY / normalLength;
      const shiftX = (directionX * (intensity + cornerBoost) - directionY * ripple) * opticalSize;
      const shiftY = (directionY * (intensity + cornerBoost) + directionX * ripple) * opticalSize;
      const index = (mapY * mapWidth + mapX) * 4;

      // R/G encode horizontal/vertical offsets; 0.5 is neutral.
      pixels.data[index] = Math.round(clamp(0.5 + shiftX / DISPLACEMENT_SCALE, 0, 1) * 255);
      pixels.data[index + 1] = Math.round(clamp(0.5 + shiftY / DISPLACEMENT_SCALE, 0, 1) * 255);
      pixels.data[index + 2] = 128;
      pixels.data[index + 3] = 255;
    }
  }

  context.putImageData(pixels, 0, 0);
  return canvas.toDataURL('image/png');
}

/** Bucket near-identical surfaces so their small displacement maps are shared. */
export function measureSurface(element) {
  const { width, height } = element.getBoundingClientRect();
  if (width < 4 || height < 4) return null;
  const computed = getComputedStyle(element);
  const radiusValue = computed.borderTopLeftRadius;
  const parsedRadius = Number.parseFloat(radiusValue) || 0;
  const radius = radiusValue.includes('%')
    ? (Math.min(width, height) * parsedRadius) / 100
    : parsedRadius;
  const bucketWidth = Math.max(8, Math.round(width / 8) * 8);
  const bucketHeight = Math.max(8, Math.round(height / 8) * 8);
  const bucketRadius = Math.round(radius / 2) * 2;
  return {
    key: `${bucketWidth}:${bucketHeight}:${bucketRadius}`,
    width: bucketWidth,
    height: bucketHeight,
    radius: bucketRadius,
  };
}
