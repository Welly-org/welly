import { Flex } from "@radix-ui/themes";

interface Props {
  percentage: number;
}

const ProgressBar = ({ percentage }: Props) => {
  return (
    <div className="ml-7">
      <div className="w-60 h-6 bg-gray rounded-lg">
        <Flex
          justify="start"
          align="center"
          className="bg-pink h-full rounded-lg"
          style={{
            width: `${percentage}%`,
          }}
        >
          <div className="text-white text-xs px-3 font-thin">{percentage}%</div>
        </Flex>
      </div>
    </div>
  );
};

export default ProgressBar;
