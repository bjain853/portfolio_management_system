import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

interface IProps {
  portfolioId: string | undefined;
}
export default function AddSecurityForm({ portfolioId }: IProps) {
  return (
    <FormControl>
      <FormLabel>Category</FormLabel>
      <Select placeholder="Select category">
        <option>Real Estate</option>
        <option>Forex</option>
      </Select>
      <FormLabel>Price</FormLabel>
      <Input type="number" />
      <FormLabel>Quantity</FormLabel>
      <Input type="number" />
      <Button>Add Security</Button>
    </FormControl>
  );
}
