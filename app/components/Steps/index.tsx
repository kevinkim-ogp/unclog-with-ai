import Step from "./Step";

interface StepsProps {
  trigger: {
    app: string;
    event: string;
  };
  actions: {
    app: string;
    event: string;
  }[];
}

export default function Steps({ trigger, actions }: StepsProps) {
  console.log(trigger, actions);
  return (
    <div className="flex flex-col gap-4 w-full max-w-[500px] mx-auto">
      <Step {...trigger} stepNumber={1} />
      {actions.map((action, index) => (
        <Step {...action} stepNumber={index + 2} />
      ))}
    </div>
  );
}
