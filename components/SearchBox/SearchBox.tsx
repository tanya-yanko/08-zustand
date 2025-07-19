import React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Search notes..."
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBox;