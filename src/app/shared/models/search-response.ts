export class SearchResponse<T> {
  total_count: number;
  incomplete_results: true;
  items: T[];
}
