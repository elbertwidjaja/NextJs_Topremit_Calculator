import { Input } from "@chakra-ui/react";

function RecipientInput({ placeholder, field }) {
  return <Input size="lg" placeholder={placeholder} {...field} />;
}
export default RecipientInput;
