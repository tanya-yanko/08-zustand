import React from "react";
import css from './LayoutNotes.module.css';

type NoteListLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NoteListLayout({
  children,
  sidebar,
}: NoteListLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.notesWrapper}>{children}</section>
    </div>
  );
}