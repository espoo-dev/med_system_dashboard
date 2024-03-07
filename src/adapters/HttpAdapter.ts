interface HttpAdapter {
  get<T>(url: string): Promise<T>;
  post<Response, Payload>(url: string, data?: Payload): Promise<Response>;
}

export default HttpAdapter;
