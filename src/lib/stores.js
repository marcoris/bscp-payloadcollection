// src/lib/stores.js
import { writable } from 'svelte/store';

export const categoryStore = writable([]);
export const payloadStore = writable([]);
export const filterStore = writable('');
