import Input from '../../../projects/atoms/Input/Input';
import Button from '../../../projects/atoms/Button/Button';

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  onClearClick: () => void;
};

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onSearchClick,
  onClearClick,
}: SearchBarProps) => {
  return (
    <div className="search-criteria-container">
      <div className="search-criteria-heading">Search Filter</div>
      <div className="search-criteria">
        <div className="project-search-input">
          <span className="search-citeria-field-name">Project Name:</span>
          <Input
            placeholder="Enter Project Name"
            value={searchTerm}
            onChange={onSearchChange}
            className="search-input"
          />
        </div>
        <div>
          <Button onClick={onSearchClick} className="edit-button">
            Search
          </Button>
          <Button onClick={onClearClick} className="delete-button">
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
