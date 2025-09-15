"use client";

import { useState } from "react";
import styles from "./List.module.scss";

type ListItem = {
  id: number;
  title: string;
  content: string;
};

const items: ListItem[] = [
  {
    id: 1,
    title: "Tecnologia",
    content: "Aqui entra o texto explicando o que é a Pós Tech...",
  },
  {
    id: 2,
    title: "Inovação",
    content: "Detalhes sobre quem pode cursar...",
  },
  {
    id: 3,
    title: "Negócios",
    content: "A duração média é de X meses/anos...",
  },
];

export default function List() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={styles.wrapper}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={styles.item}>
            <div className={styles.header}>
              <h3 className={styles.title}>{item.title}</h3>
              <button
                className={`${styles.toggle} ${isOpen ? styles.active : ""}`}
                onClick={() => toggle(item.id)}
                type="button"
                aria-expanded={isOpen}
              />
            </div>

            <div
              className={`${styles.content} ${isOpen ? styles.open : ""}`}
              style={
                isOpen
                  ? {
                      maxHeight: `${
                        document.getElementById(`content-${item.id}`)
                          ?.scrollHeight
                      }px`,
                    }
                  : { maxHeight: 0 }
              }
              id={`content-${item.id}`}
            >
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
