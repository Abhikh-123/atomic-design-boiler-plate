/// <reference types="vite/client" />
interface Post {
  title: string;
  body: string;
  user_id: number;
  id: string;
}
type PostsCardProps = {
  loading: boolean;
  data?: Post[] | null;
};
