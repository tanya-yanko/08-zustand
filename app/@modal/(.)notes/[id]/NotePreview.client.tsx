"use client";

import Modal from "@/components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

export default function PreviewClient() {
  const { id } = useParams();
  const router = useRouter();

  const closeModal = () => router.back();

  const noteId = Number(id);

  const { data: note, isLoading, isError, error } = useQuery({
  queryKey: ["note", noteId],
  queryFn: () => fetchNoteById(noteId),
  enabled: !isNaN(noteId),
  retry: false,
});

  if (isLoading) {
    return (
      <Modal onClose={closeModal}>
        <Loader />
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal onClose={closeModal}>
        <ErrorMessage>
          {(error as Error)?.message || "Failed to load note"}
        </ErrorMessage>
      </Modal>
    );
  }

  if (!note) {
    return (
      <Modal onClose={closeModal}>
        <p>Note not found.</p>
      </Modal>
    );
  }

 return (
     <Modal onClose={closeModal}>
       <NotePreview id={Number(id)} onClose={closeModal} />
     </Modal>
   );
}
