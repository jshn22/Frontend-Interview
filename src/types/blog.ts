export interface Blog {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  coverImage: string;
  date: string;
}

export interface CreateBlogInput {
  title: string;
  category: string;
  description: string;
  content: string;
  coverImage: string;
}
