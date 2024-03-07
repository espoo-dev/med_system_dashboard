export default interface ApiPort {
  fetchData(url: string): Promise<any>;
}
