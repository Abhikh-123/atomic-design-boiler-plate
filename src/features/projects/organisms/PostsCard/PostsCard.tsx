import PostActions from '../../../projects/molicule/PostActions/PostActions';

type Post = {
  id: number;
  title: string;
  body: string;
};

const PostsCard = ({
  post,
  onEdit,
  onDelete,
}: {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="post-container">
      <h2>project - {post.title}</h2>
      <div>Project: {post.title}</div>
      <div>TeamLead: {post.body}</div>
      <PostActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default PostsCard;
