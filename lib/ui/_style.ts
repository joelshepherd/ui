import { Widget } from "./_type";

/// Style
export interface Style extends Layout, Rendering {}

export function setStyle(widget: Widget, style: Style): void {
  setLayout(widget, style);
  setRendering(widget, style);
}

// Layout
interface Layout {
  padding?: Padding;
  size?: Size;
}

function setLayout(widget: Widget, { padding, size }: Layout): void {
  if (padding) setPadding(widget, padding);
  if (size) setSize(widget, size);
}

type Edge = "top" | "right" | "bottom" | "left";
type Padding = number | [Edge, number] | Partial<Record<Edge, number>>;

function setPadding(widget: Widget, padding: Padding): void {
  if (typeof padding === "number") {
    widget.style.padding = `${padding}px`;
  } else if (Array.isArray(padding)) {
    widget.style.padding = `${padding[1]}px ${padding[1]}px`;
  } else if (typeof padding === "object") {
    if (padding.top) widget.style.paddingTop = `${padding.top}px`;
    if (padding.right) widget.style.paddingRight = `${padding.right}px`;
    if (padding.bottom) widget.style.paddingBottom = `${padding.bottom}px`;
    if (padding.left) widget.style.paddingLeft = `${padding.left}px`;
  }
}

type Size = { height?: number; width?: number };

function setSize(widget: Widget, { height, width }: Size): void {
  if (height) widget.style.height = `${height}px`;
  if (width) widget.style.width = `${width}px`;
}

// Rendering
interface Rendering {
  border?: Border;
  color?: Color;
  opacity?: Opacity;
  rounding?: Rounding;
  shadow?: Shadow;
}

function setRendering(
  widget: Widget,
  { border, color, opacity, rounding, shadow }: Rendering
): void {
  if (border) setBorder(widget, border);
  if (color) setColor(widget, color);
  if (opacity) setOpacity(widget, opacity);
  if (rounding) setRounding(widget, rounding);
  if (shadow) setShadow(widget, shadow);
}

type Border = { color: Color; width?: number };

function setBorder(widget: Widget, { color, width = 1 }: Border): void {
  widget.style.border = `${width}px solid ${color}`;
}

type Color = string;

function setColor(widget: Widget, color: Color): void {
  widget.style.color = color;
}

type Opacity = number;

function setOpacity(widget: Widget, opacity: Opacity): void {
  widget.style.opacity = `${opacity}`;
}

type Rounding = number;

function setRounding(widget: Widget, rounding: Rounding): void {
  widget.style.borderRadius = `${rounding}px`;
}

type Shadow = { color: Color; radius: number; x?: number; y?: number };

function setShadow(
  widget: Widget,
  { color, radius, x = 0, y = 0 }: Shadow
): void {
  widget.style.boxShadow = `${x}px ${y}px ${radius}px ${color}`;
}
