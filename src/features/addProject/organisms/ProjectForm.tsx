import React, { useState, useEffect, type FormEvent } from 'react';
import {
  useGetPostsQuery,
  useNewPostMutation,
  useEditPostMutation,
} from '../../../redux/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Form from '../molecules/Form/Form';

const ProjectForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { data: posts } = useGetPostsQuery();
  const [newPost] = useNewPostMutation();
  const [editPost] = useEditPostMutation();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const navigate = useNavigate();
  // Pre-fill form if editing
  useEffect(() => {
    if (id && posts) {
      const existing = posts.find((p: Post) => p.id.toString() === id);
      if (existing) {
        setTitle(existing.title);
        setBody(existing.body);
      }
    }
  }, [id, posts]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post = {
      id: id || (Math.random() * 1000).toString(),
      title,
      body,
      user_id: Math.floor(Math.random() * 1000),
    };

    try {
      if (id) {
        // EDIT EXISTING POST
        await editPost(post).unwrap();
      } else {
        // CREATE NEW POST
        await newPost(post).unwrap();
      }

      // newPost(post); // Whether add or update, handled here
      setTitle('');
      setBody('');
      navigate('/project');
    } catch (error) {
      console.error('Error while submitting post:', error);
    }
  };

  return (
    <Form
      title={title}
      setTitle={setTitle}
      body={body}
      setBody={setBody}
      onSubmit={submitHandler}
      buttonText={id ? 'Update' : 'Add'}
    />
  );
};

export default ProjectForm;
