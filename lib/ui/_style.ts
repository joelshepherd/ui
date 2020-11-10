/// Style
export interface Style extends Layout, Rendering {}

export function setStyle(widget: HTMLElement, style?: Style): void {
  if (style) {
    setLayout(widget, style);
    setRendering(widget, style);
  }
}

// Layout
interface Layout {
  offset?: Offset;
  padding?: Padding;
  position?: Position;
  size?: Size;
}

function setLayout(
  widget: HTMLElement,
  { offset, padding, position, size }: Layout
): void {
  if (offset) setOffset(widget, offset);
  if (padding) setPadding(widget, padding);
  if (position) setPosition(widget, position);
  if (size) setSize(widget, size);
}

type Offset = { x?: number; y?: number };

function setOffset(widget: HTMLElement, { x = 0, y = 0 }: Offset): void {
  widget.style.marginLeft = `${x}px`;
  widget.style.marginTop = `${y}px`;
}

type Edge = "top" | "right" | "bottom" | "left";
type EdgeSet<T> = Record<Edge, T>;
type Padding = number | [Edge, number] | Partial<EdgeSet<number>>;

function setPadding(widget: HTMLElement, padding: Padding): void {
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

type Position = { x?: number; y?: number };

function setPosition(widget: HTMLElement, { x = 0, y = 0 }: Offset): void {
  widget.style.top = `${x}px`;
  widget.style.left = `${y}px`;
}

type Size = { height?: number; width?: number };

function setSize(widget: HTMLElement, { height, width }: Size): void {
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
  widget: HTMLElement,
  { border, color, opacity, rounding, shadow }: Rendering
): void {
  if (border) setBorder(widget, border);
  if (color) setColor(widget, color);
  if (opacity) setOpacity(widget, opacity);
  if (rounding) setRounding(widget, rounding);
  if (shadow) setShadow(widget, shadow);
}

type Border = { color: Color; width?: number };

function setBorder(widget: HTMLElement, { color, width = 1 }: Border): void {
  widget.style.border = `${width}px solid ${color}`;
}

type Color = string;

function setColor(widget: HTMLElement, color: Color): void {
  widget.style.color = color;
}

type Opacity = number;

function setOpacity(widget: HTMLElement, opacity: Opacity): void {
  widget.style.opacity = `${opacity}`;
}

type Rounding = number;

function setRounding(widget: HTMLElement, rounding: Rounding): void {
  widget.style.borderRadius = `${rounding}px`;
}

type Shadow = { color: Color; radius: number; x?: number; y?: number };

function setShadow(
  widget: HTMLElement,
  { color, radius, x = 0, y = 0 }: Shadow
): void {
  widget.style.boxShadow = `${x}px ${y}px ${radius}px ${color}`;
}
