import styles from "./styles.module.scss";

const Input = (props: any) => {
  return <input className={styles.input} {...props}></input>;
};

const TextArea = (props: any) => {
  return <textarea className={styles.textarea} {...props}></textarea>;
};

export { Input, TextArea };
