import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const host = 'findEasy';

/**
 * Classe para centralizar as chamadas do Protheus
 */

@Injectable({
	providedIn: 'root',
})
export class FindEasyService {
	constructor(private http: HttpClient) {}

	/**
	 * metodo GET
	 * consome os serviços REST do Protheus
	 * @param endpoint Url que será requisitada
	 * @param operation Nome da operação
	 * @param headers Opções de cabeçalho
	 * @param params Opções de parametro
	 */
	get(
		endpoint,
		operation,
		headers: HttpHeaders = new HttpHeaders(),
		params: HttpParams = new HttpParams()
	): Observable<any> {
		return this.http
			.get<any>(host + endpoint, {
				headers,
				params,
			})
			.pipe(
				map((element) => {
					return element;
				})
			);
	}

	/**
	 * metodo POST
	 * consome os serviços REST do Protheus
	 * @param endpoint Url que será requisitada
	 * @param operation Nome da operação
	 * @param headers Opções de cabeçalho
	 * @param params Opções de parametro
	 * @param throwError - Indica se é retornado o erro do POST
	 */
	post(
		endpoint,
		operation,
		body,
		headers: HttpHeaders = new HttpHeaders(),
		params: HttpParams = new HttpParams(),
		throwError: boolean = false
	) {
		return this.http
			.post<any>(host + endpoint, body, {
				headers,
				params,
			})
			.pipe(tap(), catchError(this.handleError(operation, 'POST', [], throwError)));
	}

	/**
	 * metodo put
	 * consome os serviços REST do Protheus
	 * @param endpoint Url que será requisitada
	 * @param operation Nome da operação
	 * @param headers Opções de cabeçalho
	 * @param params Opções de parametro
	 * @param throwError Indica se é retornado o erro do PUT
	 */
	put(
		endpoint,
		operation,
		body: string,
		headers: HttpHeaders = new HttpHeaders(),
		params: HttpParams = new HttpParams(),
		throwError: boolean = false
	) {
		return this.http
			.put<any>(host + endpoint, body, {
				headers,
				params,
			})
			.pipe(tap(), catchError(this.handleError(operation, 'PUT', [], throwError)));
	}
	/**
	 * metodo DELETE
	 * consome os serviços REST do Protheus
	 * @param endpoint caminho da url que será requisitado
	 * @param operation Nome da operação
	 */
	delete(
		endpoint,
		operation,
		headers: HttpHeaders = new HttpHeaders(),
		params: HttpParams = new HttpParams()
	) {
		return this.http
			.delete<any>(host + endpoint, {
				headers,
				params,
			})
			.pipe(tap(), catchError(this.handleError(operation, 'DELETE', [])));
	}

	/**
	 * Tratamento de erro na requisição
	 * @param operation Nome da operação
	 * @param metodo Método da requisição
	 * @param result Resultado
	 * @param throwError Indica se é retornado o erro do PUT
	 */
	private handleError(
		operation: string = 'Erro ',
		metodo: string,
		result?: any,
		throwError: boolean = false
	) {
		return async (error: any): Promise<any> => {
			return throwError ? error.error.errorMessage : result;
		};
	}
}
