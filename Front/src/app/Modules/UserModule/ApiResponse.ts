export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any; // Optional field to hold any data specific to the API
}
