import PostsCard from '../PostsCard/PostsCard';

type Post = {
  id: number;
  title: string;
  body: string;
};

type ProjectListProps = {
  projects: Post[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const ProjectList = ({ projects, onEdit, onDelete }: ProjectListProps) => {
  return (
    <>
      {projects.length > 0 ? (
        projects.map((project) => (
          <PostsCard
            key={project.id}
            post={project}
            onEdit={() => onEdit(project.id)}
            onDelete={() => onDelete(project.id)}
            // onDelete={() => {
            //   if (window.confirm("Are you sure you want to delete this project?")) {
            //     onDelete(project.id);
            //   }
            // }}
            
          />
        ))
      ) : (
        <p>No matching projects found.</p>
      )}
    </>
  );
};

export default ProjectList;
