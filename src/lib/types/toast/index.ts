import type { ToastColor } from "./colors";
import type { ToastPosition } from "./positions";

export type ToastProps = {
	open: boolean;
	icon?: string;
	position?: ToastPosition;
	color?: ToastColor;
	startCounter?: number;
};

export type OptionalToastProps = Partial<ToastColor>;

export type { ToastColor } from "./colors";
export type { ToastPosition } from "./positions";
