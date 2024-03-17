interface HttpAdapter {
  get<Response>(url: string, params?: unknown): Promise<Response>;
  post<Response, Payload>(url: string, data?: Payload): Promise<Response>;
}

export default HttpAdapter;
