export interface Todo {
  date: string;
  location: string;
  content: string;
  display: boolean;
  long?: number;
  lat?: number;
  temperature?: string;
}
