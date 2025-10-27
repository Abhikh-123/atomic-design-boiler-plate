import Heading from '../../../projects/atoms/Heading/Heading';
import Button from '../../../projects/atoms/Button/Button';
import SearchBar from '../../../projects/molicule/SearchBar/SearchBar';
import ProjectList from '../../organisms/ProjectList/ProjectList';
import { useTranslation } from 'react-i18next';


type Project = {
  id: number;
  title: string;
  body: string;

};

type ProjectTemplateProps = {
  title: string;
  onAddClick: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  onClearClick: () => void;
  projects: Project[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({
  title,
  onAddClick,
  searchTerm,
  onSearchChange,
  onSearchClick,
  onClearClick,
  projects,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="page-heading">
        <Heading>{title}</Heading>
        <Button className="header-button" onClick={onAddClick}>
          {t('add-project')}
        </Button>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onSearchClick={onSearchClick}
        onClearClick={onClearClick}
      />

      <ProjectList projects={projects} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default ProjectTemplate;
