import { ErrorLabelProps } from "./ErrorLabel.types";

const ErrorLabel = ({ children }: ErrorLabelProps): React.JSX.Element => (
  <span className="text-red-500">{children}</span>
);

export default ErrorLabel;
