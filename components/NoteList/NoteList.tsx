import type { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';
import styles from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <ul className={styles.grid}>
      {notes.map(note => (
        <li key={note.id} className={styles.item}>
          <Link href={`/notes/${note.id}`} className={styles.card}>
            <h2 className={styles.title}>{note.title}</h2>
            <p className={styles.content}>{note.content}</p>
            <p className={styles.tag}>Tag: {note.tag}</p>
          </Link>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(note.id)}
            disabled={mutation.isPending}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

