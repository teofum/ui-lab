interface HeadingProps {
  children?: React.ReactNode;

  type?: 'h1' | 'h2' | 'h3';
  title: string;
  text: string;

  repoLink?: string;
}

export default function Heading({
  type = 'h1',
  title,
  text,
  children,
}: HeadingProps) {
  let HeadingElement = () => {
    switch (type) {
      case 'h1':
        return <h1>{title}</h1>;
      case 'h2':
        return <h2>{title}</h2>;
      case 'h3':
        return <h3>{title}</h3>;
    }
  };

  return (
    <div>
      <HeadingElement />
      <p>{text}</p>
      {children}
      {type === 'h1' && <hr />}
    </div>
  );
}
