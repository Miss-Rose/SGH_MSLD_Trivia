declare module '*.ogg';

type Asset = {
	key: string;
	data: string;
};

type AssetResource = {
	alias: string;
	src: string;
	data: Record<string, string>;
};
type Size = { width: number; height: number };
type Orientation = 'landscape' | 'portrait';
type ResizeOptions = Size & { orientation: Orientation };
type Position = { x: number; y: number };
