export class StringHelpers {
	static randomString(length: number): string {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for (var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
}