import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class Utils {
	constructor() {}

	static isEmpty(value) {
		return (
			value === undefined ||
			value === null ||
			value === '' ||
			value === {} ||
			value.length === 0
		);
	}

	static makeFormatDate(data: Date) {
		const dia: string = data.getDate().toString().padStart(2, '0');
		const mes: string = (data.getMonth() + 1).toString().padStart(2, '0');
		const ano: number = data.getFullYear();
		const hora: number = data.getHours();
		const minuto: string =
			data.getMinutes().toString().length === 1
				? '0' + data.getMinutes().toString()
				: data.getMinutes().toString();

		return `${dia}/${mes}/${ano} às ${hora}:${minuto}hs`;
	}
}
