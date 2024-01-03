import {writable, type Writable} from "svelte/store";

let width: number = (typeof window !== "undefined") ? window.innerWidth : 0;
export const windowWidth: Writable<number> = writable(width);
