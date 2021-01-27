export function rotate(ctx, angle, centerX, centerY) {
  ctx.translate(centerX, centerY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.translate(-centerX, -centerY);
}

export function scale(ctx, scaleX, scaleY, centerX, centerY) {
  ctx.translate(centerX, centerY);
  ctx.scale(scaleX, scaleY);
  ctx.translate(-centerX, -centerY);
}

export function skew(ctx, skewX, skewY, centerX, centerY) {
  ctx.translate(centerX, centerY);
  ctx.transform(1, skewY, skewX, 1, 0, 0);
  ctx.translate(-centerX, -centerY);
}
