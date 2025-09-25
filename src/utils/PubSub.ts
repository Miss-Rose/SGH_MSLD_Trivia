export const PubSub = {
	subscribers: {},

	subscribe(eventName: string, callback: unknown): void {
		if (!Array.isArray(this.subscribers[eventName])) {
			this.subscribers[eventName] = [];
		}

		this.subscribers[eventName].push(callback);
	},

	publish(eventName: string, data?: Record<string, unknown>): void {
		if (!Array.isArray(this.subscribers[eventName])) return;

		this.subscribers[eventName].forEach((callback: (arg: object | undefined) => void) => {
			callback(data);
		});
	},

};
