'use client';

import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api';
import { useNoteDraftStore } from '@/lib/store/noteStore';  
import css from './NoteForm.module.css';

interface NoteFormProps {

}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be 50 characters or less')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content must be 500 characters or less'),
  tag: Yup.mixed<'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteDraftStore((state) => state.draft);
  const setDraft = useNoteDraftStore((state) => state.setDraft);
  const resetDraft = useNoteDraftStore((state) => state.clearDraft);

  const { mutate, status } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      resetDraft();
      router.push('/notes'); 
    },
    onError: (error: unknown) => {
      console.error('Error creating note:', error);
    },
  });

  
  useEffect(() => {
  
  }, []);

  return (
    <Formik
      initialValues={{
        title: draft.title || '',
        content: draft.content || '',
        tag: draft.tag || 'Todo',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        mutate(values);
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => {
        
        useEffect(() => {
          setDraft(values);
        }, [values, setDraft]);

        return (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" className={css.input} />
              <FormikErrorMessage name="title" component="div" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <Field as="textarea" id="content" name="content" rows={5} className={css.textarea} />
              <FormikErrorMessage name="content" component="div" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="tag">Tag</label>
              <Field as="select" id="tag" name="tag" className={css.select}>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <FormikErrorMessage name="tag" component="div" className={css.error} />
            </div>

            <div className={css.actions}>
              <button type="submit" disabled={isSubmitting || status === 'pending'}>
                {isSubmitting || status === 'pending' ? 'Saving...' : 'Create note'}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetDraft();
                  router.back();
                }}
                className={css.cancelButton}
              >
                Cancel
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
