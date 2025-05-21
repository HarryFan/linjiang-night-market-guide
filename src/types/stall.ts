/**
 * 夜市攤位資料模型
 */
export interface Stall {
  id: string;
  name: string;
  description: string;
  category: StallCategory;
  image: string;
  openHours: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  area: StallArea;
  tags: string[];
  rating: number;
  recommendedItems: {
    name: string;
    price: string;
    description?: string;
  }[];
  contactInfo?: string;
}

/**
 * 攤位分類
 */
export type StallCategory = 'snack' | 'drink' | 'dessert' | 'specialty';

/**
 * 攤位區域
 */
export type StallArea = 'entrance' | 'middle' | 'end';
