"use client";

import { tags } from "@/constants/constants";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes &#9662;
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/All"
              className={css.menuLink}
              onClick={handleCloseMenu}
            >
              All
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={handleCloseMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
