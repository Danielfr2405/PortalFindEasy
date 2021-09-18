import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class Utils {
	constructor() {}

	static isEmpty(value) {
		return value === undefined || value === null || value === '' || value === {} || value.length === 0;
	}
}
