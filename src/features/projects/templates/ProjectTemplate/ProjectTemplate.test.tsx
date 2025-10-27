import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectTemplate from '../ProjectTemplate/ProjectTemplate';
type Project = {
  id: number;
  title: string;
  body: string;

};


type ProjectTemplateProps = {
  title: string;
  onClick: () => void;
  onSearchChange: () => void;
  searchTerm: string;
  className: string;
  children: string;
  projects: Project[];
  onSearchClick: () => void;
  onClearClick: () => void;
  onEdit : (id: number) => void;
  onDelete:(id: number)=>void;
};

jest.mock(
  '../../../projects/atoms/Heading/Heading',
  () => (props: ProjectTemplateProps) => <h1>{props.children}</h1>
);
jest.mock(
  '../../../projects/atoms/Button/Button',
  () => (props: ProjectTemplateProps) => (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  )
);
jest.mock(
  '../../../projects/molicule/SearchBar/SearchBar',
  () => (props: ProjectTemplateProps) => (
    <div>
      <input
        value={props.searchTerm}
        onChange={props.onSearchChange}
        placeholder="Search"
      />
      <button onClick={props.onSearchClick}>Search</button>
      <button onClick={props.onClearClick}>Clear</button>
    </div>
  )
);
jest.mock(
  '../../organisms/ProjectList/ProjectList',
  () => (props: ProjectTemplateProps) => (
    <ul>
      {props.projects.map((p: Project) => (
        <li key={p.id}>
          {p.title}
          <button onClick={() => props.onEdit(p.id)}>Edit</button>
          <button onClick={() => props.onDelete(p.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
);

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('ProjectTemplate', () => {

const mockProjects: Project[] = [{ id: 1, title: 'Project One',body :''}];



  const mockProps = {
    title: 'My Projects',
    onAddClick: jest.fn(),
    searchTerm: 'test',
    onSearchChange: jest.fn(),
    onSearchClick: jest.fn(),
    onClearClick: jest.fn(),
    projects:mockProjects,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  it('renders title and button', () => {
    render(<ProjectTemplate {...mockProps} />);
    expect(screen.getByText('My Projects')).toBeInTheDocument();
    expect(screen.getByText('add-project')).toBeInTheDocument();
  });

  it('calls onAddClick when button is clicked', () => {
    render(<ProjectTemplate {...mockProps} />);
    fireEvent.click(screen.getByText('add-project'));
    expect(mockProps.onAddClick).toHaveBeenCalled();
  });

  it('renders SearchBar and handles interactions', () => {
    render(<ProjectTemplate {...mockProps} />);
    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'new search' },
    });
    expect(mockProps.onSearchChange).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Search'));
    expect(mockProps.onSearchClick).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Clear'));
    expect(mockProps.onClearClick).toHaveBeenCalled();
  });

  it('renders ProjectList and triggers edit/delete', () => {
    render(<ProjectTemplate {...mockProps} />);
    expect(screen.getByText('Project One')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Edit'));
    expect(mockProps.onEdit).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockProps.onDelete).toHaveBeenCalledWith(1);
  });
});
