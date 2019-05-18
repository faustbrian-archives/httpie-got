// tslint:disable: no-unsafe-any
import { IClient, IRequest, IResponse, RequestOptions } from "@httpack/httpack";
import got from "got";
import { Request } from "./request";
import { Response } from "./response";

export class Client implements IClient {
	public async get(url: string, options?: RequestOptions): Promise<IResponse> {
		return this.sendRequest(
			new Request()
				.withMethod("get")
				.withUrl(url)
				.withOptions(options),
		);
	}

	public async post(url: string, options?: RequestOptions): Promise<IResponse> {
		return this.sendRequest(
			new Request()
				.withMethod("post")
				.withUrl(url)
				.withOptions(options),
		);
	}

	public async put(url: string, options?: RequestOptions): Promise<IResponse> {
		return this.sendRequest(
			new Request()
				.withMethod("put")
				.withUrl(url)
				.withOptions(options),
		);
	}

	public async patch(url: string, options?: RequestOptions): Promise<IResponse> {
		return this.sendRequest(
			new Request()
				.withMethod("patch")
				.withUrl(url)
				.withOptions(options),
		);
	}

	public async head(url: string, options?: RequestOptions): Promise<IResponse> {
		return this.sendRequest(
			new Request()
				.withMethod("head")
				.withUrl(url)
				.withOptions(options),
		);
	}

	public async delete(url: string, options?: RequestOptions): Promise<IResponse> {
		return this.sendRequest(
			new Request()
				.withMethod("delete")
				.withUrl(url)
				.withOptions(options),
		);
	}

	public async sendRequest(request: IRequest): Promise<IResponse> {
		try {
			// @ts-ignore
			const { body, statusCode, headers } = await got[request.getMethod()](request.getUrl());

			return new Response({ body, headers, statusCode });
		} catch (error) {
			return new Response({
				body: error.response.body,
				headers: error.response.headers,
				statusCode: error.response.statusCode,
				statusMessage: error.response.statusMessage,
			});
		}
	}
}
