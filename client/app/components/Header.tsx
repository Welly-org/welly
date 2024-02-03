interface Props {
  header: string;
}

export const Header = ({ header }: Props) => {
  return <div className="pt-11 text-5xl text-darkbrown">{header}</div>;
};
