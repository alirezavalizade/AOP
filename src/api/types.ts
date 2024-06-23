export interface LibraryDto {
  id: number;
  name: string;
  total_downloads: number;
  /**
   * In bytes
   */
  install_size: number;
  latest_version: string;
}

export interface LibraryDetailsDto extends LibraryDto {
  author: string;
  description: string;
  downloads_last_seven_days: number[];
  /**
   * ISO date string
   */
  last_publish_date: string;
  license: string;
}
