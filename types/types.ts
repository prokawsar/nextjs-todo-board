export type Todo = {
  id: string;
  title: string;
  description: string;
  category: number;
  user: string;
  expire_at: string;
};

export type Category = {
  id: number;
  name: string;
  user: string;
};

export type History = {
  id: number;
  todo: number;
  from: number;
  to: number;
  created_at: Date;
};
