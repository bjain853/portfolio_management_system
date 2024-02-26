import {
  Container,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";

interface IProps {
  value: number;
  caption: string;
  helperText: string;
}

export default function StatCard({ value, caption, helperText }: IProps) {
  return (
    <Container>
      <Card>
        <CardBody>
          <Stat>
            <StatLabel>{caption} </StatLabel>
            <StatNumber>$ {value ? value : 0} </StatNumber>
            <StatHelpText>{helperText}</StatHelpText>
          </Stat>
        </CardBody>
      </Card>
    </Container>
  );
}
