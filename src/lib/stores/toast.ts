import type { ToastProps, ToastColor, ToastPosition } from "$lib/types/toast";
import { writable } from "svelte/store";

type GlobalToastProps = ToastProps & { message: string };

function createToast() {
	const {
		subscribe,
		set: setProps,
		update,
	} = writable<GlobalToastProps>({
		open: false,
		icon: "mdi:alert",
		position: "top-left",
		color: "green",
		startCounter: 5,
		message: "",
	});

	return {
		subscribe,
		open: (props: Omit<GlobalToastProps, "open">) => {
			update((p) => ({ ...p, ...props, open: true }));
		},

		setMessage: (message: string) => {
			update((props) => ({ ...props, message }));
		},

		close: () => {
			update((props) => ({ ...props, open: false }));
		},

		setIcon: (icon: string) => {
			update((props) => ({ ...props, icon }));
		},

		setPosition: (position: ToastPosition) => {
			update((props) => ({ ...props, position }));
		},

		setColor: (color: ToastColor) => {
			update((props) => ({ ...props, color }));
		},

		setStartCounter: (counter: number) => {
			update((props) => ({ ...props, startCounter: counter }));
		},

		set: (p: GlobalToastProps) => {
			setProps(p);
		},
	};
}

export const toast = createToast();
