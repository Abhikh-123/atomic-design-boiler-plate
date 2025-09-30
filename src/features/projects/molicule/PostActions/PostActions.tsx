import Button from '../../../projects/atoms/Button/Button';
import '../../../../style.css';

type PostActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const PostActions = ({ onEdit, onDelete }: PostActionsProps) => {
  return (
    <div>
      <Button onClick={onEdit} className="edit-button">
        Edit
      </Button>
      <Button onClick={onDelete} className="delete-button">
        Delete
      </Button>
    </div>
  );
};

export default PostActions;
