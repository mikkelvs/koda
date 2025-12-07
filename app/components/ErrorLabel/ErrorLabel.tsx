import { ErrorLabelProps } from "./ErrorLabel.types";

const ErrorLabel = ({ children }: ErrorLabelProps): React.JSX.Element => (
  <div className="text-red-500 mb-2 p-2">{children}</div>
);

export default ErrorLabel;
