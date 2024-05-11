export interface CategoriesInterface {
  id?: string;  // Optional because it can be used to fetch an existing category or to create a new one. New categories don't have an ID yet.
  name: string;
}
