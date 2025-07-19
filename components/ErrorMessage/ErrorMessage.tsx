import { useField } from 'formik';
import styles from './ErrorMessage.module.css';
import React from 'react';

interface ErrorMessageProps {
  name?: string;
  className?: string;
  children?: React.ReactNode;
  message?: string;
}

export default function ErrorMessage({
  name = '__unused__',
  className,
  children,
  message,
}: ErrorMessageProps) {
  const [, meta] = useField(name);

  if (message) {
    return <p className={className || styles.text}>{message}</p>;
  }

  if (children) {
    return <p className={className || styles.text}>{children}</p>;
  }

  if (!meta.touched || !meta.error) {
    return null;
  }

  return <p className={className || styles.text}>{meta.error}</p>;
}
